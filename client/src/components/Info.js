import React from 'react'
import closeIcon from '../icons/no-speak.png'
import onlineIcon from '../icons/agree.png'
import './info.css'
const Info = (props) => {
    return (
        <>
        <div className='infobar'>
            <div className="leftContain"></div>
            <img className="onlineimg" src={onlineIcon} alt="online img"/>
            <h3>{props.room}</h3>
            <div className="rigthContain"></div>
            <a href="/"><img src={closeIcon} alt="close image"/></a>
        </div>
        <div className="iconref">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </>
    )
}

export default Info
