const config = [
  {
    isError: false,
    id: 1,
    type: "input",
    label: "姓名",
    name: "name",
    placeholder: "请输入姓名",
    maxLength: 15,
    require: true,
    defaultValue: '',
    message: '请输入5字以内的姓名',
    validator: (value = '') => value.length > 0,
  },
  {
    isError: false,
    id: 2,
    type: "input",
    label: "手机号",
    name: "phonenum",
    placeholder: "请输入正确的手机号",
    maxLength: 11,
    require: true,
    defaultValue: '',
    message: '请输入手机号',
    validator: (value = '') => /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value),
  },
  {
    isError: false,
    id: 3,
    type: "input",
    name: "age",
    label: "年龄",
    maxLength: 3,
    placeholder: "请输入年龄(6-120岁)",
    require: true,
    defaultValue: '',
    message: '请输入6-120的数字',
    validator: (value='') => !isNaN(value) && value > 5 && value < 121,
  },
  {
    isError: false,
    id: 4,
    type: "input",
    name: "weight",
    label: "体重",
    maxLength: 3,
    placeholder: "请输入体重(单位:公斤)",
    require: true,
    defaultValue: '',
    message: '请输入1-100的数字',
    validator: (value='') => !isNaN(value) && value > 0 && value < 101,
  },
  {
    isError: false,
    id: 5,
    type: "slot",
    name: "sex",
    label: "性别",
    defaultValue: 'male',
  },
];

export default config;
