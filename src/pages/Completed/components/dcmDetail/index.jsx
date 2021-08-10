import dwv from 'dwv';
import {useEffect, useState} from "react";
import {get_tag} from "../../../../common/api/control";
import "./index.scss";
import Tip from "../tip";

const DcmDetail = ({url, dcmShow, setDcmShow, changeDcm}) => {
  const [info, setInfo] = useState(null);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    init();
    analysis(url);
    get_tag(url).then(event => {
      const dicomParser = new dwv.dicom.DicomParser();
      dicomParser.parse(event.data);
      const rawTags = dicomParser.getRawDicomElements();
      setInfo(rawTags)
    })
    checkTip();
  }, [url]);

  const handleDcmDetail = () => {
    setDcmShow(false)
  }

  const analysis = (url) => {
    dwv.gui.getElement = dwv.gui.base.getElement;
    const app = new dwv.App();
    app.init({
      containerDivId: "dwv",
      tools : {
        WindowLevel: {}
      }
    });
    app.addEventListener("load", function () {
      app.setTool("WindowLevel");
    });
    app.loadURLs([url])
  }

  const init = () => {
    let element = document.getElementById("parentNode");
    if(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  }

  const switchDcm = (val, e) => {
    e.stopPropagation()
    changeDcm(val)
  }

  const checkTip = () => {
    const result = localStorage.getItem("tip");
    if(!result) {
      setTip(true);
      localStorage.setItem("tip", "true");
    }
  }

  return (
    <>
      {dcmShow ?
        <div className="dcmDetail" onClick={handleDcmDetail}>
          <div className="detail">
            <div className="tl info">
              <p>
                {info?.["x00100010"]?.value[0]?info?.["x00100010"]?.value[0]: ""}
                , {info?.["x00100040"]?.value[0]?info?.["x00100040"]?.value[0]: ""}
              </p>
              <p>
                {info?.["x0008103E"]?.value[0]? info?.["x0008103E"]?.value[0]: ""}
                , {info?.["x00080021"]?.value[0]? info?.["x00080021"]?.value[0]: ""}
              </p>
              <p>
                {info?.["x00281050"]?.value[0]?`WL: ${info?.["x00281050"]?.value[0]}`: ""}
                {info?.["x00281051"]?.value[0]?`, WW: ${info?.["x00281051"]?.value[0]}`: ""}
              </p>
            </div>
            <div className="tr info">
              <p>{info?.["x00080070"]?.value[0]?info?.["x00080070"]?.value[0]: ""}</p>
              <p>{info?.["x00080060"]?.value[0]?info?.["x00080060"]?.value[0]: ""}</p>
            </div>
            <div className="bl info">
              <p>{info?.["x00181030"]?.value[0]? info?.["x00181030"]?.value[0]: ""}</p>
              <p>{info?.["x00180080"]?.value[0]?`TR: ${info?.["x00180080"]?.value[0]} ms`: ""}</p>
              <p>{info?.["x00180081"]?.value[0]?`TE: ${info?.["x00180081"]?.value[0]} ms`: ""}</p>
              <p>{info?.["x00180087"]?.value[0]?`Field: ${info?.["x00180087"]?.value[0]} T`: ""}</p>
              <p>{info?.["x00181314"]?.value[0]?`Flip Angle: ${info?.["x00181314"]?.value[0]}°`: "" }</p>
            </div>
            <div className="br info">
              <p>{info?.["x00180050"]?.value[0]? `Slice Thk: ${info?.["x00180050"]?.value[0]} mm`: ""}</p>
              <p>
                {info?.["x00280010"]?.value[0]?`Res: ${info?.["x00280010"]?.value[0]} `: ""}
                {info?.["x00280011"]?.value[0]?`X ${info?.["x00280011"]?.value[0]}`: ""}
              </p>
            </div>
            <div id="dwv" className="dcm">
              <div className="layerContainer" id="parentNode"> </div>
            </div>
          </div>
          <img src="/left.png" alt="" className="prev" onClick={switchDcm.bind(null, "prev")}/>
          <img src="/right.png" alt="" className="next" onClick={switchDcm.bind(null, "next")}/>
        </div>
        : null}
      {
        tip?<Tip setTip = {setTip}/>:null
      }
    </>

  )
}

export default DcmDetail;