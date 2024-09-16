
import store from "@/store"


// 时间转换
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        // eslint-disable-next-line prefer-regex-literals
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    // date = new Date( time )
    date = new Date(
      new Date(time).getTime() +
      (parseInt(new Date(time).getTimezoneOffset() / 60) + 8) * 3600 * 1000
    );
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

// 复制
export const copyText = (text) => {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
  } else {
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = "fixed";
    textarea.style.clip = "rect(0 0 0 0)";
    textarea.style.top = "10px";
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand("copy", true);
    // 移除输入框
    document.body.removeChild(textarea);
  }
};
