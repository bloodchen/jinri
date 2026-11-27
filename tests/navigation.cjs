const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function setup(response) {
  const opened = [];
  const source = readFileSync(path.join(root, 'src/utils/use-360-curl.js'), 'utf8')
    .replace(/^import .*;$/gm, '').replace('export const use360Curl', 'const use360Curl');
  const context = { URL, URLSearchParams, setTimeout, clearTimeout, console: { warn() {} },
    localStorage: { getItem: () => 'test-mid' }, randomString: () => 'sid',
    CryptoJS: { HmacSHA256: () => ({ toString: () => 'signature' }) },
    api: { getIp: async () => ({ data: { ip: '127.0.0.1' } }), get360Curl: response },
    window: { navigator: { userAgent: 'test' }, open: () => {
      const tab = { location: { href: 'about:blank' }, opener: {}, closed: false };
      opened.push(tab); return tab;
    } }
  };
  return { ...runInNewContext(source + '\n({ use360Curl })', context), opened };
}
test('dynamic link opens a tab synchronously and navigates to returned URL', async () => {
  const { use360Curl, opened } = setup(async () => ({ data: { data: [{ curl: 'https://example.com/?ad=1' }] } }));
  const pending = use360Curl().onAdElMouseUp('curl-jd');
  assert.equal(opened.length, 1);
  await pending;
  assert.match(opened[0].location.href, /^https:\/\/example.com\/\?ad=1&st=/);
  assert.equal(opened[0].opener, null);
});
for (const [label, response] of [
  ['empty', async () => ({ data: { data: [] } })],
  ['failure', async () => { throw new Error('offline'); }]
]) test(`${label} response falls back to official site`, async () => {
  const { use360Curl, opened } = setup(response);
  await use360Curl().onAdElMouseUp('curl-jd');
  assert.equal(new URL(opened[0].location.href).hostname, 'www.jd.com');
});

test('a stalled request falls back after five seconds', async () => {
  const { use360Curl, opened } = setup(() => new Promise(() => {}));
  await use360Curl().onAdElMouseUp('curl-1688');
  assert.equal(new URL(opened[0].location.href).hostname, 'www.1688.com');
});
test('promotion image click passes its URL and opens the destination', () => {
  const vue = readFileSync(path.join(root, 'src/views/pages/home/HomeWebsitesGroup.vue'), 'utf8');
  const handler = vue.match(/:href="item.bubbleUrl"[\s\S]*?@click.prevent="([^"]+)"/)[1];
  const fn = vue.match(/function openUrl\(url\) \{[\s\S]*?\n\}/)[0];
  const destinations = [];
  runInNewContext(`${fn}\n${handler}`, {
    dragStatus: { value: false }, item: { bubbleUrl: 'https://www.taobao.com/?pid=test' },
    $event: {}, window: { open: url => destinations.push(url) }
  });
  assert.deepEqual(destinations, ['https://www.taobao.com/?pid=test']);
});
