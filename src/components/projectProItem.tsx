import {Card} from "flowbite-react"
import React from "react";
import { Api } from '../backend/utils/index';
import { IProjectForAny } from '../pages/project';
import { useRouterContext } from '../provider/router_context';

export type IProjectProfileItem ={
    title:string;
    link:string;
    // progress:number;
    goal:number;
    // activist:string;
    image:string;
    // supportCount:number;
    allocate_budget:number;
    project_id:number;
    description:string;
    user_img:string;  
    total_power:number;
    city:string;
    country:string;
    state:string;
    publish_at:string;
    // isSupport:boolean;
    // highlighted:number;
}

let projectDetail_data: Array<IProjectForAny> = [];

const ProjectProfileItem = (props:any)=>{
    const {item} = props;
    const {title,img_url,description,allocate_budget, budget,total_power} = item;
    const {viewProject} = useRouterContext();

    projectDetail_data = [{
        project_id:item.project_id,
        link:item.link,
        title:item.title,
        description:item.description,
        budget:item.budget,
        allocate_budget:item.allocate_budget,
        city:item.city,
        state:item.state,
        country:item.country,
        image:Api.host_url+"/api/project/projectImg?img="+item.img_url,
        publish_at:item.publish_at,
        total_power:item.total_power,
        user_img:item.image_url,
        activist:item.first_name + " " + item.last_name,
        goal:item.budget,
        progress:item.budget?item.allocate_budget?parseInt((item.allocate_budget/item.budget*100).toString()):0:0,
        supportCount:item.cnt?item.cnt:0,
        highlighted:item.highlighted?item.highlighted:0,
        isSupport:true
    } as IProjectForAny];

    return(
        <Card style={{cursor:'pointer'}} onClick={()=>{viewProject(projectDetail_data[0])}}>
            <div className="flex items-center" style={{overflow:'auto'}}>
                {/* <img src={Api.host_url+"/api/project/projectImg?img="+img} alt="" className="w-12 h-10 " /> */}
                <div className="w-10 h-10 " style={{backgroundImage:`url(${Api.host_url+"/api/project/projectImg?img="+img_url})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                <div className="ml-2">
                    <h4><b title={title}>{title.length>6?title.substring(0,6) + '...':title}</b> <span style={{color: '#c81e1e'}}>{parseInt((allocate_budget/budget*100).toFixed(2))}</span>% of $<span style={{color: '#c81e1e'}}>{budget}</span></h4>
                    <p title ={description}>{description.length>20?description.substring(0,20) + '...':description}</p>
                    <p><i>{total_power}kWh</i></p>
                </div>
            </div>
        </Card>
    )
}
export default ProjectProfileItem;