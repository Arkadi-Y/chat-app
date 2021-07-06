import React from 'react'
import './Msg.css'
import ReactEmoji from 'react-emoji'

const Msg = ({message,name}) => {
    let sentByCurrentUser = false;
    const trimName = name.trim().toLowerCase();
    if(message.user===trimName)
        sentByCurrentUser=true;
    return (
        sentByCurrentUser ?
        (
            <div className="msgContain justifyEnd">
                <p className="sentText">{trimName}</p>
                <div className="msgBox backgroundBlue">
                    <p className="msgTxt">{ReactEmoji.emojify(message.text)}</p>
                </div>
            </div>

        ):(
            <div className="msgContain justifyStart">
            <div className="msgBox backgroundLight">
                <p className="msgTxt">{ReactEmoji.emojify(message.text)}</p>
            </div>
                 <p className="sentText pl-10">{message.user}</p>
             </div>
        )
    )
}

export default Msg
