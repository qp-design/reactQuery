import axiosWrap from "../http";
// import {paramsList} from "swiper/angular/angular/src/utils/params-list";

// 患者信息设定
export const register_patient = data => {
  return axiosWrap.post("/api/patient/register_patient", data)
}

// 获取部位信息
export const get_position_list = params => {
  return axiosWrap.get("/api/scan/get_position_list", {
    params
  })
}

// 获取扫描协议
export const get_scan_proto = params => {
  return axiosWrap.get("/api/proto/get_scan_proto", {
    params
  })
}

// 扫描完成（继续当前/扫描下一个）
export const completed = params => {
  return axiosWrap.post("/api/scan/completed", params)
}

// 获取tag
export const get_tag = (url) => {
  return axiosWrap.get(url, {
    responseType: 'arraybuffer'
  })
}
