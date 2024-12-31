import React from 'react'
import { useState } from 'react'
import './Counter.css';

export default function Counter() {
    const [contador,setContador]=useState(0)
    const incrementar = () => {
    setContador(contador+1)
    }

  /*  function incrementar() {
    setContador(contador+1)}*/
    
  return (
    <div>
       <h1 className='counter'>{contador}</h1>        
       <button onClick={incrementar}>Teste</button>
    </div>
  )
}
