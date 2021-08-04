import "./style.scss"
import MHeader from "../../common/components/m-header";
import { useState} from "react";
import ScanList from "./components/scanList";
import {handleTimeStr, handleTimeNum} from "../../common/utils";
import {useWsContext} from "../../common/encapsulation/context";
import ScanImage from "./components/scanImage";

const ScanCheck = () => {
  const [tabIndex, setTabIndex] = useState("1");
  const {wsDataSource} = useWsContext();

  const changeTab = (e) => {
    setTabIndex(e.target.dataset.tab)
  }

  const calRest = () => {
    let arr = wsDataSource?.scanInfo;
    let restTime = 0
    for(let i=0; i<arr?.length; i++) {
      if(arr[i].state !== 5) {
        if(arr[i].state === 1) {
          restTime+=handleTimeStr(arr[i].time)
        } else {
          restTime+=(handleTimeStr(arr[i].time)*(100-arr[i].currow))/100
        }
      }
    }
    return handleTimeNum(restTime)
  }

  const calProcess = () => {
    let arr = wsDataSource?.scanInfo
    let all = 0
    let process = 0
    let result;
    for(let i=0; i<arr?.length; i++){
      all+=handleTimeStr(arr[i].time)
      if(arr[i].state ===5) {
        process+=handleTimeStr(arr[i].time)
      }else if(arr[i].state ===2|| arr[i].state ===3) {
        process+=handleTimeStr(arr[i].time)*(arr[i].currow/arr[i].totalrow)
      }
    }
    result = (process/all)* 100
    return result
  }

  return (
    <div className="scanCheck">
      <MHeader
        uid = {wsDataSource?.userid}
        timer
        loading ={calProcess()}
        close
        timerTitle="剩余总时长"
        timerNum={calRest()}
      >
        <ul className="tabs">
          <li className={"1" === tabIndex ? "active" : ""} onClick={changeTab} data-tab="1">协议列表<b> </b></li>
          <li className={"2" === tabIndex ? "active" : ""} onClick={changeTab} data-tab="2">扫查影像<b> </b></li>
        </ul>
      </MHeader>
      <div className="content">
        {
          "1" === tabIndex ? <ScanList/> : <ScanImage/>
        }
      </div>
    </div>
  )
}

export default ScanCheck