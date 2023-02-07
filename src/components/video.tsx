import { Button } from "flowbite-react";
import React from "react";
import { useState, useRef,useEffect,useCallback } from 'react';
export type IVideoPlayer = {
    url:string | null
    height:number;
    width:number;
    image:string;
}
const Videoplayer:React.FC<IVideoPlayer> = ({url,height,width,image})=>{
    const [isPlayer,setIsplayer] = useState<boolean>(false);
    const [isShow,setIsShow] = useState<boolean>(false);
    const [isExist, setIsExist] = useState<boolean>(false);
    const [_height,setHeight] = useState<string>("");
    const [_width,setWidth] = useState<string>("");
    const divRef = useRef<any>(null);
    useEffect(() => {
     setHeight("min-h-["+height+"px]");
     setWidth("min-w-["+width+"px]");
    }, [height,width])
    
    const videoRef = useRef<any>(null);
    const handlePlay = useCallback(()=>{
        if(!isPlayer){
            videoRef?.current.play();
        }else{
            videoRef?.current.pause();
        }
    },[isPlayer])
    const getType = (_link:string | null)=>{
        if(!_link) return null
        const typeArray = _link.split(".");
        const type = typeArray[typeArray.length-1];
        if(type === 'ogg'){
            return 'ogg';
        }else{
            return 'mp4'
        }
    }
    useEffect(()=>{
        if(videoRef){
            
        }

        if(url?.substring(url.length - 3) == "mp4" || url?.substring(url.length - 3) == "ogg"){
            console.log(url, "usrl");
            console.log(url?.substring(url.length - 4), "url-1");
            setIsExist(true);
        }
    },[videoRef])
    return(
        <div className=" w-full flex " ref={divRef} >
            <div className={`relative w-fit h-fit mx-auto my-auto`}  onMouseEnter={()=>setIsShow(true)}onMouseLeave={()=>setIsShow(false)} >
                {
                    isShow && isExist &&
                    <Button className="absolute z-50 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={()=>{setIsplayer((player)=>!player); handlePlay();}}>{isPlayer?"Stop":"Play"}</Button>
                }
                <video ref={videoRef} className={!isPlayer?"hidden":"block"} height={height} width={width} controls>
                    <source src={url?url:""} type={"video/"+getType(url)} />
                </video>
                <img src={image} alt="" width={width} height={height} className={` rounded-lg ${!isPlayer?"block":"hidden"}`} style={{backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
            </div>
        </div>
    )
}
export default Videoplayer;