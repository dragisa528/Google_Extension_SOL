import React, { useRef } from "react";
import images from "../constant/images";
import {useState} from 'react';
export type  IInputComp = {
    onhandle:(query:string)=>void,
    titlename:string
}
const InputComp:React.FC<IInputComp> = ({onhandle, titlename})=>{
    const [query,setQuery]= useState<string>("");
    return(
        <div style={{opacity:'0.8'}} className="flex border-2 border-yellow bg-white p-1 px-3 rounded-full grow items-center" onKeyDown={(e)=>{ if(e.keyCode == 13){onhandle(query)}}}>
            <img src={images.searchIcon} className="w-10 h-10" />
            <input type="text" id="home_input" placeholder={titlename} className="grow border-0 border-b-1 focus:border-0 text-lg" onChange={(e:any)=>setQuery(e.target.value)} />
            {/* <img src={images.micIcon} /> */}
        </div>
    )
}
export default InputComp;