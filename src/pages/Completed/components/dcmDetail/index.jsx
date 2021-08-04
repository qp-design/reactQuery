import "./index.scss";
import dwv from 'dwv';
import {useEffect} from "react";

const DcmDetail = ({url, dcmShow, setDcmShow}) => {
  useEffect(() => {
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
  }, [url])
  const handleDcmDetail = () => {
    setDcmShow(false)
  }
  console.log(dcmShow)
  return (
    <>
      {dcmShow ?
        <div className="dcmDetail" onClick={handleDcmDetail}>
          <div className="detail">
            <div id="dwv" className="dcm">
              <div className="layerContainer"> </div>
            </div>
          </div>
        </div>
        : null}
    </>

  )
}

export default DcmDetail;