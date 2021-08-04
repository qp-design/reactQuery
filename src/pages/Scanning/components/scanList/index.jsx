import ProtocolMenu from "../protocolMenu";
import ProtocolState from "../protocolState";
import "./index.scss";
import {createContext, useState} from "react";

export const protocolContext = createContext(null);


const ScanList = () => {

  const [waitList, setWaitList] = useState([]);
  const [chooseIndex, setChooseIndex] = useState(0);
  const [chooseItem, setChooseItem] = useState(null);

  return (
    <protocolContext.Provider value={{
      chooseIndex,
      setChooseIndex,
      chooseItem,
      setChooseItem,
      waitList,
      setWaitList
    }}>
      <div className={"ScanList"}>
        <ProtocolState/>
        <ProtocolMenu/>
      </div>
    </protocolContext.Provider>
  )
}

export default ScanList;