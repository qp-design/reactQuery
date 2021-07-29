import {useHistory} from "react-router-dom";
import {Icon} from 'antd-mobile';
import {stopScan} from "../../utils";
import {useWsContext} from "../../encapsulation/context";
import {completed} from "../../api/control"
import "./style.scss"

const MHeader = (props) => {
  let history = useHistory();
  const {setRouterPath} = useWsContext();
  const {sendRef} = useWsContext();
  const goPrev = () => {
    history.goBack();
  }
  const stopScanFunc = () => {
    sendRef.current?.(stopScan(props.uid));
    // completed().then(res => {
    //   console.log(res);
    // })
    setRouterPath('Prepare');
  }
  return (
    <>
      <div className="warp">
        {props["prev"] ? <div className="prev" onClick={goPrev}><Icon type="left" className="icon" size="sm" color="#fff"/></div> : null}
        {props["title-lg"] ? <div className="title-lg">{props["title-lg"]}</div> : null}
        {props["title-sm"] ? <div className="title-sm">{props["title-sm"]}</div> : null}
        {props["close"]?
          <div className="close" onClick={stopScanFunc}>
            <img src="/off.png" alt=""/>
            <span>关闭扫描</span>
          </div>
          :null
        }
        {props["loading"] ?
          <div className="loadingWrap">
            <div className="loading" style={{width: props["loading"]+"%"}}> </div>
          </div>
          : null
        }
        {props["timer"] ?
          <div className="timerWrap">
            <span>{props["timerTitle"]} </span>
            <b>{props["timerNum"]}</b>
          </div>
          : null
        }
        {props.children}
      </div>
    </>
  )
}

export default MHeader