import {useEffect, useContext} from "react";
import { ReactSortable } from "react-sortablejs";
import {useWsContext} from "../../../../common/encapsulation/context";
import {protocolContext} from "../scanList";
import "./index.scss";
import {delProtocol, handleSingleRest} from "../../../../common/utils";
const ProtocolState = () => {
  const {wsDataSource, sendRef} = useWsContext();
  const {waitList, setWaitList} = useContext(protocolContext)

  useEffect(() => {
    let arr = [];
    let wsArr = wsDataSource?.scanInfo;
    if(wsArr) {
      for (let i=0; i<wsArr.length; i++) {
        if(wsArr[i].state === 1) {
          arr.push(wsArr[i])
        }
      }
      setWaitList(arr);
    }

  }, [wsDataSource?.scanInfo])

  const del = item => {
    delete item.chosen
    console.log(item);
    sendRef.current?.(delProtocol(wsDataSource?.userid, item))
  }

  const dragEnd = (e) => {
    console.log(waitList);
  }

  return (
    <div className="protocolState">
      <div className="headerInfo">
        <img src="/sound.png" alt=""/>
        <h2>本次扫描协议列表</h2>
        <div className="tips">
          <img src="/exclamation.png" alt=""/>
          <span>长按协议可调整扫描顺序</span>
        </div>
      </div>
      <div className="protocolWrap">
        <ul>
          {
            wsDataSource?.scanInfo?.map(item => {
              switch (item.state) {
                case 5:
                  return (
                    <li className="scaned" key={item.sequenceNo}>
                      <div className="upInfo">
                        <span>{item.sequenceNo}</span>
                        {/*<img src="/close.png" alt=""/>*/}
                      </div>
                      <div className="downInfo">
                        <h3>{item.name}</h3>
                        <div className="processWrap">已完成</div>
                      </div>
                    </li>
                  )
                case 2:
                case 3:
                  return (
                    <li className="scanning" key={item.sequenceNo}>
                      <div className="upInfo">
                        <span>{item.sequenceNo}</span>
                        {/*<img src="/close.png" alt=""/>*/}
                      </div>
                      <div className="downInfo">
                        <h3>{item.name}</h3>
                        <div className="processWrap">
                          <div className="number">{handleSingleRest(item.time, item.currow)}</div>
                          <div className="process" style={{width: `${(item.currow/item.totalrow)*100}%`}}> </div>
                        </div>
                      </div>
                    </li>
                  )
              }
            })
          }
          <ReactSortable
            list={waitList}
            setList={setWaitList}
            onEnd={dragEnd}
          >
            {
              waitList?.map((item, index) => {
                return (
                  <li className="unscan" key={index}>
                  <div className="upInfo">
                    <span>{item.sequenceNo}</span>
                    <img src="/close.png" alt="" onClick={del.bind(null, item)}/>
                  </div>
                  <div className="downInfo">
                    <h3>{item.name}</h3>
                    <div className="processWrap">未扫描</div>
                  </div>
                </li>
                )
              })
            }
          </ReactSortable>
        </ul>
      </div>
    </div>
  )
}
export default ProtocolState;