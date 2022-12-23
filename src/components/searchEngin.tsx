import {Card} from "flowbite-react"
import 'react-circular-progressbar/dist/styles.css';
import images from "../constant/images";
const SearchEngin = ()=>{
    const percentage = 66;
    return(
        <Card >
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src={images.searchIcon} alt="" className="w-12 h-12" />
                    <div className="ml-3">
                        <p className="text-gray-500 text-xs whitespace-nowrap">Default</p>
                        <p className="text-gray-500 text-sm whitespace-nowrap">Search Engine</p>
                        <p className="text-gray-500 text-xs whitespace-nowrap">Google </p>
                    </div>
                    
                </div>
                <div className="w-12">
                    <img src={images.googleIcon} alt="" className="h-12 w-12" />
                </div>
            </div>
        </Card>
    )
}
export default SearchEngin;