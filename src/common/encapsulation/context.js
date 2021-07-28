import {createContext, useContext, useEffect, useRef, useState} from "react";
import {wsUrl} from "../constant";

const EncapsulationContext = createContext(null);
EncapsulationContext.displayName = 'wsContent';

const Context = ({ children }) => {
  const [wsDataSource, setWsData] = useState(null);
  const [routerPath, setRouterPath] = useState(null);
  const [allInfo, setAllInfo] = useState(null);
  const [result, setResult] = useState([]);
  // const [sendMsg, setSendMsg] = useState(null);
  const sendRef = useRef(null);

  useEffect(() => {
    let ws = new WebSocket(wsUrl);
    ws.onopen = function (msg){
      ws.send(msg, 123123)
      sendRef.current = ws.send.bind(this);
    }
    // a = wsRef.current.onopen
    ws.onclose = (e) => {
      // ws = new WebSocket(wsUrl);
    }
    ws.onerror = () => {
      console.log("error")
    }
    ws.onmessage = (e) => {
      const result = JSON.parse(e.data);
      if(result.code === 200) {
        setWsData(result.data);
        setRouterPath((prev) => {
          return result.data?.state || prev
        });
      }
    }
  },[])

  return (
    <EncapsulationContext.Provider value={{
      wsDataSource,
      routerPath,
      setRouterPath,
      allInfo,
      setAllInfo,
      sendRef,
      result,
      setResult
    }}>
      {
        children
      }
    </EncapsulationContext.Provider>
  )
}

export default Context;

export function useWsContext() {
  const context = useContext(EncapsulationContext);
  if(!context) {
    throw new Error("useWsContext必须在EncapsulationContext中使用")
  }
  return context;
}