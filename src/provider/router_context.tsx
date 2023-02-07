import React, { useState,createContext, useContext, useEffect } from "react"
import { getExtension } from "../backend/utils/api";
import { getTitle } from "../backend/utils/api";
import { IProjectForAny } from "../pages/project";
import { useAuthContext } from "./auth_provider";
import { toast } from 'react-toastify';
export type IRouterContext ={
    router_id: number;
    setRouter:(router_id:number)=>void;
    viewProject:(project:any)=>void;
    curProject:any;
    setCurProject:(project:any)=>void;
    search:string;
    setSearch:(query:string)=>void;
    searchType:string;
    setSearchType:(query:string)=>void;
    start:number;
    setStart:(num:number)=>void;
    extensionUrl:string;
    titleName:string;
}
const RouterContext = createContext<IRouterContext>({} as IRouterContext);
const RouterProvider = ({children = null as any})=>{
    const [routerId,setRouterId] = useState<number>(5);
    const {isAuth,setIsAuth,isAccountInit,setAccountInit,isAnymouse} = useAuthContext();
    const [curProject,setCurProject] = useState<IProjectForAny|null>(null);
    const [search,setSearch] = useState<string>("");
    const [searchType,setSearchType] = useState<string>("");
    const [start,setStart] = useState<number>(0);
    const [extensionUrl,setExtensionUrl] = useState<string>("");
    const [titleName, setTitleName] = useState<string>("");
    const viewProject = (project:IProjectForAny|null)=>{
        setCurProject(project);
        setRouterId(6);
    }
    const getExtensionUrl = ()=>{
        getExtension((error:any)=>{
            toast.error(error);
            return
        }).then((res:any)=>{
            if(!res) return;
            if(res.data.status){
                console.log("extensionurl",res.data.url);
                setExtensionUrl(res.data.url);
            }
        })
    }

    const getTitleName = ()=>{
        getTitle((error:any)=>{
            toast.error(error);
            return
        }).then((res:any)=>{
            if(!res) return;
            if(res.data.status){
                setTitleName(res.data.url);
            }
        })
    }
    useEffect(()=>{
        getExtensionUrl();
        getTitleName();
    },[])
    useEffect(()=>{
        if(!isAnymouse){
            if(!isAuth) setRouterId(5) //login page
            else {
                if(!isAccountInit) setRouterId(4) //create profile page
                else setRouterId(0) //home page
            }
        }else{
            setRouterId(0); //home page
        }
    },[isAuth,isAccountInit,isAnymouse])

    const value = {
        router_id :routerId,
        setRouter:setRouterId,
        curProject:curProject,
        setCurProject:setCurProject,
        viewProject:viewProject,
        search:search,
        setSearch:setSearch,
        searchType:searchType,
        setSearchType:setSearchType,
        start:start,
        setStart:setStart,
        extensionUrl:extensionUrl,
        titleName:titleName
    };
    return(
        <RouterContext.Provider value={value}>
            {children}
        </RouterContext.Provider>
    )
}
export default RouterProvider;

export const useRouterContext = ()=>{
    return useContext(RouterContext);
}