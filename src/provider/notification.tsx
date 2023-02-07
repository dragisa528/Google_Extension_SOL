import React, { useState,createContext, useContext,useEffect,useCallback } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
// import useWebSocket from  ["react-use-websocket"](<https://github.com/robtaussig/react-use-websocket>);
import { makeInitData, PARKET_TYPE } from "../backend/socket";

import { Api } from "../backend/utils";
import { ICategory } from "../components/itemDetail";
// import SuperTokens from "supertokens-auth-react";
import { useAuthContext } from './auth_provider';
export type INotificationItem = {
  id:number;
  text:string,
  link:string,
  category:ICategory,
  create_at:string
}
export type INotification ={
    notification:Array<INotificationItem>;
    growMemWeek:number;
    growMemMonth:number;
    totalMembers:number;
    supportReachProject:Array<string>;
    upgrade_note:string |null;
    newConnections:Array<any>;
    join_network:Array<any>;
    supportProjects:Array<any>;
    lifeTime:any;
}

const NotificationContext = createContext<INotification>({} as INotification);
const NotificationProvider = ({children = null as any})=>{
    // const [socketUrl, setSocketUrl] = useState("");
    const [notification,setNotification] = useState<Array<INotificationItem>>([]);
    const [grow_mem_week,setGrowMemWeek] = useState<number>(0);
    const [gorw_mem_month,setGrowMemMonth] = useState<number>(0);
    const [total_member,setTotalMembers] = useState<number>(0);
    const [supportReached,setSupportRached] = useState<Array<string>>([]);
    const [joinedNetwork,setJoindNetwork] = useState<Array<string>>([]);
    const [upgradeNote,setUpgradeNote] = useState<string | null>(null);
    const [newConnections,setNewconnection] = useState<Array<any>>([]);
    const {email,isAuth,isAnymouse} = useAuthContext();
    const [socket_url,setSocketUrl] = useState<string>("");
    const [supportProjects,setSupportProject] = useState<Array<any>>([]);
    const [lifeTime,setLifeTime] = useState<any>({});
    const { sendJsonMessage, getWebSocket } = useWebSocket(socket_url, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap['message']) =>  parsePacket(event.data)
  });
  useEffect(()=>{
    console.log(isAnymouse,"isanyomous")
    if(email !=="" && isAuth && !isAnymouse){
      setSocketUrl(Api.websocket_base_url)
    }
  },[isAuth,isAnymouse])
  const parsePacket =useCallback((parket:string)=>{
    if(email === "") return;
    const jsonData = JSON.parse(parket)
    console.log("jsonData",jsonData)
    switch(jsonData.type){
    case PARKET_TYPE.INIT:
        sendJsonMessage({type:"init",content:{email:email}})
        break;
    case PARKET_TYPE.ALL_NOTE:
      if(jsonData.content.status){
        console.log("notification",jsonData.notification)
        setNotification(jsonData.content.notification); 
      }
        break;
    case PARKET_TYPE.FOR_USER:
      if(jsonData.content.status){
        console.log("for users information-------------------",jsonData.content);
        setGrowMemWeek(jsonData.content.grow_mem_week);
        setGrowMemMonth(jsonData.content.grow_members)
        setTotalMembers(jsonData.content.total_members);
        setSupportRached(jsonData.content.supportReachedPorjects)
        setJoindNetwork(jsonData.content.joind_note);
        setUpgradeNote(jsonData.content.upgrade_note);
        setNewconnection(jsonData.content.network_note);
        setSupportProject(jsonData.content.supportProjects);
        setLifeTime(jsonData.content.life_time);
      }
      break;
    default:
        console.log("defuault message:",jsonData)
        break;
    }
},[email])  
    
    const value ={
        notification:notification,
        supportReachProject:supportReached,
        growMemWeek:grow_mem_week,
        growMemMonth:gorw_mem_month,
        upgrade_note:upgradeNote,
        newConnections:newConnections,
        join_network:joinedNetwork,
        supportProjects:supportProjects,
        lifeTime:lifeTime,
        totalMembers:total_member
    }

    return(
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}
export default NotificationProvider;

export const useNotificationContext = ()=>{
    return useContext(NotificationContext);
}