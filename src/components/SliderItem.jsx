import React from 'react'
function SliderItem(props) {
  return (
    <div className='sliderItem' style={{background: props.color}}>
        <h3>{props.content}</h3>
        <input type="range"readOnly value={props.done} />
        <p>{props.done}%</p>
    </div>
  )
}

export default SliderItem