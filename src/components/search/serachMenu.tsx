import { useRouterContext } from '../../provider/router_context';
import { IconType } from 'react-icons/lib';
import {FaSearch,FaMap} from "react-icons/fa";
import { HiPhotograph } from 'react-icons/hi';
import {BsNewspaper} from 'react-icons/bs';
import {useCallback} from 'react';
import ResultsMenuItem from './resultsMenuItem';
export type ISearchType ={
    title:string;
    icon:IconType;
    selected:boolean;
    onClick:()=>void;
}
export type ISearchTypes = Array<ISearchType>;
export default function SearchMenu (){
    const {search,setSearch,searchType,setSearchType} = useRouterContext();
    const doSearch  = ()=>{
        setSearchType("all");
    }
    const doImageSearch = ()=>{
        setSearchType("image");
    }
    const doNewsSearch = ()=>{
        window.open(`https://www.google.com/search?&tbm=nws${search?"&q="+search:""}`,'_blank');
    }
    let doMapsSearch = () => {
        window.open(`https://www.google.com/maps/search/${search?search:""}`,'_blank');
    };

    const searchTypes:ISearchTypes = [
        {
            title:"All",
            icon:FaSearch,
            selected: searchType !== 'image' ? true : false,
            onClick: doSearch,
        },
        {
            title:"Images",
            icon:HiPhotograph,
            selected: searchType === "image" ?true:false,
            onClick:doImageSearch
        },
        {
            title: "News",
            icon: BsNewspaper,
            selected: searchType === 'news' ? true : false,
            onClick: doNewsSearch,
        },
        {
            title: "Maps",
            icon: FaMap,
            selected: searchType === 'map' ? true : false,
            onClick: doMapsSearch,
        }
    ]

    return(
        <div className=" bg-white py-2 flex w-full text-gray-700 justify-evenly text-sm lg:text-base lg:justify-start lg:space-x-36 lg:pl-4 border-b">
            <div className="flex space-x-6">
                {
                    searchTypes.map((type, index) => {
                        return (<ResultsMenuItem key={index} Icon={type.icon} title={type.title} selected={type.selected} onClick={type.onClick}  />)
                    })
                }
            </div>
        </div>
    )
}