const Btn = ({className, imgUrl, txt, clk}) => {
  return (
    <button
      className={className}
      onClick={clk}
    >
      <img src={imgUrl} alt=""/>
      <span>{txt}</span>
    </button>
  )
}
export default Btn;