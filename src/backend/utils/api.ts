import { Api } from './index';
import axios, { AxiosInstance } from 'axios';


import { getCookie } from './cookies';
export type IJSONData = {
  [key:string]:any
}

export const convertFormData = (data:IJSONData):FormData =>{

  const formData = new FormData();
  if(!data) return formData;
  console.log(data)
  Object.keys(data).forEach(function(key) {
    console.log(data[key],key)
    formData.append(key,data[key]);
  });
  return formData
}
const http:  AxiosInstance  = axios.create({
      baseURL: Api.base_url,
      headers: {      
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "type": "formData"
      },
})

export const postBasicRequest = (url:string,data:any,callback:(error:string)=>void)=>{
    return http.post(url,data,{
      headers:{
        "auth-token": localStorage.getItem("jwt")
      }
    }).catch(error=>{
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        callback(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        callback(error.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        callback(error.message);
      }
    })
}
export const getBasicRequest = (url:string,data:any,callback:(error:string)=>void)=>{
  return http.post(url,data,{
    headers:{
      "auth-token": localStorage.getItem("jwt"),
    }
  }).catch(error=>{
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      callback(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      callback(error.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      callback(error.message);
    }
  })
}
export const getRequest = (url:string,data:any,callback:(error:string)=>void)=>{
  const formData = convertFormData(data);
  return getBasicRequest(url,formData,callback);
}
export const postRequest = (url:string,data:any,callback:(error:string)=>void)=>{
  const formData = convertFormData(data);
  return postBasicRequest(url,formData,callback);
}

export const signUp = (data:any,callback:(error:string)=>void)=>{
    return postRequest(Api.sign_up,data,callback);
}
export const mailVerify = (data:any,callback:(error:string)=>void)=>{
    return postRequest(Api.mail_verify,data,callback);
}

export const getProfile = (callback:(error:string)=>void)=>{
  return postRequest(Api.get_profile,null,callback);
}

export const createProfile = (data:any)=>{
  return http.post(Api.create_profile,data)
}
export const updateProfile = (data:any)=>{
  return http.post(Api.update_profile,data)
}

export const signIn = (data:any,callback:(error:string)=>void)=>{
  return postRequest(Api.login,data,callback);
}
export const submitProject = (data:any,callback:(error:string)=>void)=>{
  return postRequest(Api.submit_project,data,callback);
}
export const getProjects = (data:any,callback:(error:string)=>void)=>{
  return postRequest(Api.get_projects,data,callback);
}
export const handleSupportAPI  = ( data:any,callback:(error:string)=>void)=>{
  return postRequest(Api.support_project,data,callback);
}
export const handleInvite = (data:any,callback:(error:string)=>void)=>{
  return postRequest(Api.invite,data,callback);
}
export const getProjectForAnymouse = (callback:(error:string)=>void)=>{
  return postRequest(Api.getProjectForAnymouse,{},callback);
}
export const logout = (callback:(error:string)=>void)=>{
  return postRequest(Api.logout,{},callback);
}
export const getBackgroundAPI = (callback:(error:string)=>void)=>{
  return postRequest(Api.getBack,{},callback);
}
export const ForgotMail = (data:any,callback:(error:string)=>void)=>{
  return postRequest(Api.forgot_mail,data,callback);
}
export const getExtension = (callback:(error:string)=>void)=>{
  return postRequest(Api.getExtension,{},callback);
}
export const getTitle = (callback:(error:string)=>void)=>{
  return postRequest(Api.getTitle,{},callback);
}
export const getCardListApi = (callback:(error:string)=>void)=>{
  return postRequest(Api.getCards,{},callback);
}
export const setNewPassword  = async (data:any, callback:(error:string)=>void)=>{
  return postRequest(Api.set_password,data,callback);
}
export const AcceptRequest = async(data:any, callback:(error:string)=>void)=>{
  return postRequest(Api.accept_invite,data,callback);
}
export const InviteSignUpRequst = async(data:any, callback:(error:string)=>void)=>{
  return postRequest(Api.invite_sign_up,data,callback);
}