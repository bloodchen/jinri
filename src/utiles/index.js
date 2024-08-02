// 生成随机ID
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 当前时间是否在提供的两个时间之间
export function isBetween(date1, date2) {
  const now = Date.now();
  const ts1 = new Date(date1).getTime();
  const ts2 = new Date(date2).getTime();
  return now >= ts1 && now <= ts2;
}

// 当前时间是否在提供的时间之后
export function isAfter(date) {
  if (!date) return true;
  const now = Date.now();
  const ts = new Date(date).getTime();
  return now >= ts;
}

// 获取第二天的日期
export function getTomorrowDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const tomorrow = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return tomorrow;
}
