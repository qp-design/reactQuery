import "./index.scss";

const Tip = ({setTip}) => {
  const know = () => {
    setTip(false)
  }
  return (
    <div className="tip">
      <h1>滑动调节窗宽窗位</h1>
      <img src="/swipe.png" alt=""/>
      <button onClick={know}>我知道了</button>
    </div>
  )
}

export default Tip;