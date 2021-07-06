import React,{useEffect,useState,useCallback} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
let socket;


const Chat = ({location}) => {
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    const [message,setMessage]=useState('')
    const [messages,setMessages]=useState([])
    const ENDPOINT = "localhost:5000"
    useEffect(()=>{
        const {name,room}=queryString.parse(location.search)
        socket = io(ENDPOINT,{
            withCredentials:true,
            extraHeaders: {
                "my-custom-header": "abcd"
              }
        });
        setName(name)
        setRoom(room)
        socket.emit('join',{name,room},()=>{ })
        return()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT,location.search]);
   
    function handleMsg(msg){
        console.log("handle msg",msg);
        setMessages([...messages,msg])
    }
    const sendMessage = (event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''))
        }
    }
    useEffect(()=>{
        try{
        socket.on('message',(msg)=>{handleMsg(msg)});
        }catch(error){
            console.log(error)
        }
        return()=>{
            socket.off('message',(msg)=>{handleMsg(msg)});
        }

    },[messages])


    
    console.log(message,messages)
    return (
        <div className="outer-container">
            <div className="container">
                <input value={message} onChange={(e)=>setMessage(e.target.value)} 
                onKeyPress={e=>e.key==='Enter' ? sendMessage(e):null}>
                </input>

            </div>
        </div>
    )
}

export default Chat
