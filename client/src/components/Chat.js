import React,{useEffect,useState,useCallback} from 'react'
import Info from './Info'
import Input from './Input'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import Messeges from './Messeges'
import UserContainer from './UserContainer'
let socket;


const Chat = ({location}) => {
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    const [message,setMessage]=useState('')
    const [messages,setMessages]=useState([])
    const [userList,setUserList]=useState([])
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
    const hendaleUserData = (data)=>{
        setUserList(data.users);
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
    useEffect(()=>{
        socket.on('roomData',(data)=>{
            hendaleUserData(data);
        })
        return()=>{
            socket.off('roomData',(data)=>{
                hendaleUserData(data);
            })
        }
    },[userList])


    
    console.log(message,messages)
    return (
        <div className="outer-container">
            <div className="container">
                <Info room={room}/>
                <Messeges messeges={messages}name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                <UserContainer users={userList}/>
            </div>
        </div>
    )
}

export default Chat
