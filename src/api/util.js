export class Util {
  static async create(gl) {
    const inst = new Util();
    inst.gl = gl;
    gl[inst.constructor.name.toLowerCase()] = inst;
    const { api } = gl;
    api.registerReceiver({ name: 'util', client: inst });
    return inst;
  }

  constructor() {
    this.rateLimitMap = new Map();
    this.resultCache = new Map();
  }

  createCacheWithTTL(fn, ttl, getKey, options = {}) {
    const cacheMap = new Map();
    const maxSize = options.maxSize || 100;

    const shouldCache = result => !(result && typeof result === 'object' && 'code' in result && result.code !== 0);

    const wrapped = (...args) => {
      const key = getKey ? getKey(...args) : JSON.stringify(args);
      const now = Date.now();

      const entry = cacheMap.get(key);
      if (entry && now - entry.time < ttl) {
        return Promise.resolve(entry.value);
      }

      let result;
      try {
        result = fn(...args);
      } catch (err) {
        return Promise.reject(err);
      }

      const process = value => {
        if (shouldCache(value)) {
          // 超过最大数量则清理最旧的
          if (!cacheMap.has(key) && cacheMap.size >= maxSize) {
            const oldestKey = [...cacheMap.entries()].reduce((oldest, [k, v]) => (!oldest || v.time < oldest[1].time ? [k, v] : oldest))[0];
            cacheMap.delete(oldestKey);
          }

          cacheMap.set(key, { value, time: Date.now() });
        }
        return value;
      };

      if (result && typeof result.then === 'function') {
        return result.then(process).catch(e => Promise.reject(e));
      } else {
        return Promise.resolve(process(result));
      }
    };

    return wrapped;
  }

  async getCity({ keyword }) {
    if (!keyword) return { code: -1, msg: 'plz input keyword' };
    const url = `https://nominatim.openstreetmap.org/search?q=${keyword}&format=json`;
    let res = null;
    const isCn = location.hostname.includes('icn');
    if (isCn) {
      res = await fetch('https://api.maxthon.com/service/geturl', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
    } else {
      res = await fetch(url);
    }
    if (!res.ok) {
      return { code: res.status, msg: `HTTP 错误 ${res.status}`, data: null };
    }
    const data = await res.json();
    if (!data || data.length === 0) {
      return { code: -1, msg: 'not found', data: null };
    }
    const ret = data.map(item => ({
      name: item.display_name,
      lat: item.lat,
      lon: item.lon,
      type: item.addresstype,
      id: item.place_id
    }));
    return [keyword, ret];
  }

  // 获取指定名称的cookie值
  getCookie(params) {
    const { name } = params;
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  // 设置cookie
  setCookie(params) {
    const { name, value, days = 30 } = params;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
  }

  async getLocationFromIP({ refresh = false } = {}) {
    try {
      const cookie = this.getCookie({ name: 'location' });
      if (cookie && !refresh) {
        const loc = JSON.parse(cookie);
        return loc;
      }
      const res = await fetch('https://ipinfo.io/json'); // 可选 token
      const data = await res.json();

      if (!data.loc) throw new Error('定位失败：未找到 loc 字段');

      const [lat, lon] = data.loc.split(',').map(Number);
      const ret = { lat, lon, country: data.country };
      // 设置 cookie 有效期为 30 天
      this.setCookie({
        name: 'location',
        value: JSON.stringify(ret),
        days: 30 // 30 天
      });
      return ret;
    } catch (error) {
      console.error('获取经纬度出错：', error.message);
      return {};
    }
  }

  async getWeather({ lat, lon, keyword, cmd } = {}) {
    if (cmd === 'getCity') return await this.getCity({ keyword });

    const weatherCodeMap = {
      0: ['Clear sky', 'clear-day.svg'],
      1: ['Mainly clear', 'clear-day.svg'],
      2: ['Partly cloudy', 'partly-cloudy-day.svg'],
      3: ['Overcast', 'cloudy.svg'],
      45: ['Fog', 'fog.svg'],
      48: ['Fog', 'fog.svg'],
      51: ['Light drizzle', 'drizzle.svg'],
      53: ['Moderate drizzle', 'drizzle.svg'],
      55: ['Heavy drizzle', 'drizzle.svg'],
      56: ['Freezing drizzle', 'drizzle.svg'],
      61: ['Light rain', 'rain.svg'],
      63: ['Moderate rain', 'rain.svg'],
      65: ['Heavy rain', 'rain.svg'],
      71: ['Light snow', 'snow.svg'],
      73: ['Moderate snow', 'snow.svg'],
      75: ['Heavy snow', 'snow.svg'],
      80: ['Light rain shower', 'rain.svg'],
      81: ['Moderate rain shower', 'rain.svg'],
      82: ['Heavy rain shower', 'rain.svg'],
      95: ['Thunderstorm', 'thunderstorm.svg'],
      96: ['Thunderstorm with hail', 'thunderstorm.svg'],
      99: ['Severe thunderstorm with hail', 'thunderstorm.svg']
    };
    if (!lat || !lon) {
      const loc = await this.getLocationFromIP();
      if (!loc || !loc.lat || !loc.lon) {
        console.error('无法获取经纬度信息');
        return { temp: null, condition: 'Unknown', icon: '' };
      }
      lat = loc.lat;
      lon = loc.lon;
    }
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&timezone=auto`);
    const weatherData = await weatherRes.json();

    const hourly = weatherData.hourly;
    const now = new Date();
    // 在 hourly.time 中查找这一小时的索引
    const pad = n => n.toString().padStart(2, '0');
    const currentHour = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:00`;
    const index = hourly.time.indexOf(currentHour);
    if (index !== -1) {
      const temperature = hourly.temperature_2m[index];
      const weathercode = hourly.weathercode[index];
      const icon = weatherCodeMap[weathercode] ? `https://pc-newtab.maxthonimg.com/static/weather/icon/${weatherCodeMap[weathercode][1]}` : '';
      return { temp: temperature, condition: weatherCodeMap[weathercode][0] || 'Unknown', icon };
    } else {
      console.log('当前小时的数据未找到');
    }
    return { code: -1, msg: '无法获取当前小时的天气数据' };
  }

  async onCall({ cmd, param }) {
    return this[cmd] ? await this[cmd](param) : null;
  }

  isRateLimited({ fid, rule }) {
    const now = Date.now();
    if (!rule) return false;
    const times = this.rateLimitMap.get(fid) || [];
    const recent = times.filter(t => now - t <= rule.interval);
    recent.push(now);
    this.rateLimitMap.set(fid, recent);

    return recent.length > rule.limit;
  }

  async mxFetch({ fid, timeout = 5000, url, method = 'GET', headers = {}, body = {}, rateLimit = true, ...rest }) {
    const rule = null;
    let cacheKey = null;
    if (typeof body === 'string' || typeof headers === 'string') return { code: -1, msg: '请求参数错误', data: null };

    if (fid === 'weather') {
      cacheKey = `${url}-${JSON.stringify(body)}`;
      if (!this.wrappedGetWeather) {
        this.wrappedGetWeather = this.createCacheWithTTL(this.getWeather.bind(this), 60 * 60 * 1000);
      }
      return await this.wrappedGetWeather(body);
    }
    return this._mxFetch({ fid, cacheKey, timeout, rule, url, method, headers, body, rateLimit, ...rest });
  }

  async _mxFetch({ fid, cacheKey, timeout = 5000, rule, url, method = 'GET', headers = {}, body, rateLimit, ...rest }) {
    const controller = new AbortController();
    timeout = +timeout || 5000;
    const timer = timeout ? setTimeout(() => controller.abort('timeout'), timeout) : null;
    if (!cacheKey) cacheKey = `${method}-${url}`;

    try {
      console.log(`🔍[${fid}] 发起请求: ${method} ${url}`);
      if (rateLimit && rule && this.isRateLimited({ fid, rule })) {
        if (rule.action === 'recent') {
          const result = this.resultCache.get(cacheKey);
          if (result) {
            console.log('use recent cache');
            result._cached = true;
            return result;
          }
        }

        if (rule.action === 'error') {
          return {
            code: -429,
            data: null,
            msg: 'rate limit exceeded, please try again later'
          };
        }
      }
      body = JSON.stringify(body);

      const res = await fetch(url, {
        method,
        headers,
        body,
        signal: controller.signal,
        ...rest
      });

      timer && clearTimeout(timer);

      if (!res.ok) {
        return { code: res.status, data: null, msg: `HTTP 错误 ${res.status}` };
      }

      const contentType = res.headers.get('content-type') || '';
      let response;
      if (contentType.includes('application/json')) {
        response = await res.json();
        if (response.code === undefined) {
          response.code = 0;
        }
      } else {
        const data = contentType.includes('text') ? await res.text() : await res.blob();
        response = { code: 0, data, msg: 'OK' };
      }
      // 存入缓存
      this.resultCache.set(cacheKey, response);
      return response;
    } catch (err) {
      timer && clearTimeout(timer);
      const msg = typeof err === 'string' ? err : err.message;
      console.error(`❌[${fid}] 请求失败: ${msg}`);
      return { code: -1, data: null, msg };
    }
  }

  async mxFetchAll({ options = [] }) {
    if (!Array.isArray(options) || options.length === 0) {
      return { code: -1, msg: '请求列表为空', data: [] };
    }
    const tasks = options.map(opt => this.mxFetch(opt));
    const results = await Promise.allSettled(tasks);

    // 整理结果
    const data = results.map((res, index) => {
      if (res.status === 'fulfilled') {
        return res.value;
      } else {
        return {
          code: -1,
          msg: res.reason?.msg || 'request failed',
          data: null,
          fid: options[index].fid || `req-${index}`
        };
      }
    });

    return {
      code: 0,
      msg: 'OK',
      data
    };
  }
}
