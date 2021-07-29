import {useEffect, useState} from "react";
import {get_scan_proto} from "../../../common/api/control";
import {useWsContext} from "../../../common/encapsulation/context";
import {useSafeImplement} from "../../../common/hooks";

const ScanList = () => {
  const {wsDataSource} = useWsContext();
  const [protocolList, setProtocolListPre] = useState([]);
  const [protocolBlockState, setProtocolBlockStatePre] = useState([]);

  const setProtocolList = useSafeImplement(setProtocolListPre)
  const setProtocolBlockState = useSafeImplement(setProtocolBlockStatePre)

  useEffect(() => {
    if(wsDataSource?.bodyType) {
      get_scan_proto({
        bodyType: wsDataSource?.bodyType
      }).then(res => {
        let result = res.data.data.dataList;
        let lArr = [];
        let rArr = []
        for (let i = 0; i < result.length; i++) {
          if (result[i].protoType === "buildin") {
            lArr.push(result[i]);
          } else {
            rArr.push(result[i]);
          }
        }
        setProtocolBlockState(lArr)
        setProtocolList(rArr)
      })
    }
  }, [wsDataSource])
  return (
    <div className="scanlist">
      <div className="lPart">
        <div className="up">
          <div className="topInfo">
            <div className="l">
              <img src="/sound.png" alt=""/>
              <h3>本次扫描协议列表</h3>
            </div>
            <div className="r">
              <img src="/exclamation.png" alt=""/>
              <h4>长按协议可调整扫描顺序</h4>
            </div>
          </div>
          <ul className="protocolBlocks">
            {
              protocolBlockState.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="upInfo">
                      <div className="sort">{item.id}</div>
                      <img src="/close.png" alt="" className="close"/>
                    </div>
                    <div className="content">
                      <h4>{item.name}</h4>
                      <div className="timer">{item.time}</div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className="rPart">
        <ul>
          {
            protocolList.map((item,index) => {
              return (
                <li key={index}>
                  <div className="name">{item.name}</div>
                  <img src="/plus.png" alt="" className="plus"/>
                  <div className="time">{item.time}</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default ScanList;