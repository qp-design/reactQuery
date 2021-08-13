import {Icon, Modal} from 'antd-mobile';
import {stopScan} from "../../utils";
import {useWsContext} from "../../encapsulation/context";
import "./style.scss"

const alert = Modal.alert;

const MHeader = (props) => {
  const {sendRef, setFormValue, setRouterPath} = useWsContext();
  const goPrev = () => {
    if(window.AJSInterface) {
      window.AJSInterface.finishView();
    }
  }
  const stopScanFunc = () => {
    alert('停止扫描', '协议尚未完成扫描，此时扫描关闭将会丢失本次扫描数据', [
      {text: '取消', style: 'default'},
      {
        text: '关闭扫描',
        onPress: () => {
          sendRef.current?.(stopScan(props.uid));
          setFormValue(null);
          setRouterPath('Prepare');
        }
      },
    ]);

  }
  return (
    <>
      <div className="warp">
        {props["prev"] ?
          <div className="prev" onClick={goPrev}><Icon type="left" className="icon" size="sm" color="#fff"/>
          </div> : null}
        {props["title-lg"] ? <div className="title-lg">{props["title-lg"]}</div> : null}
        {props["title-sm"] ? <div className="title-sm">{props["title-sm"]}</div> : null}
        {props["close"] ?
          <div className="close" onClick={stopScanFunc}>
            <img src="/off.png" alt=""/>
            <span>关闭扫描</span>
          </div>
          : null
        }
        {props["loading"] ?
          <div className="loadingWrap">
            <div className="loading" style={{width: props["loading"] + "%"}}></div>
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