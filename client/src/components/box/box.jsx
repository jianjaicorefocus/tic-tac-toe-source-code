import "./box.css";

const Box = ({value, onClick, disabled}) => {
  const boxStyle = value === "X" ? "box x" : "box o";

  return (
    <button disabled={disabled} className={boxStyle} onClick={(elem) => {onClick(); elem.target.disabled = true}}>
      {value}
    </button>
  ) 
}

export default Box;