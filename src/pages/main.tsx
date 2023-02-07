import Layout from './layout';
import Login from './login';
import Signup from './signup';
import Profile from './create_profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InviteModal from '../components/common/modal/inviteModal';
import { useAuthContext } from '../provider/auth_provider';
import { handleInvite } from '../backend/utils/api';
import ProjectDetail from './projectDetail';
import SearchEngineIframe from './search_engin_iframe';
import Forgot from './forgot';
import { useRouterContext } from '../provider/router_context';
import Project from './project';
import SubmitProject from './submitProject';
import {DEFAULT_THEME} from "../themes";
import { applyTheme } from '../themes';
import { Button } from '../components/common/button';
import Home from './home';
import ContactUs from './ContactUs';

// import Terms from '../Doc/SolTerm';
// import Policy from '../Doc/SolPolicy'
import React, { useEffect, useState } from 'react';

const Main  = ()=>{
  const [theme,setTheme] = useState(DEFAULT_THEME);
  const {email} = useAuthContext();
  const {search} = useRouterContext();
  const {inviteShow,setInviteShow} = useAuthContext();
  const handleInviteModalClick = (toEmail:string)=>{
     if(toEmail == ""){
      toast.warn("please input gmail correctly!");
      return;
     }
      const data = {
        fromEmail:email,
        toEmail:toEmail
      }
      handleInvite(data,(error:string)=>{
        setInviteShow(false);
        toast.error(error);
      }).then(res=>{
        console.log(res, "RES-Invite")
        setInviteShow(false);
        if(!res)return;
        if(res.data.status){
          toast.success(res.data.message);
          return;
        }else{
          toast.error(res.data.message);
          return;
        }
      })
     
  }
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  const {router_id} = useRouterContext();
  const switchPage = (routerId:number)=>{
    switch(routerId){
      case 0: //home page
              return (<Layout><Home /><ToastContainer/><InviteModal onClick={handleInviteModalClick} isShow={inviteShow} onClose={()=>setInviteShow(false)}/></Layout>);
      case 1: // submit
              return (<Layout><SubmitProject /><ToastContainer/><InviteModal onClick={handleInviteModalClick} isShow={inviteShow} onClose={()=>setInviteShow(false)}/></Layout>);
      case 2: // project
              return (<Layout><Project /><ToastContainer/><InviteModal onClick={handleInviteModalClick} isShow={inviteShow} onClose={()=>setInviteShow(false)}/></Layout>);
      case 3: return (<div><Signup /><ToastContainer/></div>)
      case 4: return (<div><Profile/><ToastContainer/></div>)
      case 5: return(<div><Login /><ToastContainer/></div>)
      case 6: return(<div><ProjectDetail/><ToastContainer /></div>)
      case 7: return(<Layout><SearchEngineIframe   /></Layout>)
      case 8: return(<div><Forgot /><ToastContainer/></div>)
      case 9: return(<div><ContactUs /><ToastContainer/></div>)
      // case 10: return(<div><Policy /><ToastContainer/></div>)
      default:
               return (<div><Login /><ToastContainer/></div>);
    }
  }
  return switchPage(router_id);
}
export default Main;