import ProjectItem from "../components/projectItem";
import images from "../constant/images";
import {Button} from "flowbite-react";
import {useState} from 'react';
import {useEffect} from 'react';
import { getProjectForAnymouse, getProjects } from "../backend/utils/api";
import { useAuthContext } from "../provider/auth_provider";
import { toast } from 'react-toastify';
import { Api } from '../backend/utils/index';
export type IProject = {
    title:string
    progress:number
    link:string
    goal:number
    activist:string
    isSupport:boolean
    image:string,
    supportCount:number,
    project_id:number
}
export type IProjectForAny ={
    title:string;
    link:string;
    progress:number;
    goal:number;
    activist:string;
    image:string;
    supportCount:number;
    allocate_budget:number;
    project_id:number;
    description:string;
    user_img:string;  
    total_power:number;
    city:string;
    country:string;
    state:string;
    publish_at:string;
    isSupport:boolean;
}
const data =[
    {
        progress:40,
        label:"Costa Rica Town Hall",
        goal:1300,
        activist:"Sebastian Rosinscky",
        image:images.Project1
    },
    {
        progress:70,
        label:"Domingo MM School",
        goal:3500,
        activist:"Domingo MM School",
        image:images.Project2
    },
    {
        progress:80,
        label:"Domingo MM School",
        goal:1300,
        activist:"Sebastian Rosinscky",
        image:images.Project3
    },
    {
        progress:40,
        label:"Peruvian Home Power",
        goal:1300,
        activist:"Sebastian Rosinscky",
        image:images.Project4
    }
]
const Project =()=>{
    const [projects,setProjects] = useState<Array<IProjectForAny>>([]);
    const [projectsForAny,setProjectsForAnys] = useState<Array<IProjectForAny>>([]);
    const makeProjectsData = (_projects:any,support:any,progress:any,countRecord:any):Array<IProjectForAny>=>{
        let supportIds:any[]=[];
        if(support.length){
            supportIds = support.map((item:any)=>{
                return item.project_id;
            })
        }else{
            supportIds=[];
        }
        const projectData:Array<IProjectForAny> = _projects.map((item:any)=>{
            let isSupported = false;
            if(supportIds.indexOf(item.id) !== -1){
                isSupported = true;   
            }
            const total_progress_object = progress.find((item1:any)=>{
               return item1.project_id === item.id; 
            })
            const support_count_object = countRecord.find((item2:any)=>{
                return item2.project_id === item.id;
            })
          
            return {
                project_id:item.id,
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
                supportCount:support_count_object?support_count_object.cnt:0,
                isSupport:isSupported
            } as IProjectForAny
        })
        return projectData;
    }
    const makeProjectDataForAnymouse = (projects:any,supportRecords:any):Array<IProjectForAny>=>{
        const result = projects.map((item:any)=>{
            const support_count = supportRecords.find((item:any)=>{
                return item.project_id === item.id;
            })
            return {
                project_id:item.id,
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
                supportCount:support_count?support_count.cnt:0,
                isSupport:false
            } as IProjectForAny
        })
        return result;
    }
    const getProjectForAnymouseA= ()=>{
        getProjectForAnymouse(error=>{
            toast.error(error);
        }).then(res=>{
            if(!res) return;
            if(res.data.status){
                const data=makeProjectDataForAnymouse(res.data.records,res.data.support);
                console.log("data",data);
                setProjectsForAnys(data);
            }else{
                toast.error(res.data.message);
            }
        })
    }
    const {email,isAnymouse} = useAuthContext();
    useEffect(()=>{
        if(!isAnymouse){
            if(!projects.length && email !==""){
                const data={
                    email:email
                }
                console.log("data",data)
                getProjects(data,(error)=>{
                    console.log("error");
                }).then(res=>{
                    if(!res)return;
                    if(res.data.status){
                        const projectData= makeProjectsData(res.data.projects,res.data.support,res.data.progress,res.data.countRecord);
                        console.log("projectData",projectData)
                        setProjects(projectData);
                    }else{
                        toast.error(res.data.message);
                    }
                });
            }
        }else{
            getProjectForAnymouseA();
        }
    },[projects,email,isAnymouse])
    return(
       <div className="bg-white">
         <div className="container mx-auto pt-10">
             <h5 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
               Project Spotlight
            </h5>
            <img src={images.ProjectTop} alt="top image" className="w-[80/100] mx-auto mt-10 mb-5" />
            <p className="text-md text-center w-full">
                Costa Rican town hall solar project aims to reduce the power costs and create resiliency in the community while showcasing the city’s …. 
            </p>
            <Button  color="light" pill={true} className="mx-auto mt-10 mb-5">Support Project</Button>

            <div className="w-full grid xs:grid-cols-1 lg:grid-cols-2 gap-4 mx-auto flex items-stretch">
                {!isAnymouse&&
                    projects?.map((item,index)=>{
                       return ( 
                        <div className="grow flex">
                             <ProjectItem key={index} project={item}  />
                        </div> 
                        )
                    })
                }
                {
                    isAnymouse&&
                    projectsForAny?.map((item,index)=>{
                        return ( 
                            <div className="grow flex">
                                <ProjectItem key={index} project={item} />
                            </div>
                            ) 
                    })
                }
            </div>
        </div>
       </div>
    )
}
export default Project;