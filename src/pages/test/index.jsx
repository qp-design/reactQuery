import dwv from 'dwv';
// import test from "./test.dcm";
import "./style.scss"

// let arr = ["http://192.168.101.163:8000/media/2544778641984/dcm/1.000000-localizer-36769/1-1.dcm", test, test]

var url = "http://192.168.101.163:8000/media/2544778641984/dcm/1.000000-localizer-36769/1-2.dcm";

var onloadtest = function (event) {
  // setup the dicom parser
  var dicomParser = new dwv.dicom.DicomParser();
  // parse the buffer
  dicomParser.parse(event.target.response);
  console.log(event.target)
  // div to display text
  var div = document.getElementById("tags");

  // get the raw dicom tags
  var rawTags = dicomParser.getRawDicomElements();
  // console.log(rawTags)
  // console.log(rawTags.x00080060.value[0])
};

// var request = new XMLHttpRequest();
// request.open('GET', url);
// request.responseType = "arraybuffer";
// request.onload = onloadtest;
// request.send();

const Test = () => {
  return (
    <>
      <div id="tags"></div>
    </>
  )
}

export default Test;