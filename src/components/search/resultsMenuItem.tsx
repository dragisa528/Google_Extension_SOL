import { IconType } from 'react-icons/lib';
export default function ResultsMenuItem ({Icon,title,selected,onClick}:{Icon:IconType,title:string,selected:boolean,onClick:()=>void}){
    return(
        <div className={`flex items-center space-x-1 border-b-4 border-transparent hover:text-blue-500 hover:border-blue-500 pb-2 cursor-pointer ${selected && 'text-blue-500 border-blue-500'}`} onClick={onClick}>
        <Icon className="h-4" />
        <p className="inline-flex" style={{minWidth:'60px'}}>{title}</p>
    </div>
    )
}