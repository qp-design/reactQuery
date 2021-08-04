import "./index.scss";
import {useWsContext} from "../../../../common/encapsulation/context";
import {useContext, useEffect, useState} from "react";
import {get_scan_proto} from "../../../../common/api/control";
import {protocolContext} from "../scanList";
import {Toast} from "antd-mobile";
import {addProtocol} from "../../../../common/utils";
const ProtocolMenu = () => {

  const {wsDataSource, sendRef} = useWsContext();
  const [list, setList] = useState([]);

  const { waitList, setWaitList} = useContext(protocolContext)

  useEffect(() => {
    if(wsDataSource?.bodyType) {
      get_scan_proto({bodyType:wsDataSource?.bodyType}).then(res => {
        setList(res.data.data.dataList)
      }).catch(err => {
        throw new Error(err)
      })
    }
  }, [wsDataSource?.bodyType])

  const addItem = (item) => {
    let arr = JSON.parse(JSON.stringify(waitList));
    let result = waitList.find(val => {
      return val.id === item.id
    })
    if(result) {
      Toast.fail("不能重复添加协议");
      return;
    }
    let aimArr = wsDataSource?.scanInfo
    for (let i=0; i<aimArr.length; i++) {
      if(aimArr[i].state === 2 || aimArr[i].state === 3) {
        if(aimArr[i].id === item.id) {
          Toast.fail("不能添加正在扫描的协议");
          return;
        }
      }
    }
    if(item.name === "定位扫描") {
      Toast.fail("不能重复添加定位扫描");
      return
    }
    arr.push(item);
    setWaitList(arr);
    sendRef.current?.(addProtocol(wsDataSource?.userid, [item]));
  }

  return (
    <div className={"ProtocolMenu"}>
      <ul>
        {
          list?.map((item, index) => {
            return (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <div className={"info"}>
                  <span>{item.time}</span>
                  <img src="/plus.png" alt="" onClick={addItem.bind(null,item, index)}/>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ProtocolMenu;