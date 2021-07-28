import {ReactSortable} from "react-sortablejs";
import MHeader from "../../common/components/m-header";
import "./style.scss";
import {useEffect, useState} from "react";
import {get_scan_proto} from "../../common/api/control";
import {Toast} from "antd-mobile";
import {useWsContext} from "../../common/encapsulation/context";
import { useSafeImplement} from '../../common/hooks';
import {beginScan} from "../../common/utils"


// const Plan = [
//   {
//     id:0,
//     name: 'IR-SE序列扫描支持T1',
//     time: '05:20',
//   },
//   {
//     id:1,
//     name: 'T1加权扫描',
//     time: '06:20',
//   },
//   {
//     id:2,
//     name: 'T2加权扫描',
//     time: '03:20',
//   },
//   {
//     id:3,
//     name: 'T2-FLAIR扫描',
//     time: '00:20',
//   },
//   {
//     id:4,
//     name: 'IR-SE序列扫描支持T1',
//     time: '05:20',
//   },
//   {
//     id:5,
//     name: 'T1加权扫描',
//     time: '06:20',
//   },
//   {
//     id:6,
//     name: 'T2加权扫描',
//     time: '03:20',
//   },
//   {
//     id:7,
//     name: 'T2-FLAIR扫描',
//     time: '00:20',
//   },
//   {
//     id:8,
//     name: 'IR-SE序列扫描支持T1',
//     time: '05:20',
//   },
//   {
//     id:9,
//     name: 'T1加权扫描',
//     time: '06:20',
//   },
//   {
//     id:10,
//     name: 'T2加权扫描',
//     time: '03:20',
//   },
//   {
//     id:11,
//     name: 'T2-FLAIR扫描',
//     time: '00:20',
//   },
// ]

// const protocolBlockList = [
//   {
//     id:1,
//     name: '定位扫描1',
//     time: '04:16'
//   },
//   {
//     id:2,
//     name: '定位扫描2',
//     time: '04:16'
//   },
//   {
//     id:3,
//     name: '定位扫描3',
//     time: '04:16'
//   },
//   {
//     id:4,
//     name: '定位扫描4',
//     time: '04:16'
//   },
//   {
//     id:5,
//     name: '定位扫描5',
//     time: '04:16'
//   },
//   {
//     id:6,
//     name: '定位扫描6',
//     time: '04:16'
//   },
//   {
//     id:7,
//     name: '定位扫描7',
//     time: '04:16'
//   },
//   {
//     id:8,
//     name: '定位扫描8',
//     time: '04:16'
//   },
//   // {
//   //   id:9,
//   //   name: '定位扫描9',
//   //   time: '04:16'
//   // },
//   // {
//   //   id:10,
//   //   name: '定位扫描10',
//   //   time: '04:16'
//   // },
// ];

const ProtocolList = () => {
  const {wsDataSource , setRouterPath,sendRef} = useWsContext();
  const [protocolList, setProtocolListPre] = useState([]);
  const [protocolBlockState, setProtocolBlockStatePre] = useState([]);
  const [fix, setFixPre] = useState({})

  const setProtocolList = useSafeImplement(setProtocolListPre)
  const setProtocolBlockState = useSafeImplement(setProtocolBlockStatePre)
  const setFix = useSafeImplement(setFixPre)

  // console.log(wsDataSource?.check_info?.bodyType)


  useEffect(() => {
    if(wsDataSource?.bodyType) {
      get_scan_proto({
        bodyType: wsDataSource?.bodyType
      }).then(res => {
        let result = res.data.data.dataList;
        let lArr = [];
        let rArr = []
        for (let i = 0; i < result.length; i++) {
          if(result[i].name === "定位扫描") {
            setFix(result[i])
          }else {
            if (result[i].protoType === "buildin") {
              lArr.push(result[i]);
            } else {
              rArr.push(result[i]);
            }
          }
        }
        console.log(rArr)
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
  }

  const delItem = index => {
    let arr = [...protocolBlockState];
    arr.splice(index,1)
    setProtocolBlockState(arr);
  }

  const beginCheck = () => {
    let result = protocolBlockState
    result.unshift(fix)
    if (result.length === 0) {
      Toast.fail("未选择任何协议");
      return;
    }
    // setAllInfo({...allInfo, protocol:protocolBlockState});
    sendRef.current?.(beginScan(wsDataSource?.userid, result))
    setRouterPath("Scanning");
  }

  return (
    <div className="protocolList">
      <MHeader
        title-sm="头部-常规"
        prev
        loading
        timer
        timerTitle="剩余总时长"
        timerNum="00:12:08"
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
                          <div className="sort">{index+2}</div>
                          {
                            item.protoType === "buildin" ? null : <img src="/close.png" alt="" className="close" onClick={delItem.bind(null, index)}/>
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
            <button className="rBtn">恢复默认协议</button>
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
