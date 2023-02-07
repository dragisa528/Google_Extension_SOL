import {Card,Button} from "flowbite-react"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState } from "react";
import images from "../constant/images";
import ItemDetail, { ICategory } from "./itemDetail";
import { useAuthContext } from "../provider/auth_provider";
import { INotificationItem, useNotificationContext } from '../provider/notification';
import {useEffect} from 'react';
const textData = [
    "Congratulations! Your network grew by 13 members this week! ",
    "A project your support “Domingo MM school” reached its funding goals. ",
    "A project your support “Domingo MM school” reached its funding goals. ",
    "Take action by adding your voice to the upcoming COP 27 Agenda here.",
    "US congress to vote on new EV regulations, here is the draft proposal.",
    "Tax rebates now available for new solar installations in Minnesota, check the guidelines here. ",
]
const Connections = ()=>{
   
    const [percentage,setPercentage] = useState<number>(0);
    const [isDetail,setIsDetail] = useState<boolean>(false);
    const {join_network,growMemMonth,upgrade_note,newConnections,totalMembers} = useNotificationContext();
   
    console.log("newconn network",newConnections);
    const {inviteShow,setInviteShow} = useAuthContext();
    return(
        <div>
            <Card style={{cursor:'pointer'}} onClick={()=>{setIsDetail(!isDetail)}} >
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <CircularProgressbar className="w-8 h-8 " value={100} text={`${growMemMonth}`} />
                        <div className="ml-3">
                            <p className="text-gray-500 text-xs whitespace-nowrap ">Network Growth</p>
                            <p className="text-gray-500 text-sm ">Connections</p>
                            <p className="text-gray-500 text-xs whitespace-nowrap">Total connections {totalMembers?totalMembers:0}</p>
                        </div>
                    </div>
                    <div className="justify-center w-18 flex-col">
                        <img src={images.manIcon} alt="" className="mx-auto  bg-[#03dac5] rounded-full p-1 py-2" />
                    </div>
                </div>
                
            </Card>
            
            {   
                isDetail&&(
                    <div>
                        <div className="flex justify-between">
                            <p className="text-bold text-lg py-2">Invite your contacts</p>
                        </div>
                        {
                            growMemMonth!==0&&(
                                <ItemDetail item={growMemMonth} category={ICategory.GROWMONTH}  /> 
                            )
                        }
                        {
                            newConnections.length>0&&
                            newConnections.map((item)=>{
                                return  <ItemDetail item={item} category={ICategory.CONNECTION}  /> 
                            })
                        }
                        {
                            join_network.length>0 && (
                                join_network.map((item)=>{
                                 return  <ItemDetail item={item} category={ICategory.JOIN_NETWORK}  /> 
                                })
                            )
                        }
                        {
                            upgrade_note&&(
                                <ItemDetail item={upgrade_note} category={ICategory.UPGRADE_NOTE}  /> 
                            )
                        }

                       {/* {
                        textData?.map((item:INotificationItem,index:any)=>{
                            return (
                                <ItemDetail item={item} category={ICategory.CONNECTION} key={index} />
                            )
                        })
                       } */}
                    </div>
                )
            }
        </div>
    )
}
export default Connections;