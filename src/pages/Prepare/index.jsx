import { useEffect, useRef, useState} from "react";
import {Toast} from "antd-mobile";
import MHeader from "../../common/components/m-header";
import GenderJsx from "./components/gender";
import config from "./formConfig";
import {get_position_list, register_patient} from "../../common/api/control";
import "./style.scss";
import { useSafeImplement} from '../../common/hooks';
import {useWsContext} from "../../common/encapsulation/context";
import {confirmInfo} from "../../common/utils";
const Prepare = () => {
  const [formConfig, setFormConfig] = useState(config);
  const [partNum, setPartNum] = useState(0);
  const [partName, setPartName] = useState("");
  const [partArr, setPartArrPre] = useState([]);
  const {sendRef, setFormValue, formValue} = useWsContext();

  const setPartArr = useSafeImplement(setPartArrPre)
  const formRef = useRef({sex: "male"})

  useEffect(() => {
    if(formValue) {
      let copy = formConfig.map(item => {
        console.log(formValue[item.name])
        item.defaultValue = formValue[item.name]
        return item
      })
      formRef.current = formValue
      setFormConfig(copy)
    }
  },[])

  useEffect(() => {
    get_position_list().then(res => {
      setPartArr(res.data.data.dataList)
    })
  }, [])

  const choosePart = selectNum => {
    setPartNum(selectNum)
    partArr.forEach(el => {
      if (el.id === selectNum) {
        setPartName(el.name);
      }
    })
  }

  const onChange = (value, item, index) => {
    const {name, require, validator} = item;
    formRef.current[name] = value;
    if (require && validator(value) === !item.isError) {
      return;
    }
    const getFormConfig = Object.assign([], formConfig)

    getFormConfig[index] = {
      ...getFormConfig[index],
      isError: !(require && validator(value)),
    }
    setFormConfig(getFormConfig)
    console.log(config)
  }

  const submit = () => {
    const result = formRef.current;
    console.log(result)
    let isError = false
    const getFormConfig = Object.assign([], formConfig)
    for (let i = 0; i < formConfig.length; i++) {
      const {require, validator, name} = formConfig[i]
      if (!require) continue;
      if (require && validator(result[name] || formConfig[i].defaultValue)) {
        continue;
      }

      isError = true
      getFormConfig[i] = {
        ...getFormConfig[i],
        isError: true,
      }
    }
    if (!isError) {
      const formData = new FormData();
      if (!partName) {
        Toast.fail("请选择部位");
        return;
      } else {
        formData.append('bodyType', partName);
      }
      for (let i of formConfig) {
        let name = i.name
        formData.append(name, result[name] || i.defaultValue)
      }
      console.log("result", result)
      setFormValue(result);
      register_patient(formData).then(res => {
        if (res.data.code === 200) {
          sendRef.current?.(confirmInfo(res.data.data.id))
        }
      })

    } else {
      isError && setFormConfig(getFormConfig)
    }
  }
  return (
    <div className="choosePart">
      <MHeader
        title-lg={"磁共振成像系统"}
        prev
      />
      <div className="formWrap">
        <h2>填写患者信息</h2>
        <form>
          <ul>
            {
              formConfig.map((item, index) => {
                return (
                  <li key={item.id}>
                    <h4>{item.label}</h4>
                    {
                      item.type === 'input' ?
                        <>
                          <input
                            className={item.isError ? "err" : ""}
                            type="text"
                            defaultValue={item.defaultValue}
                            onChange={(e) => onChange(e.target.value, item, index)}
                            placeholder={item.placeholder}
                            maxLength={item.maxLength}
                          />
                          {item.isError ? <span>{item.message}</span> : null}
                        </>
                        : <GenderJsx
                          sex={formRef.current[item.name] || item.defaultValue}
                          index={index}
                          item={item}
                          changeGender={onChange}
                        />
                    }
                  </li>
                )
              })
            }
          </ul>
        </form>
      </div>
      <div className="partWrap">
        <ul>
          {
            partArr.map(item => {
              return (
                <li key={item.id} className={partNum === item.id ? "active" : ""}
                    onClick={choosePart.bind(null, item.id)}>
                  <img src={item.img} alt=""/>
                  <p>{item.name_cn}</p>
                </li>
              )
            })
          }
          <li className="itemEmpty"> </li>
          <li className="itemEmpty"> </li>
          <li className="itemEmpty"> </li>
        </ul>
        <button onClick={submit} className="btn">确认</button>
      </div>
    </div>
  )
}

export default Prepare
