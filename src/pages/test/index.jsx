import dwv from 'dwv';
import test from "./test.dcm";
import "./style.scss"

let arr = ["http://192.168.101.163:8000/media/2544778641984/dcm/1.000000-localizer-36769/1-1.dcm", test, test]

dwv.gui.getElement = dwv.gui.base.getElement;

var app = new dwv.App();
app.init({containerDivId: "dwv0"});
app.loadURLs(["http://192.168.101.163:8000/media/2544778641984/dcm/1.000000-localizer-36769/1-1.dcm"]);

var app2 = new dwv.App();
app2.init({containerDivId: "dwv1"});
app2.loadURLs([test]);


var app3 = new dwv.App();
app3.init({containerDivId: "dwv0"});
app3.loadURLs(["http://192.168.101.163:8000/media/2544778641984/dcm/1.000000-localizer-36769/1-1.dcm"]);


const Test = () => {


  return (
    <>
      <div id="dwv0" className="dwv">
        <div className="layerContainer"> </div>
      </div>
      <div id="dwv1" className="dwv">
        <div className="layerContainer"> </div>
      </div>
      <div id="dwv2" className="dwv">
        <div className="layerContainer"> </div>
      </div>
    </>
  )
}

export default Test;