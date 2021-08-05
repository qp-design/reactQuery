import axios from "axios";
import { Toast } from 'antd-mobile';
const axiosWrap = axios.create({
  baseURL: '',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  },
})

axiosWrap.interceptors.request.use(function (config){
  const type = config.method;
  const name = type.toLowerCase() === 'get' ? 'params' : 'data';

  for(let key in config[name]) {
    if(config[name].hasOwnProperty(key)) {
      if(config[name][key] === null) {
        delete config[name][key]
      }
    }
  }
  return config

})

// axiosWrap.interceptors.response.use((response) => {
//   // if (Reflect.has(response.data, 'code')) {
//   //   // if(response.data.code !== 200) {
//   //   //   for(const key in response.data.data) {
//   //   //     if(response.data.data.hasOwnProperty(key)) {
//   //   //       Toast.fail(response.data.data[key]);
//   //   //     }
//   //   //   }
//   //   //   return Promise.reject()
//   //   // }
//   //   return response;
//   // }
// });
export default axiosWrap
