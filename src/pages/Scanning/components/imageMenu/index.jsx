import {useContext} from "react";
import {useWsContext} from "../../../../common/encapsulation/context";
import {handleSingleRest} from "../../../../common/utils";
import {scanImageContext} from "../scanImage";
import "./index.scss";

const ImageMenu = () => {
  const {wsDataSource} = useWsContext();
  const {scanImageTab, setScanImageTab} = useContext(scanImageContext);

  const chooseTab = index => {
    setScanImageTab(index);
  }

  return (
    <ul className="imageMenu">
      {
        wsDataSource?.scanInfo?.map((item, index) => {
          switch (item.state) {
            case 5:
              return (
                <li
                  className={index === scanImageTab? "scaned active": "scaned"}
                  key={item.sequenceNo}
                  onClick={chooseTab.bind(null, index)}
                >
                  <div className="info">
                    <span>{item.id}</span>
                    <h3>{item.name}</h3>
                  </div>
                  <div className="state">
                    <h3>已完成</h3>
                    <div> </div>
                  </div>
                  <div className="line"> </div>
                </li>
              )
            case 2:
            case 3:
              return (
                <li
                  className={index === scanImageTab? "scanning active": "scanning"}
                  key={item.sequenceNo}
                  onClick={chooseTab.bind(null, index)}
                >
                  <div className="info">
                    <span>{item.id}</span>
                    <h3>{item.name}</h3>
                  </div>
                  <div className="state">
                    <h3>{handleSingleRest(item.time, item.currow)}</h3>
                    <div style={{width: `${(item.currow / item.totalrow) * 100}%`}}> </div>
                  </div>
                  <div className="line"> </div>
                </li>
              )
            case 1:
              return (
                <li
                  className={index === scanImageTab? "unscan active": "unscan"}
                  key={item.sequenceNo}
                  onClick={chooseTab.bind(null, index)}
                >
                  <div className="info">
                    <span>{item.id}</span>
                    <h3>{item.name}</h3>
                  </div>
                  <div className="state">
                    <h3>{item.time}</h3>
                    <div> </div>
                  </div>
                  <div className="line"> </div>
                </li>
              )
          }
        })
      }
    </ul>
  )
}

export default ImageMenu;