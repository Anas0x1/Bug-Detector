import React, { useState } from 'react'
import {useSelector,useDispatch}from "react-redux";
import { addone,minuson } from './slice';
export default function Try() {

   const valuee=useSelector(state=>state.counter.value);
   const disparsh=useDispatch();
  return (
   <>
   <div>

<button onClick={()=>disparsh(addone())}>+</button>
<span>{valuee}</span>
<button onClick={()=>disparsh(minuson())}>-</button>

   </div>
   
   </>
  )
}
