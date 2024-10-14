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
