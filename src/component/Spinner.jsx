import React from 'react'
import spinner from '../assets/loading.gif'

function Spinner({clsName}) {
  return (
    <>
     <div id="loader" class={clsName}><img src={spinner} alt=""/></div> 
    </>
  )
}

export default Spinner
