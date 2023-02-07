import {Card} from "flowbite-react"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import images from "../constant/images";
import { useNotificationContext } from "../provider/notification";
const Projects = ()=>{
    const {lifeTime}= useNotificationContext();
    console.log("lifetime",lifeTime)
    
    return(
        <Card style={{cursor:'pointer'}}>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="relative">
                    <CircularProgressbar className="w-8 h-8" value={80} text={`${lifeTime?lifeTime.cur_power:0}`} />
                    <p className="left-3 text-[10px] text-blue-400 ml-1.5">kWh</p>
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-400 text-xs whitespace-nowrap">All Projects</p>
                        <p className="text-gray-500 text-xs whitespace-nowrap">Total power generated</p>
                        <p className="text-gray-400 text-xs whitespace-nowrap">Lifetime {lifeTime?(lifeTime.total_power/1000).toFixed(2):0}MWH </p>
                    </div>
                    
                </div>
                <div className="justify-center">
                    <img src={images.sqareIcon} alt="" className="mx-auto w-8 h-8 mx-auto" />
                </div>
            </div>
        </Card>
    )
}
export default Projects;