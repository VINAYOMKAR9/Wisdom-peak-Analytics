import React from 'react'

function Button() {
    let t = 'abc'
  return (
    <>
    <div>Button</div>
    <button onClick={()=>alert(`${t} is abc`)}>I am buttom {t} </button>
    </>
  )
}

export default Button