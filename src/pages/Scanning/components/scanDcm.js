


export default function ScanDcm({dcmArr}) {
  return (
    <ul className="imageGroup" id={"dcmWrap"}>
      {
        dcmArr.map((item, index) => {
          return (
            <li key={index} id={item+index}>
              <div className="layerContainer"> </div>
            </li>
          )
        })
      }
    </ul>
  )
}