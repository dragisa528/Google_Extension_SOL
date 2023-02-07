import React, { useRef, useState } from "react";
import {Card,ToggleSwitch,Button} from "flowbite-react";
import Notification from "./notification";
import images from "../constant/images";
import ProjectProfileItem, { IProjectProfileItem } from "./projectProItem";
import Connections from "./connections";
import SearchEngin from "./searchEngin";
import Projects from "./projects";
import Climate from "./climate";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
import { useNotificationContext } from '../provider/notification';
import { useRouterContext } from '../provider/router_context';
import { useAuthContext } from "../provider/auth_provider";
import { logout } from "../backend/utils/api";
import { toast } from 'react-toastify';
import { removeCookie } from "../backend/utils/cookies";
export type IProfile ={
    image:any;
    name:string;
    account_type:string;
}
// const projectData :Array<IProjectProfileItem> = [
//     {img:images.proProject1,title:"Domingo MM School",detail:"Solar installation in Dominican"},
//     {img:images.proProject2,title:"Costa Rica Town Hall",detail:"Solar installation at the town hall In Costa Rica."},
//     {img:images.proProject3,title:"Peruvian Home Power",detail:"Powering the market lights at Tharaka Market in Kenya."},
//     {img:images.proProject4,title:"Costa Rica Town Hall",detail:"Install solar panels for the family and Move them from Kerosene."}
// ];
const Profile:React.FC<IProfile> = ({image,name,account_type,...props})=>{
    const [curTab,setCurTab] = useState<number>(0);
    const [isToggle,setToggle]= useState<boolean>(false);
    const {isAnymouse,setIsAnymouse} = useAuthContext();
    const {setRouter} = useRouterContext()
    const {inviteShow,setInviteShow,setIsAuth,setAccountInit,setEmail,setName} = useAuthContext();
    const [isViewMore,setIsViewMore] = useState<boolean>(false);
    const {supportProjects} = useNotificationContext();
    const handleLogout = ()=>{
        logout(error=>{
            toast.error(error);
            return;
        }).then(res=>{
            if(!res) return;
            if(res.data.status){
                localStorage.removeItem("jwt");
                removeCookie("jwt");
                setIsAuth(false);
                setIsAnymouse(true);
                setAccountInit(false);
                setEmail("");
                setName("");
            }
        })
    }
    
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return(
        <div className="w-full w-330 max-h-[500px] overflow-y-auto px-0 bg-[#f5f0f0] pt-12 " ref={wrapperRef} style={{maxWidth:'300px', minWidth:'300px'}}>
          
                <Card className="border-0 relative" style={{border:"none !important"}}>
                {!isAnymouse&&
                    <div className="flex flex-col items-center pb-10">
                        <img
                            className="mb-3 h-24 w-24 mx-10 rounded-full shadow-lg border-3 border-blue-600 -translate-y-[70px]"
                            src={image}
                            alt="Bonnie image"
                        />
                    <h5 className="mb-1 text-xl absolute top-16 font-medium text-gray-900 dark:text-white">
                    {name}
                    </h5>
                    <p className="text-[#6e8ca0] absolute top-24">{account_type} Account</p>
                
                    </div>
                }
                <div className={`border-t ${isAnymouse?"relative":"absolute  top-32 -translate-x-6 translate-y-6"}  w-[100%] border-gray-200  grid grid-cols-2`}>
                    <a style={{cursor:'pointer'}} className="border-r border-gray-200 px-4 py-3 text-center" onClick={()=>setCurTab(0)}>Network</a>
                    <a style={{cursor:'pointer'}} className=" text-center  px-4 w-full py-3" onClick={()=>setCurTab(1)}>Project</a>
                </div>
            </Card>
            <Card className="mt-1">
                 <div className="flex justify-between items-center">
                      <h3><b>{curTab?"Project":"Network"}</b></h3>
                      {isAnymouse&&
                        <Button
                        onClick={()=>{setIsAnymouse(!isAnymouse)}}
                        className=" "
                        >
                        login
                        </Button>}
                      {!isAnymouse&&
                        <Button
                        onClick={()=>{handleLogout()}}
                        className=" "
                        color="failure"
                        >
                        logout
                        </Button>}
                 </div>
                <p>{curTab?"List of projects your searches are supporting":"Your network and supporters."}</p>
               
                { 
                curTab==1 && (
                   <div className="w-full">
                        {   !isAnymouse &&
                        <div>
                            {
                            supportProjects?.map((item:any,index:any)=>{
                                console.log(supportProjects, "Support~")
                                    return(
                                        <ProjectProfileItem key={index} img={item.img_url} title={item.title} detail={item.description} allocate_budget={item.allocate_budget} budget={item.budget} total_power={item.total_power}/>
                                    )
                                })
                            }
                        </div>
                        }
                   </div>
                )}
                {curTab==0 &&
                    <div className="w-full">
                        {
                            !isAnymouse&&
                            <Button onClick={()=>setInviteShow(true)} color="success" pill={true} size="xs" className="w-full mb-1">Invite People</Button>
                        }
                        {
                            isViewMore && <>
                        <Card>
                            {isAnymouse&&
                            <div className="flex items-center">
                                <img src={images.chchIcon} alt="chch icon" className="w-6 h-6" />
                                <p className="ml-3">Anonymous Mode</p>
                            </div>
                            }
                            {!isAnymouse&&
                                <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <img src={images.accountIcon} alt="" className="w-6 h-6" />
                                    <p className="ml-3">Account Preferences</p>
                                </div>
                                <div>
                                  <a href="#" onClick={()=>{setRouter(4)}}>  <img src={images.penIcon} alt="" className="h-6 w-6"/></a>
                                </div>
                            </div>}
                        </Card>
                        {!isAnymouse && ( <>
                        <Notification />
                        <Connections />
                        <SearchEngin />
                        <Projects />       
                        <Climate /> </>
                        )} </>
                        }
                    </div>
                    
                }
                {
                    !isAnymouse && curTab==0 &&
                    <Button
                        onClick={()=>{setIsViewMore(!isViewMore)}}
                        pill={true}
                        className="w-[120px] mx-auto"
                        >
                        {isViewMore?"View Less":"View More"}
                    </Button>
                }
            </Card>
            </div>
    )
}
export default Profile;