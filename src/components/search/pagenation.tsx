import { useRouterContext } from '../../provider/router_context';
import { useCallback } from 'react';

export default function PaginationButtons() {
    const {start,setStart} = useRouterContext();
    const startIndex  = Number(start) || 0;

    const handeprev =  useCallback(()=>{
        if(startIndex>=10){
            setStart(startIndex-10);
        }
    },[startIndex])
    const handeNext =  useCallback(()=>{
    
            setStart(startIndex+10);
        
    },[startIndex])
    return (
        <div className="flex justify-between max-w-lg text-blue-700 mb-10">
            {startIndex >= 10 && (
                <a onClick={()=>handeprev()} >
                    <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
                      {/* <ChevronLeftIcon className="h-5" /> */}
                      <p>Previous</p>
                    </div>
                </a>
            )}
            <a onClick={()=>handeNext()} >
                <div  className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
                    {/* <ChevronRightIcon className="h-5" /> */}
                    <p>Next</p>
               </div>
            </a>
        </div>
    )
}