import Analysis from "./analysis";


export default function ScanDcm({dcmArr}) {
  console.log(dcmArr)
  return (
    <ul className="imageGroup" id={"dcmWrap"}>
      {
        dcmArr?.map((item, index) => (
          <Analysis key={item} url ={item} no={index}/>
        ))
      }
    </ul>
  )
}