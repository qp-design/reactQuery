import {Fragment, useEffect, useRef, useState} from "react";
import dwv from 'dwv';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Thumbs} from 'swiper/core';
import MHeader from "../../common/components/m-header";
import {completed} from "../../common/api/control";
import {useWsContext} from "../../common/encapsulation/context";
import 'swiper/swiper.scss';
import "./style.scss";

const Completed = () => {
  const [arrIndex, setArrIndex] = useState(0);
  const [arr, setArr] = useState([]);
  const [dcmArr, setDcmArr] = useState([]);
  const {wsDataSource} = useWsContext();
  const [showSwiper, setShowSwiper] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const topRef = useRef()
  SwiperCore.use([Thumbs]);


  useEffect(() => {
    if (wsDataSource?.state === "Completed") {
      setArr(wsDataSource.scanInfo)
      setDcmArr(wsDataSource.scanInfo[arrIndex]?.url)
      dwv.gui.getElement = dwv.gui.base.getElement;
      console.log(dcmArr)
      handleAllDcm('dwv', wsDataSource.scanInfo[arrIndex]?.url);
      handleAllDcm('dwvTop', wsDataSource.scanInfo[arrIndex]?.url, true);
      handleAllDcm('dwvThumbs', wsDataSource.scanInfo[arrIndex]?.url)

    }
  }, [])

  const checkNext = () => {
    completed().then(res => {
      console.log(res);
    })
  }

  const chooseProtocol = (index) => {
    setArrIndex(index);
    console.log(arr, index)
    setDcmArr(arr[index].url)
  }

  const showSwiperFunc = (index) => {
    console.log(index)
    setShowSwiper(!showSwiper)
  }

  const toggleSwiperShow = () => {
    setShowSwiper(!showSwiper)
  }


  const handleAllDcm = (idName, dcmArr, swipe = false) => {
    if (dcmArr?.length > 0) {
      for (let i = 0; i < dcmArr.length; i++) {
        console.log(idName + i)
        let app = new dwv.App();
        app.init({
          containerDivId: idName + i,
          tools: {
            WindowLevel: {}
          }
        });
        if (swipe) {
          app.addEventListener("load", function () {
            app.setTool("WindowLevel");
          });
        }
        app.loadURLs([dcmArr[i]])
      }
    }
  }

  return (
    <div className="completed">
      <MHeader
        title-lg={"头部-常规 检查完成"}
      />
       <div className={showSwiper? "showSpace": "showSpace hide"}>
        <img src="/swiperClose.png" alt="" className="close" onClick={toggleSwiperShow}/>
        <div className="showContent">
          <Swiper
            slidesPerView={1}
            className={"gallery-top"}
            onSwiper={setThumbsSwiper}
            noSwiping
            watchSlidesVisibility
            watchSlidesProgress
          >
            {
              dcmArr.map((item, index) => {
                return (
                  <SwiperSlide key={index} className={"swiper-no-swiping"}>
                    <div id={"dwvTop" + index} className="dwv" key={index} >
                      <div className="layerContainer"> </div>
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
          <Swiper
            slidesPerView={5}
            className={"gallery-thumbs"}
            thumbs={{ swiper: thumbsSwiper }}
            centeredSlides
          >
            {
              dcmArr.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div id={"dwvThumbs" + index} className="dwv" key={index}>
                      <div className="layerContainer"> </div>
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </div>
      <div className="content">
        <ul className="lPart">
          {
            arr.map((item, index) => {
              return (
                <li key={item.id} onClick={chooseProtocol.bind(null, index)}
                    className={arrIndex === index ? "active" : ""}>
                  <span>{item.id}</span>
                  <h4>{item.name}</h4>
                </li>
              )
            })
          }
        </ul>
        <div className="rPart">
          <div className="titlePart">
            <h2 className="title">{arr[arrIndex]?.name}</h2>
            <div className="tip">
              <img src="/exclamation.png" alt=""/>
              <b>点击查看大图</b>
            </div>
          </div>
          <div className="contentPart">
            {
              dcmArr.map((item, index) => {
                return (
                  <div id={"dwv" + index} className="dwv" key={index} onClick={showSwiperFunc.bind(null, index)}>
                    <div className="layerContainer"> </div>
                  </div>
                )
              })
            }
          </div>
          <div className="btnPart">
            <button className="next" onClick={checkNext}>检查下一个患者</button>
            <button className="continue">继续检查当前患者</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Completed;