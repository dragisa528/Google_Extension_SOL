import React from "react";
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
    return(
       <div className="p-2 flex justify-center">
         <div className="flex bg-white border-1 rounded-lg p-2 justify-between items-center grow">
            <div className="mr-6 w-[100px] h-[100px] flex justify-center  border-blue-300">
                <img src={Api.base_url+"/admin/cardImg?img="+img} alt="cardImg" className="min-w-[100px] h-[100px] rounded-full"/>
            </div>
            <div className="grow">
                <h3 className="mb-1 font-bold">{title}</h3>
                <p className="mb-2 text-xs">{summary}</p>
                <p className="text-xs"><b>Source:</b>{source}</p>
                <div><b className="text-xs">Link:</b><a className="text-blue-500 text-xs" href={getLink(link)} target={"_blank"}>{link}</a></div>
                
            </div>
        </div>
       </div>
    )
}
export default CardItem;