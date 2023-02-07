import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useRouterContext } from "../provider/router_context";

//this is a react Footer Component , try it..
  export default function Footer(){

// const navigate = useNavigate();
const {setRouter} = useRouterContext();

return(<>
<div className="footer xs:mt-50 sm:hidden md:hidden lg:block" id='Footer' style={{backgroundColor:'#333'}}>
    <MDBFooter className='bg-dark sm-2' style={{color:'#666'}}>
        <div className='p-1' style={{wordBreak: 'break-all'}}>
            <span className='lg:ml-40 xs:ml-2 sm:ml-10 md:ml-20'>
                <a style={{cursor:"pointer", whiteSpace: "nowrap"}} onClick={()=>window.open("/terms-and-conditions")}>
                Terms and Conditions
                </a>
            </span>
            <span className='lg:ml-20 xs:ml-1 sm:ml-5 md:ml-10'>
                <a style={{cursor:"pointer", whiteSpace: "nowrap"}} onClick={()=>window.open("/privacy-policy")}>
                Privacy Policy
                </a>
            </span>
            <span style={{cursor:"pointer", whiteSpace: "nowrap"}} className='lg:ml-20 xs:ml-1 sm:ml-5 md:ml-10'>
                <a href='mailto:global@solguerrilla.com'>
                Contacts
                </a>
            </span>
            <span className='lg:ml-20 xs:ml-1 sm:ml-5 md:ml-10'>
                <a style={{cursor:"pointer", whiteSpace: "nowrap"}} onClick={()=>setRouter(9)}>
                About Us
                </a>
            </span>
            <span className='lg:ml-20 xs:ml-1 sm:ml-5 md:ml-10' style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                © 2023&nbsp;
                <a href='https://solguerrilla.com/'>
                SolGuerrilla
                </a>
            </span>
        </div>
    </MDBFooter>
</div>
    </>)

  }
