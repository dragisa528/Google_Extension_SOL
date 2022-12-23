import {Card} from "flowbite-react"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import images from "../constant/images";
import { useNotificationContext } from "../provider/notification";
const Projects = ()=>{
    const {lifeTime}= useNotificationContext();
    console.log("lifetime",lifeTime)
    
    return(
        <Card >
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="relative">
                    <CircularProgressbar className="w-12 h-12" value={100} text={`${lifeTime?lifeTime.cur_power:0}`} />
                    <p className="absolute bottom-1 left-3 text-[10px] text-blue-400">kWh</p>
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-400 text-xs whitespace-nowrap">All Projects</p>
                        <p className="text-gray-500 text-sm whitespace-nowrap">Total power generated</p>
                        <p className="text-gray-400 text-xs whitespace-nowrap">Lifetime {lifeTime?(lifeTime.total_power/1000).toFixed(2):0}MWH </p>
                    </div>
                    
                </div>
                <div className="w-12">
                    <img src={images.sqareIcon} alt="" className="mx-auto border-2 w-10 h-10 rounded-full p-2 border-[#0bc00b]" />
                </div>
            </div>
        </Card>
    )
}
export default Projects;