import {useContext, useState} from "react";
import {completedContext} from "../../index";
import {useWsContext} from "../../../../common/encapsulation/context";
import Analysis from "../../../Scanning/components/analysis";
import DcmDetail from "../dcmDetail";
import "./index.scss";
import {completed} from "../../../../common/api/control";

const ProtocolSpace = () => {
  const {wsDataSource} = useWsContext();
  const {tabIndex} = useContext(completedContext);
  const [dcmShow, setDcmShow] = useState(false);
  const [url, setUrl] = useState("");

  const handleDcm = item => {
    setDcmShow(true);
    setUrl(item)
  }

  const next = item => {
    console.log(item)
    completed().then(res => {
      console.log(res);
    }).catch(err => {
      throw new Error(err);
    })
  }

  return (
    <div className="protocolSpace">
      <div className="title">
        <h2>{wsDataSource?.scanInfo?.[tabIndex].name}</h2>
        <button>
          <img src="/exclamation.png" alt=""/>
          <span>点击查看大图</span>
        </button>
      </div>
      <div className="space">
        <ul>
          {
            wsDataSource?.scanInfo?.[tabIndex]?.url.map((item, index) => {
              return (
                <Analysis
                  key={item}
                  url={item}
                  no={index}
                  clk={handleDcm.bind(null, item)}
                />
              )
            })
          }
        </ul>
      </div>
      <div className="handle">
        <button className="next" onClick={next}>检查下一个患者</button>
        <button className="present">继续检查当前患者</button>
      </div>
      <DcmDetail
        url={url}
        dcmShow={dcmShow}
        setDcmShow={setDcmShow}
      />
    </div>
  )
}

export default ProtocolSpace;