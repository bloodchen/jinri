// 获取随机ID
export function getGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 获取随机整数
export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机字符串
export const randomString = (length = 32) => {
  // 字符集
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

  // 生成随机字符
  let code = '';
  for (let i = 0; i < length; i++) {
    // 随机索引
    const randomIndex = Math.floor(Math.random() * chars.length);
    // 从字符集中获取随机字符并添加到验证码
    code += chars[randomIndex];
  }

  return code;
};
