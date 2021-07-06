import React from 'react'
import './Messeges.css'
import Msg from './Msg'
import ScrollToBottom from 'react-scroll-to-bottom'

const Messeges = ({messeges,name}) => {
    return (
        <ScrollToBottom className ="messages">
            {messeges.map((msg,i) => 
               <div key={i}>
                   <Msg message={msg} name={name}/>
                </div>
                )}
        </ScrollToBottom>
    )
}

export default Messeges
