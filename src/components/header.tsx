import { useRef, useState }             from 'react';
import { Link}                          from 'react-router-dom';
import images                           from "../constant/images";
import {Navbar,Dropdown,Avatar, Button} from "flowbite-react"
import Profile                          from './profile';
import { useRouterContext }             from '../provider/router_context';
import { useAuthContext }               from '../provider/auth_provider';
import type { CustomFlowbiteTheme }     from "flowbite-react";

const Header = ()=>{
    const {router_id, setRouter, extensionUrl} = useRouterContext();
    const {email, name, imgURL, accountType}   = useAuthContext();
    const {isAnymouse, setIsAnymouse}          = useAuthContext();
    const dorpUseRef                           = useRef(null);

    return (
   
      <div className=''>
          <Navbar
            fluid={true}
            rounded={true}
            className=""
            >
            <Navbar.Brand onClick={()=>setRouter(0)}>
                <div  className='items-center flex'>
                    <img src={images.logo} className="mr-3 xs:h-12 " alt="SolGuerrilla Logo"/>
                    <h2 className="text-center text-4xl w-full"><span className="font-bold ">Sol</span> Guerrilla</h2>
                </div>
            </Navbar.Brand>
            
            <div className="flex md:order-2">
                {!isAnymouse &&
                    <Dropdown arrowIcon={false} inline={true} className="bg-[#f5f0f0] w-[400px]" label={<Avatar onClick={(e)=>{e.preventDefault();console.log(e)}} alt="User settings" img={imgURL} rounded={true}/>}>
                        <Profile  image={imgURL} name={name} account_type={accountType} />
                    </Dropdown>
                }
                {isAnymouse && 
                    <>
                        <Button className='mr-3 block text-sm xs:hidden sm:hidden md:block lg:block' type="submit" color="gray"    onClick={()=>{setIsAnymouse(!isAnymouse)}}>Log In</Button>
                        <Button className='mr-3 block text-sm xs:hidden sm:hidden md:block lg:block' type="submit" color="success" onClick={()=>{setRouter(3)}}>Sign Up</Button>
                    </>
                }
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className='py-2 text-center lg:z-0 md:z-0 sm:z-10 xs:z-10'>
                <a
                    href="#"
                    onClick={()=>{setRouter(0);}}
                    className="py-1"
                >
                Home
                </a>
                <a
                target="_blank"
                className="py-1"
                href={extensionUrl}
                >
                Extension
                </a>
                <a
                href="#"
                onClick={()=>setRouter(2)}
                className="py-1"
                >
                Projects
                </a>
                {!isAnymouse &&
                <a
                className="py-1"
                href="#"
                onClick={()=>setRouter(1)}
                >
                    Submit Project
                </a>
                }
                {isAnymouse && 
                <>
                    <a
                    className="py-1 xs:block sm:block md:hidden lg:hidden"
                    href="#"
                    onClick={()=>setIsAnymouse(!isAnymouse)}
                    >
                        Log In
                    </a>
                    <a
                    className="py-1 xs:block sm:block md:hidden lg:hidden"
                    href="#"
                    onClick={()=>setRouter(3)}
                    >
                        Sign Up
                    </a>
                </>
                }
            </Navbar.Collapse>
        </Navbar>
      </div>

    )
}
export default Header;