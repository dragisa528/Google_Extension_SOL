import { useEffect } from "react";

import Header from "../components/header"
import { useAuthContext } from "../provider/auth_provider";
import {useState} from 'react';
import { Api } from '../backend/utils/index';
import { url } from "inspector";
const Layout = ({children = null as any})=>{
    const {background} = useAuthContext();
    const [_back,setBack] = useState<string | null>();
    useEffect(()=>{
        if(background){
            console.log("back",background)
            setBack(background)
        }
    },[background])
    return (
        <div className='min-h-screen max-h-screen flex flex-col overflow-y-auto' style={{backgroundImage:`url(${Api.base_url+"/auth/back?img="+_back})`,backgroundSize:"100% 100%"}}>
           
            <Header />
            {children}
        </div>
    )
}
export default Layout;