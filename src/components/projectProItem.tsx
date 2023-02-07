import {Card} from "flowbite-react"
import React from "react";
import { Api } from '../backend/utils/index';

export type IProjectProfileItem ={
    img:any,
    title:string;
    detail:string;
    allocate_budget:number;
    budget:number;
    total_power:number;
}
const ProjectProfileItem :React.FC<IProjectProfileItem> = ({title,img,detail,allocate_budget, budget,total_power})=>{
    return(
        <Card style={{cursor:'pointer'}}>
            <div className="flex items-center" style={{overflow:'auto'}}>
                {/* <img src={Api.host_url+"/api/project/projectImg?img="+img} alt="" className="w-12 h-10 " /> */}
                <div className="w-10 h-10 " style={{backgroundImage:`url(${Api.host_url+"/api/project/projectImg?img="+img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                <div className="ml-2">
                    <h4><b>{title}</b> <span style={{color: '#c81e1e'}}>{parseInt((allocate_budget/budget*100).toFixed(2))}</span>% of $<span style={{color: '#c81e1e'}}>{budget}</span></h4>
                    <p>{detail}</p>
                    <p><i>{total_power}kWh</i></p>
                </div>
            </div>
        </Card>
    )
}
export default ProjectProfileItem;