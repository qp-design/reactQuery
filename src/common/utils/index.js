// scan: 开始扫描
export const beginScan = (userId, protocolList) => {
  let obj = {
    "action": "scan",
    "userid": userId,
    "xprList": protocolList
  }
  return JSON.stringify(obj);
};

// stop: 终止扫描
export const stopScan = (userId) => {
  let obj = {
    "action": "stop",
    "userid": userId
  };
  return JSON.stringify(obj);
};

// pause: 暂停扫描
export const pauseScan = (userId, protocolList) => {
  let obj = {
    "action": "suspend",
    "userid": userId,
    "xprList": protocolList
  };
  return JSON.stringify(obj);
};

// continue: 继续 重新开始扫描
export const continueScan = (userId) => {
  let obj = {
    "action": "continue",
    "userid": userId
  };
  return JSON.stringify(obj);
}

// confirm
export const confirmInfo = userId => {
  let obj = {
    "action": "confirm",
    "userid": userId
  };
  return JSON.stringify(obj);
}

// 添加协议
export const addProtocol = (userId, chooseArr) => {
  let obj = {
    "action": "add",
    "userid": userId,
    "xprList": chooseArr
  };
  return JSON.stringify(obj);
};

// 删除协议
export const delProtocol = (userId, chooseItem) => {
  let obj = {
    "action": "delete",
    "userid": userId,
    "xprList": [chooseItem]
  };
  return JSON.stringify(obj);
}


export const handleTimeStr = str => {
  if (!str) {
    return;
  }
  let arr = str.split(":")
  return parseInt(arr[0]) * 60 + parseInt(arr[1])
}

export const handleTimeNum = num => {
  let min = Math.floor(num % 3600);
  let h = Math.floor(num / 3600) > 0 ? Math.floor(num / 3600) + ":" : "";
  let m = Math.floor(min / 60) > 9 ? Math.floor(min / 60) + ":" : "0" + Math.floor(min / 60) + ":";
  let s = Math.floor(num % 60 > 9 ? num % 60 : "0" + num % 60) > 9 ? Math.floor(num % 60 > 9 ? num % 60 : "0" + num % 60) : "0" + Math.floor(num % 60 > 9 ? num % 60 : "0" + num % 60);
  let result
  result = h + m + s;
  return result
}

// 单个协议剩余时间
export const handleSingleRest = (str, percent) => {
  return handleTimeNum(Math.floor((handleTimeStr(str) * (100 - percent)) / 100))
}


