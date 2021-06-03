import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import socket from "../../socket/socket";

interface IVideo{
  me: string;
  stream: null | MediaStream;  
  receivingCall: boolean;
  caller: string;
  callerSignal: null | any;
  callAccepted : boolean;
  idToCall: string;
  callEnded: boolean;
  name: string;
}

const initialVideo: IVideo = {
  me: "",
  stream: null,
  receivingCall: false,
  caller: "",
  callerSignal: null,
  callAccepted : false,
  idToCall: "",
  callEnded: false,
  name: "",
}

// const [ me, setMe ] = useState("")
  // const [ stream, setStream ] = useState()
  // const [ receivingCall, setReceivingCall ] = useState(false)
  // const [ caller, setCaller ] = useState("")
  // const [ callerSignal, setCallerSignal ] = useState()
  // const [ callAccepted, setCallAccepted ] = useState(false)
  // const [ idToCall, setIdToCall ] = useState("")
  // const [ callEnded, setCallEnded] = useState(false)
  // const [ name, setName ] = useState("")


const Video = (): JSX.Element => {
  const [video, setVideo] = useState(initialVideo)

    //const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {
    setVideo({...video, stream: stream})
    userVideo.current.srcObject = stream
    })

    socket.on("sendId", (id: string) => {
      setVideo({...video, me: id})
    })

    socket.on("callUser", (data: { from: string; name: string; signal: any; }) => {
      setVideo({...video, receivingCall: true)
      setVideo({...video, caller: data.from})
      setVideo({...video, name: data.name})
      setVideo({...video, callerSignal: data.signal})
    })
}, [])

const callUser = (id: string) => {
    const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
    })
    
    //capte le signal
    peer.on("signal", (data: any) => {
        socket.emit("callUser", {
            userToCall: id,
            signalData: data,
            from: me,
            name: name
        })
    })

    //catch the stream
    peer.on("stream", (stream: MediaStream) => {
        userVideo.current.srcObject = stream
    })

    //
    socket.current.on("callAccepted", (signal: any) => {
        setVideo({...video, callAccepted: true})
        peer.signal(signal)
    })

    connectionRef.current = peer
}


const answerCall =() =>  {
   setVideo({...video, callAccepted: true})

  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream: stream
  })
  peer.on("signal", (data) => {
    socket.emit("answerCall", { signal: data, to: video.caller })
  })
  peer.on("stream", (stream) => {
    userVideo.current.srcObject = stream
  })

  peer.signal(video.callerSignal)
    connectionRef.current = peer
}

const leaveCall = () => {
    setVideo({...video, callEnded: true})
    connectionRef.current.destroy()
}







    return (
        
    )

};

export default Video;
