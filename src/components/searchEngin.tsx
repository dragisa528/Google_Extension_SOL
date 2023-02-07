import {Card} from "flowbite-react"
import 'react-circular-progressbar/dist/styles.css';
import images from "../constant/images";
const SearchEngin = ()=>{
    const percentage = 66;
    return(
        <Card style={{cursor:'pointer'}}>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src={images.searchIcon} alt="" className="w-8 h-8" />
                    <div className="ml-3">
                        <p className="text-gray-500 text-xs whitespace-nowrap">Default</p>
                        <p className="text-gray-500 text-sm whitespace-nowrap">Search Engine</p>
                        <p className="text-gray-500 text-xs whitespace-nowrap">Google </p>
                    </div>
                    
                </div>
                <div className="justify-center">
                    <img src={images.googleIcon} alt="" className="w-8 h-8 mx-auto" />
                </div>
            </div>
        </Card>
    )
}
export default SearchEngin;