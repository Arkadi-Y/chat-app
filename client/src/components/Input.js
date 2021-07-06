import React from 'react'
import './Input.css'

const Input = ({message,setMessage,sendMessage}) => {
    return (
        <form className="form">
              <input className="input" value={message} onChange={(e)=>setMessage(e.target.value)} 
                onKeyPress={e=>e.key==='Enter' ? sendMessage(e):null}>
                </input>
                <button className="sendBtn" onClick={(e)=>{sendMessage(e)}}>send</button>
        </form>
    )
}

export default Input
