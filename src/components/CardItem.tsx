import React, { useState } from "react";
import { Api } from '../backend/utils/index';

export type ICard ={
    img:string;
    title:string;
    summary:string;
    link:string;
    source:string;
}


const CardItem:React.FC<ICard> = ({img,title,summary,link,source})=>{
    const getLink = (link:string)=>{
        let data = link.trim();
        const firststr = data.slice(0,4);
        if(firststr !== "http"){
            data = "https://"+data;
        }
        return data;
    }
    const handleClick = (myLink:string) => () => {
        window.open(myLink, '_blank');
    }
    return(
       <li className="pntile" onClick={handleClick(getLink(link))} style={{cursor:'pointer', borderRadius:'6px', overflow:'hidden', whiteSpace:'normal', color:'#fff', verticalAlign:'top', display:'inline-block', backgroundColor:'rgba(34, 34, 34, .9)', margin:'10px'}}>
            <div className="p-2 w-[186px] xs:w-full" style={{whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                <h3 className="mb-1 font-bold">{title}</h3>
                <p className="mb-2 text-xs">{summary}</p>
            </div>
            <div className="w-[186px] h-[88px] xs:w-full justify-center  border-blue-300" style={{backgroundImage:`url(${Api.base_url+"/admin/cardImg?img="+img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            </div>
       </li>
    )
}
export default CardItem;