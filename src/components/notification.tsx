import {useState} from "react";
import {Card} from "flowbite-react";
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import { INotificationItem } from "../provider/notification";
import 'react-circular-progressbar/dist/styles.css';
import images from "../constant/images";
import ItemDetail from "./itemDetail";
import { useNotificationContext } from "../provider/notification";
import { ICategory } from "./itemDetail";
import {useEffect} from 'react';
const textData = [
    "Congratulations! Your network grew by 13 members this week! ",
    "A project your support “Domingo MM school” reached its funding goals. ",
    "A project your support “Domingo MM school” reached its funding goals. ",
    "Take action by adding your voice to the upcoming COP 27 Agenda here.",
    "US congress to vote on new EV regulations, here is the draft proposal.",
    "Tax rebates now available for new solar installations in Minnesota, check the guidelines here. ",
]

const Notification = ()=>{
    const [isDetail,setIsDetail] = useState<boolean>(false);
    const {notification,growMemWeek,supportReachProject} = useNotificationContext();
    console.log("isDetail",isDetail)
  
    const [percentage,setPercentagle] = useState(0);
    useEffect(()=>{
        setPercentagle(1+notification.length+supportReachProject.length);
    },[notification,growMemWeek,supportReachProject])
    return(
        <div>
            <Card onClick={()=>{setIsDetail(!isDetail)}}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <CircularProgressbar   className="w-12 h-12 border-[#f74343]" styles={buildStyles({pathColor:`#f7434380`})} value={100} text={`${percentage}`} />
                        <div className="ml-3">
                            <p className="text-gray-500 text-xs">platform</p>
                            <p className="text-gray-500 text-sm">Notifications</p>
                            <p className="text-gray-500 text-xs">On</p>
                        </div>
                        
                    </div>
                    <div className="justify-center">
                        <img src={images.ringIcon} alt="" className="w-10 h-10 mx-auto" />
                        <p className="text-sm text-gray-200">Tab to view</p>
                    </div>
                </div>
            </Card>
            {
                isDetail&&(
                    <div>
                         {
                            growMemWeek&&
                            <ItemDetail item={growMemWeek} category={ICategory.GROWWEEK} />
                         }
                         {
                            supportReachProject.length>0&&
                            supportReachProject.map((item,index)=>{
                                return  <ItemDetail item={item} category={ICategory.SUPPORT} key={index} />
                            })
                         }
                       {
                        
                        notification?.map((item:INotificationItem,index:any)=>{
                            return (
                                <ItemDetail item={item} category={ICategory.NOTIFICATION} key={index} />
                            )
                        })
                       }
                    </div>
                )
            }
        </div>
    )
}
export default Notification;