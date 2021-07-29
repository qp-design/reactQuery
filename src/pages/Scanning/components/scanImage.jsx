import dwv from 'dwv';
import {useCallback, useEffect, useState} from "react";
import {useWsContext} from "../../../common/encapsulation/context";
import {continueScan, handleSingleRest, pauseScan, stopScan} from "../../../common/utils";
import ScanDcm from "./scanDcm";


const arr = [
  {
    id: 0,
    img: "/image.png"
  },
  {
    id: 1,
    img: "/image.png"
  },
  {
    id: 2,
    img: "/image.png"
  },
  {
    id: 3,
    img: "/image.png"
  },
  {
    id: 4,
    img: "/image.png"
  },
  {
    id: 5,
    img: "/image.png"
  },
  {
    id: 6,
    img: "/image.png"
  },
  {
    id: 7,
    img: "/image.png"
  },
  {
    id: 8,
    img: "/image.png"
  },
  {
    id: 9,
    img: "/image.png"
  },
  {
    id: 10,
    img: "/image.png"
  },
  {
    id: 11,
    img: "/image.png"
  },
  {
    id: 12,
    img: "/image.png"
  },
  {
    id: 13,
    img: "/image.png"
  },
  {
    id: 14,
    img: "/image.png"
  },
  {
    id: 15,
    img: "/image.png"
  },
  {
    id: 16,
    img: "/image.png"
  },
  {
    id: 17,
    img: "/image.png"
  },
  {
    id: 18,
    img: "/image.png"
  },
  {
    id: 19,
    img: "/image.png"
  },
]

const ScanImage = () => {
  const {wsDataSource, sendRef} = useWsContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [dcmArr,setDcmArr] = useState([]);

  useEffect(() => {
    let result = wsDataSource?.scanInfo?.[tabIndex]?.url
    handleDcm(result)
  },[wsDataSource?.scanInfo?.[tabIndex]?.url?.length, tabIndex])

  const chooseTab = (index) => {
    // console.log(wsDataSource?.scanInfo?.[index].url)
    // handleDcm(wsDataSource?.scanInfo?.[index].url)
    setTabIndex(index);
  }

  const handlePause = () => {
    sendRef.current?.(pauseScan(wsDataSource?.userid,[wsDataSource?.scanInfo?.[tabIndex]]));
  }

  const handleContinue = () => {
    sendRef.current?.(continueScan(wsDataSource?.userid))
  }

  const handleDcm = useCallback((dcmArr) => {
    console.log(118, dcmArr);
    // if(dcmArr?.length>0) {
      setDcmArr(dcmArr)
    //   for (let i=0; i<dcmArr.length; i++) {
    //     console.log(dcmArr[i] + i)
    //     let app = new dwv.App();
    //     app.init({
    //       containerDivId: dcmArr[i] + i,
    //     });
    //     app.loadURLs([dcmArr[i]])
    //   }
    // }
  }, [])


  return (
    <>
      <ul className="lList">
        {
          wsDataSource?.scanInfo?.map((item, index) => {
            switch (item.state) {
              case 5:
                return (
                  <li className={index === tabIndex? "scaned active": "scaned"} key={item.sequenceNo} onClick={chooseTab.bind(null, index)}>
                    <div className="title">
                      <span>{item.sequenceNo}</span>
                      <h2>{item.name}</h2>
                    </div>
                    <div className="timer">
                      <b>已完成</b>
                      <span> </span>
                    </div>
                    <div className="line"> </div>
                    <img src="/arrow.png" alt=""/>
                  </li>
                )
              case 3:
              case 2:
                return (
                  <li className={index === tabIndex? "scanning active": "scanning"} key={item.sequenceNo} onClick={chooseTab.bind(null, index)}>
                    <div className="title">
                      <span>{item.sequenceNo}</span>
                      <h2>{item.name}</h2>
                    </div>
                    <div className="timer">
                      {/*<b>{wsDataSource?.scanningInfo?.time}</b>*/}
                      <b>{handleSingleRest(item.time, item.currow)}</b>
                      {/*wsDataSource?.scanningInfo?.currow*/}
                      <span style={{width: `${item.currow}%`}}> </span>
                    </div>
                    <img src="/arrow.png" alt=""/>
                    <div className="line"> </div>
                  </li>
                )
              case 1:
                return (
                  <li className={index === tabIndex? "unscan active": "unscan"} key={item.sequenceNo} onClick={chooseTab.bind(null, index)}>
                    <div className="title">
                      <span>{item.sequenceNo}</span>
                      <h2>{item.name}</h2>
                    </div>
                    <div className="timer">
                      <b>{item.time}</b>
                      <span> </span>
                    </div>
                    <img src="/arrow.png" alt=""/>
                    <div className="line"> </div>
                  </li>
                )
              default:
                return null;
            }
          })
        }
      </ul>
      <div className="rDetail">
          {/*<div className="scanning">*/}
          {/*  <h2>定位扫描</h2>*/}
          {/*  <div className="showWrap">*/}
          {/*    <h3>{wsDataSource?.scanInfo?.[tabIndex]?.currow}%</h3>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="scaned">
            <div className="title">
              <h2 className="l">{wsDataSource?.scanInfo?.[tabIndex]?.name}</h2>
              <div className="btnGroup">
                {
                  wsDataSource?.scanInfo?.[tabIndex]?.state===2?
                    <button className="stop" onClick={handlePause}>
                      <img src="/pause.png" alt=""/>
                      <span>停止协议</span>
                    </button>:null
                }
                {
                  wsDataSource?.scanInfo?.[tabIndex]?.state===3?
                    <button className="reScan" onClick={handleContinue}>
                      <img src="/restart.png" alt=""/>
                      <span>重新扫描协议</span>
                    </button>:null
                }
              </div>
            </div>
            {!wsDataSource?.scanInfo?.[tabIndex]?.url||wsDataSource?.scanInfo?.[tabIndex]?.url.length===0?
              <img src="/loading.png" alt="" className={"noScan"}/>:

              <ScanDcm dcmArr={dcmArr}/>
              // <ul className="imageGroup" id={"dcmWrap"}>
              //   {
              //     dcmArr.map((item, index) => {
              //       return (
              //         <li key={index} id={item+index}>
              //           <div className="layerContainer"> </div>
              //         </li>
              //       )
              //     })
              //   }
              // </ul>
            }
          </div>

      </div>
    </>
  )
};

export default ScanImage