// import {SendJsonMessage} from 'react-use-websocket';

export enum PARKET_TYPE {
    INIT = "init",
    ALL_NOTE = "all_note",
    FOR_USER = 'for_user'
}
export const makeInitData = (data:any)=>{
    return JSON.stringify({type:PARKET_TYPE.INIT,data:data});
}

export const parsePacket = (parket:string,sendJsonMessage:any)=>{
    const jsonData = JSON.parse(parket)
    console.log("jsonData",jsonData)
    switch(jsonData.type){
    case PARKET_TYPE.INIT:
        console.log("init",jsonData)
        sendJsonMessage({type:"init"})
        break;
    case PARKET_TYPE.ALL_NOTE:
        
        break;
    default:
        console.log("defuault message:",jsonData)
        break;
    }
}
