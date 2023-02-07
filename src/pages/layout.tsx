import { useEffect } from "react";

import Header from "../components/header"
import Footer from "../components/footer"
import { useAuthContext } from "../provider/auth_provider";
import {useState} from 'react';
import { Api } from '../backend/utils/index';
import { url } from "inspector";

const Layout = ({children = null as any})=>{
    const {background} = useAuthContext();
    const [_back,setBack] = useState<string | null>();
    useEffect(()=>{
        if(background){
            setBack(background)          
        }
    },[background])
    useEffect(()=>{
        console.log(children, "childers")
    },[children])
    return (
        <div className='min-h-screen max-h-screen flex flex-col overflow-y-auto' style={{backgroundImage:`url(${Api.base_url+"/auth/back?img="+_back})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', zIndex:'-2'}}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
export default Layout;