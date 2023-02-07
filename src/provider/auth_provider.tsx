import React, { useState,createContext, useContext, useEffect } from "react"
import { toast } from "react-toastify";
import { Api } from "../backend/utils";
import { getBackgroundAPI, getProfile } from "../backend/utils/api";
import { getCookie } from "../backend/utils/cookies";

// import SuperTokens from "supertokens-auth-react";
export type IAuthProvider ={
    email: string;
    name: string;
    isAuth:boolean;
    isAccountInit:boolean;
    accountType:string;
    imgURL:string,
    isAnymouse:boolean,
    setIsAnymouse:(isAnymouse:boolean)=>void,
    setIsAuth:(isAuth:boolean)=>void;
    setEmail:(email:string)=>void;
    setName:(name:string)=>void;
    setAccountInit:(init:boolean)=>void;
    inviteShow:boolean;
    setInviteShow:(init:boolean)=>void;
    background:string | null;
    proInfo:{city:string,country:string,state:string} | null;
}
const AuthContext = createContext<IAuthProvider>({} as IAuthProvider);
const AuthProvider = ({children = null as any})=>{
    const [isAuth,setIsAuth] = useState<boolean>(false);
    const [isAccountInit,setIsAccountInit] = useState<boolean>(false)
    const [email,setEmail] = useState<string>("");
    const [name,setName] = useState<string>("");
    const [img_url,setImgUrl] = useState<string>("");
    const [accountType,setAccountType] = useState<string>("");
    const [inviteShow,setInviteShow] = useState<boolean>(false);
    const [isAnymouse ,setIsAnymouse] = useState<boolean>(true);
    const [background,setBackground] = useState<string | null>(null);
    const [proInfo,setProInfo] = useState<{city:string,state:string,country:string} | null>(null);
    const getBackground = ()=>{
        getBackgroundAPI(error=>{
            return;
        }).then((res)=>{
            if(!res)return;
            if(res.data.status){
                setBackground(res.data.back);
            }
        })
    }
    const token = localStorage.getItem('jwt');
    useEffect(()=>{
        if(token){
            setIsAnymouse(false);
        }else{
            setIsAnymouse(true);
        }
    },[token]);
    const getProfileInfo = ()=>{
        getProfile((error)=>{
            // toast.error(error);
            setIsAuth(false);
            setIsAccountInit(false);
            setEmail("");
            setName("");
            setAccountType("");
            setImgUrl("")
            setProInfo(null);
            return;
        }).then((res:any)=>{
            if(!res) {
                setIsAuth(false);
                setIsAccountInit(false);
                setEmail("");
                setName("");
                setAccountType("");
                setImgUrl("")
                setProInfo(null);
                return;
            };
            setIsAuth(true);
            setEmail(res.data.email);
            setName(res.data.first_name+" "+res.data.last_name);
            setAccountType(res.data.account_type);
            setImgUrl(Api.host_url+"/api/auth/profileImg?img="+res.data.img);
            setProInfo({city:res.data.city,state:res.data.state,country:res.data.country});
            if(res.data.is_init) setIsAccountInit(true);
            else setIsAccountInit(false);
        })
    }
    
    useEffect(()=>{
            if(!isAnymouse){
                getProfileInfo();
            }else{
                setIsAuth(false);
                setIsAccountInit(false);
                setEmail("");
                setName("");
                setAccountType("")
                setImgUrl("");
            }
    },[isAuth,isAnymouse])
    useEffect(()=>{
        getBackground();
    },[])
    const value = {
       email:email,
       name:name,
       isAuth:isAuth,
       isAccountInit:isAccountInit,
       accountType:accountType,
       imgURL:img_url,
       inviteShow:inviteShow,
       isAnymouse:isAnymouse,
       setIsAnymouse:setIsAnymouse,
       setIsAuth:setIsAuth,
       setEmail:setEmail,
       setName:setName,
       setAccountInit:setIsAccountInit,
       setInviteShow:setInviteShow,
       background:background,
       proInfo:proInfo
    };
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}