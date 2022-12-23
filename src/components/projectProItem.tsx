import {Card} from "flowbite-react"
import React from "react";
export type IProjectProfileItem ={
    img:any,
    title:string;
    detail:string;
}
const ProjectProfileItem :React.FC<IProjectProfileItem> = ({title,img,detail})=>{
    return(
        <Card >
            <div className="flex  items-center">
                <img src={img} alt="" className="w-12 h-16 " />
                <div className="ml-2">
                    <h4>{title}</h4>
                    <p>{detail}</p>
                </div>
            </div>
        </Card>
    )
}
export default ProjectProfileItem;