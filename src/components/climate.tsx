import {Card} from "flowbite-react"
import { useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import images from "../constant/images";
import { useNotificationContext, INotificationItem } from '../provider/notification';
import ItemDetail, { ICategory } from "./itemDetail";
const Climate = ()=>{
    const [isDetail,setIsDetail] = useState<boolean>(false);
    const {notification} = useNotificationContext();
    return(
        <div>
        <Card style={{cursor:'pointer'}} onClick={()=>{setIsDetail(!isDetail)}}>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src={images.RaiseSqareIcon} alt="" className="w-8 h-6" />
                    <div className="ml-3">
                        <p className="text-gray-500 text-xs whitespace-nowrap">Climate Trends</p>
                    </div>
                    
                </div>
                <div>
                    <img src={images.LIcon} alt="" className="w-8 mx-auto" />
                </div>
                
            </div>
          
        </Card>
          {
            isDetail&&(
                 <div>
                 {
                     notification?.map((item:INotificationItem,index:any)=>{
                         if(item.category !== 1) return;
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
export default Climate;