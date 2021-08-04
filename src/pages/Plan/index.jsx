import {ReactSortable} from "react-sortablejs";
import MHeader from "../../common/components/m-header";
import {useEffect, useState} from "react";
import {get_scan_proto} from "../../common/api/control";
import {Toast} from "antd-mobile";
import {useWsContext} from "../../common/encapsulation/context";
import {useSafeImplement} from '../../common/hooks';
import {beginScan, handleTimeNum, handleTimeStr} from "../../common/utils"
import "./style.scss";

const ProtocolList = () => {
  const {wsDataSource, setRouterPath, sendRef} = useWsContext();
  const [protocolList, setProtocolListPre] = useState([]);
  const [protocolBlockState, setProtocolBlockStatePre] = useState([]);
  const [fix, setFixPre] = useState({});
  const [time, setTime] = useState(0);

  const setProtocolList = useSafeImplement(setProtocolListPre)
  const setProtocolBlockState = useSafeImplement(setProtocolBlockStatePre)
  const setFix = useSafeImplement(setFixPre)

  // console.log(wsDataSource?.check_info?.bodyType)


  useEffect(() => {
    if (wsDataSource?.bodyType) {
      get_scan_proto({
        bodyType: wsDataSource?.bodyType
      }).then(res => {
        let result = res.data.data.dataList;
        let lArr = [];
        let rArr = []
        for (let i = 0; i < result.length; i++) {
          if (result[i].name === "定位扫描") {
            setFix(result[i])
            setTime(time + handleTimeStr(result[i].time));
          } else {
            if (result[i].protoType === "buildin") {
              lArr.push(result[i]);
            } else {
              rArr.push(result[i]);
            }
          }
        }
        setProtocolBlockState(lArr)
        setProtocolList(rArr)
      })
    }
  }, [wsDataSource])

  const addItem = (item) => {
    console.log(item)
    let arr = [...protocolBlockState];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === item.id) {
        Toast.fail("已添加该项");
        return;
      }
    }
    item.currow = 0;
    arr.push(item);
    setProtocolBlockState(arr);
    setTime(time + handleTimeStr(item.time));
  }

  const delItem = (item, index) => {
    console.log(item)
    let arr = [...protocolBlockState];
    arr.splice(index, 1)
    setProtocolBlockState(arr);
    setTime(time - handleTimeStr(item.time));
  }

  const beginCheck = () => {
    let result = protocolBlockState
    result.unshift(fix)
    if (result.length === 0) {
      Toast.fail("未选择任何协议");
      return;
    }
    sendRef.current?.(beginScan(wsDataSource?.userid, result))
    setRouterPath("Scanning");
  }
  const initProtocol = () => {
    let arr = protocolBlockState;
    let timeResult = time;
    for (let i = 0; i < arr.length; i++) {
      timeResult -= handleTimeStr(arr[i].time)
    }
    setTime(timeResult)
    setProtocolBlockState([])
  }

  return (
    <div className="protocolList">
      <MHeader
        title-lg={wsDataSource?.bodyTypeCn}
        timer
        timerTitle="剩余总时长"
        timerNum={handleTimeNum(time)}
      />
      <div className="listContent">
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
              <li>
                <div className="upInfo">
                  <div className="sort">1</div>
                </div>
                <div className="content">
                  <h4>{fix.name}</h4>
                  <div className="timer">{fix.time}</div>
                </div>
              </li>
              <ReactSortable
                list={protocolBlockState}
                setList={setProtocolBlockState}
                dragClass='chosen-class'
                ghostClass='chosen-class'
                chosenClass='chosen-class'
              >
                {
                  protocolBlockState.map((item, index) => {
                    return (
                      <li key={item.id}>
                        <div className="upInfo">
                          <div className="sort">{index + 2}</div>
                          {
                            item.protoType === "buildin" ? null :
                              <img src="/close.png" alt="" className="close" onClick={delItem.bind(null, item, index)}/>
                          }
                        </div>
                        <div className="content">
                          <h4>{item.name}</h4>
                          <div className="timer">{item.time}</div>
                        </div>
                      </li>
                    )
                  })
                }
              </ReactSortable>
            </ul>
          </div>
          <div className="down">
            <button className="lBtn" onClick={beginCheck}>开始检查</button>
            <button className="rBtn" onClick={initProtocol}>恢复默认协议</button>
          </div>
        </div>
        <div className="rPart">
          <ul>
            {
              protocolList.map(item => {
                return (
                  <li key={item.id}>
                    <div className="name">{item.name}</div>
                    <img src="/plus.png" alt="" className="plus" onClick={addItem.bind(null, item)}/>
                    <div className="time">{item.time}</div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProtocolList;
