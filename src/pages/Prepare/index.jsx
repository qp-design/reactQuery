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
  const [partNameCn, setPartNameCn] = useState("");
  const {sendRef} = useWsContext();

  const setPartArr = useSafeImplement(setPartArrPre)
  const formRef = useRef({sex: "male"})


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
        setPartNameCn(el.name_cn);
      }
    })
  }

  const onChange = (value, item, index) => {
    const {name, require, validator} = item;
    // e.persist()
    formRef.current[name] = value;

    if (require && validator(value) === !item.isError) {
      return;
    }
    formConfig[index] = {
      ...formConfig[index],
      isError: !(require && validator(value)),
      defaultValue: value
      // error: require && validator(value) ? '' : item.message
    }
    setFormConfig([...formConfig])
  }

  const submit = () => {
    const result = formRef.current;
    let isError = false
    for (let i = 0; i < formConfig.length; i++) {
      const {require, validator, name} = formConfig[i]
      if (!require) continue;

      if (require && validator(result[name] || formConfig[i].defaultValue)) {
        continue;
      }

      isError = true
      formConfig[i] = {
        ...formConfig[i],
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
      register_patient(formData).then(res => {
        if (res.data.code === 200) {
          sendRef.current?.(confirmInfo(res.data.data.id))
        }
      })
    } else {
      isError && setFormConfig([...formConfig])
    }
  }
  return (
    <div className="choosePart">
      <MHeader
        title-lg={"磁共振成像系统"}
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
                          sex={item.defaultValue}
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