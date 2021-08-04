import {useContext} from "react";
import {useWsContext} from "../../../../common/encapsulation/context";
import {completedContext} from "../../index";
import "./index.scss";

const ProtocolMenu = () => {
  const {wsDataSource} = useWsContext();
  const {tabIndex, setTabIndex} = useContext(completedContext);

  const handleClk = index => {
    setTabIndex(index);
  }

  return (
    <ul className="protocolMenu">
      {
        wsDataSource?.scanInfo.map((item, index) => {
          return (
            <li
              key={item.sequenceNo}
              className={tabIndex === index ? "active" : ""}
              onClick={handleClk.bind(null, index)}
            >
              <span>{item.sequenceNo}</span>
              <h3>{item.name}</h3>
              <div className="line"> </div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default ProtocolMenu;