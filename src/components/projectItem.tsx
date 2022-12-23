import React from "react";
import {Progress,Button} from "flowbite-react";
import { toast } from 'react-toastify';
import { handleSupportAPI } from "../backend/utils/api";
import {useState} from 'react';
import { useAuthContext } from '../provider/auth_provider';
import { useRouterContext } from '../provider/router_context';
import { IProjectForAny } from '../pages/project';
import Videoplayer from "./video";
export type IProjectItem ={
    project:IProjectForAny;
}

const ProjectItem:React.FC<IProjectItem> = ({project})=>{
    const {project_id,title,goal,activist,progress,image,supportCount,isSupport,link} = project;
    const [_isSupport,setisSupport] = useState<boolean>(isSupport);
    const [supportNumber,setSupportNumber] = useState<number>(supportCount);
    const {isAnymouse} = useAuthContext();
    const {viewProject} = useRouterContext();
   
    const handleSupport = ()=>{
        if(!project_id || project_id ===0){
            toast.error("Invalid project id");
            return ;
        }
        const  data = {
            project_id
        }
        handleSupportAPI(data,error=>{
            toast.error(error);
            return;
        }).then(res=>{
            if(!res) return;
            if(res.data.status){
                setisSupport(res.data.isSupport);
                if(res.data.isSupport){
                    setSupportNumber(supportNumber+1);
                }else{
                    setSupportNumber(supportNumber-1);
                }
            }else{
                console.log("res---",res.data);
            }
        })
    }
    return(
        <div className="w-full shadow-xl p-2 rounded-md flex flex-col grow ">
            {/* <img src={image} alt={title+"logo"} className="w-full h-full" height={300} style={{width:"100%",height:"300px"}} /> */}
            <div className="max-h-[400px] relative grow">
                <Videoplayer image={image} url={link} width={400} height={300} />
            </div>
            <p>{title}</p>
            <div className="flex w-full items-center">
                <p className="mr-3">progress:</p>
                <Progress
                    progress={progress}
                    size="md"
                    
                    className="lg:w-[380px] xs:w-[140px] sm:w-[300px] md:w-[400px] h-2"
                />
            </div>
           <p>Goal:${goal}</p>
           <p>Activist:{activist}</p>
           <p>Supporters:{supportNumber}</p>
        <div className="flex gap-4 my-1">
            {
                !isAnymouse&&
                <Button className="w-full" onClick={handleSupport} color={_isSupport===true?"failure":"success"}>
                    {_isSupport === true?"Unsupport":"Support"}
                </Button>
            }
            <Button className="w-full" onClick={()=>{viewProject(project)}} color="info">
                    About Project
            </Button>
        </div>
        </div>
    )
}
export default ProjectItem;