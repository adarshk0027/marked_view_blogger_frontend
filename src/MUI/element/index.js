import React, { useState } from 'react'
import './style.css'
function MatierialInput (props) {
  const [Focus, setFocus] = useState(false)
  return (
    <div className='input-container'>
      <div className='labels'>
        <label className={`label ${Focus ? 'focus' : ''}`}>{props.label}</label>
      </div>
      <div
        className='input '
        onFocus={() => setFocus(true)}
        onBlur={e => {
          if (e.target.value === '') {
            setFocus(false)
          }
        }}
      >
        <input
          
          name={props.name}
          type={props.type}
          className={`form-control ${props.className}`}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          placeholder={props.placeholder}
        ></input>
      </div>
    </div>
  )
}
function MatierialTextArea (props) {
  return (
    <div className='textarea-container'>
      <div classname='container'>
        <label class>{props.label}</label>
        <div className='text-area' style={{ height: props.height }}>
          <textarea
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
          ></textarea>
        </div>
      </div>
    </div>
  )
}
export { MatierialTextArea }
export default MatierialInput
