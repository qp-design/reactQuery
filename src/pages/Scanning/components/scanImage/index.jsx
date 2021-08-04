import ImageMenu from "../imageMenu";
import ImageState from "../imageState";
import "./index.scss";
import {createContext, useState} from "react";

export const scanImageContext = createContext(null)

const ScanImage = () => {

  const [scanImageTab, setScanImageTab] = useState(0)

  return (
    <scanImageContext.Provider value={{
      scanImageTab,
      setScanImageTab
    }}>
      <div className="scanImage">
        <ImageMenu/>
        <ImageState/>
      </div>
    </scanImageContext.Provider>
  )
}
export default ScanImage;