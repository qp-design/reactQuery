import {createContext, useState} from "react";
import MHeader from "../../common/components/m-header";
import {useWsContext} from "../../common/encapsulation/context";
import ProtocolMenu from "./components/protocolMenu";
import ProtocolSpace from "./components/protocolSpace";
import "./style.scss";

export const completedContext = createContext(null);

const Completed = () => {
  const {wsDataSource} = useWsContext();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <completedContext.Provider value={{
      tabIndex,
      setTabIndex
    }}>
      <div className="completed">
        <MHeader
          title-lg = {wsDataSource?.bodyTypeCn}
        />
        <div className="content">
          <ProtocolMenu/>
          <ProtocolSpace/>
        </div>
      </div>
    </completedContext.Provider>
  )
}

export default Completed;