import dwv from 'dwv';
import {useEffect} from "react";

const Analysis = ({url, no, clk}) => {
  useEffect(() => {
    console.log(123)
    dwv.gui.getElement = dwv.gui.base.getElement;
    const app = new dwv.App();
    app.init({
      containerDivId: "dwv"+no,
    });
    app.loadURLs([url])
  },[url])
  return (
    <li id={"dwv"+no} className="dcm" onClick={clk}>
      <div className="layerContainer"> </div>
    </li>
  )
}

export default Analysis;