import {useContext, useEffect, useState} from "react";
import { Toast} from 'antd-mobile';
import {completedContext} from "../../index";
import {useWsContext} from "../../../../common/encapsulation/context";
import Analysis from "../../../Scanning/components/analysis";
import DcmDetail from "../dcmDetail";
import {completed} from "../../../../common/api/control";
import "./index.scss";

const ProtocolSpace = () => {
  const {wsDataSource} = useWsContext();
  const {tabIndex} = useContext(completedContext);
  const [dcmShow, setDcmShow] = useState(false);
  const [url, setUrl] = useState("");
  const [urlIndex, setUrlIndex] = useState("");
  const [maxLength, setMaxLength] = useState(0)

  useEffect(() => {
    setMaxLength(wsDataSource?.scanInfo?.[tabIndex]?.url.length);
  }, [tabIndex])

  const handleDcm = (item, index) => {
    setDcmShow(true);
    setUrlIndex(index);
    setUrl(item);
  }

  const changeDcm = (val) => {
    if(val === "prev") {
      if(urlIndex-1> -1) {
        setUrlIndex(urlIndex-1)
        setUrl(wsDataSource?.scanInfo?.[tabIndex]?.url?.[urlIndex-1]);
      }else {
        Toast.success("已经是第一张了", 1.2);
      }
    }else if(val === "next") {
      if(urlIndex+1< maxLength) {
        setUrlIndex(urlIndex+1)
        setUrl(wsDataSource?.scanInfo?.[tabIndex]?.url?.[urlIndex+1]);
      }else {
        Toast.success("已经是最后一张了", 1.2);
      }
    }
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
                  clk={handleDcm.bind(null, item, index)}
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
      {
        dcmShow?<DcmDetail
          url={url}
          dcmShow={dcmShow}
          setDcmShow={setDcmShow}
          changeDcm = {changeDcm}
        />: null
      }

    </div>
  )
}

export default ProtocolSpace;