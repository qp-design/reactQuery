import {useContext} from "react";
import {continueScan, pauseScan} from "../../../../common/utils";
import {useWsContext} from "../../../../common/encapsulation/context";
import {scanImageContext} from "../scanImage";
import Btn from "../btn"
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import ScanDcm from "../scanDcm";
import {Modal} from "antd-mobile"
import "./index.scss";

const alert = Modal.alert

const ImageState = () => {
  const {wsDataSource, sendRef} = useWsContext();
  const {scanImageTab} = useContext(scanImageContext)

  const pause = () => {
    alert('停止协议', `确认停止${wsDataSource?.scanInfo?.[scanImageTab]?.name}吗？`, [
      { text: '取消'},
      { text: '确认停止', onPress: () => {
          sendRef.current?.(pauseScan(wsDataSource?.userid, [wsDataSource?.scanInfo?.[scanImageTab]]))
        } },
    ])
  }

  const restart = () => {
    sendRef.current?.(continueScan(wsDataSource?.userid))
  }
  return (
    <div className="imageState">
      <div className="info">
        <h3>{wsDataSource?.scanInfo?.[scanImageTab]?.name}</h3>
        {
          wsDataSource?.scanInfo?.[scanImageTab]?.state === 2 ?
            <>
              <Btn
                className="restart unused"
                imgUrl="/restart2.png"
                txt="重新扫描协议"
              />
              <Btn
                className="pause"
                imgUrl="/pause.png"
                txt="停止协议"
                clk={pause}
              />
            </>
            : null
        }
        {
          wsDataSource?.scanInfo?.[scanImageTab]?.state === 3 ?
            <>
              <Btn
                className="restart"
                imgUrl="/restart.png"
                txt="重新扫描协议"
                clk={restart}
              />
              <Btn
                className="pause unused"
                imgUrl="/pause2.png"
                txt="停止协议"
              />
            </> : null
        }
      </div>
      <div className="ground">
        {
          wsDataSource?.scanInfo?.[scanImageTab]?.state !== 5 ?
            <img src="/scanning.png" alt=""/> :
            isEmpty(get(wsDataSource, `scanInfo[${scanImageTab}].url`, []))
              ? <img src="/loading.png" alt=""/> :
              <ScanDcm dcmArr={wsDataSource?.scanInfo?.[scanImageTab]?.url}/>
        }

      </div>
    </div>
  )
}

export default ImageState;