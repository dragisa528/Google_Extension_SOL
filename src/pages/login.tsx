import { Label,TextInput,Checkbox,Button, Card,Alert} from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { convertFormData, signIn } from "../backend/utils/api";
import { setCookie } from "../backend/utils/cookies";
import { useAuthContext } from "../provider/auth_provider";
import { useRouterContext } from "../provider/router_context";

const Login  = ()=>{
    const {setRouter} = useRouterContext();
    const [isToastShow,setIsToastShow]= useState<boolean>(false);
    const [toastContent,setToastContent]= useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const {setIsAuth} = useAuthContext();
    const submitForm =(event:React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const data ={
        email:email,
        password:password
      }
      signIn(data,(error:any)=>{
        if(typeof error !=="string"){
          if(!error.status) toast.error(error.message)
        }else{
           toast.error(error);
        }
        console.log(error)
      }).then(res=>{
        console.log(res)
        if(!res) return;
        if(res.data.status){
          // setCookie('jwt',res.data.token);
          localStorage.setItem("jwt",res.data.token);
          setIsAuth(true);
        }else{
          setIsToastShow(true);
          setToastContent(res.data.message);
        }
      }).catch(error=>{
          console.log("error",error)
          if(error.response?.data == "Unauthorized"){
            setIsToastShow(true);
            setToastContent("Email or Password is wrong");
          }
          toast.error(error)
      })
    }
    return(
      <div className="lg:container md:container mx-auto flex justify-center min-h-screen max-screen-h w-full">
          <div className="max-w-[350px] mx-auto grow my-auto shadow-xl">
            <Card className="w-full">
              <h3 className="text-lg font-bold  ">Sign in</h3>          
                <form className="flex flex-col gap-4" onSubmit={submitForm}>
                  <div>
                  {
                    isToastShow&&
                    <Alert
                      color="failure"
                      icon={HiInformationCircle}
                    >
                      <span>
                        <span className="font-medium">
                          Info alert!
                        </span>
                        {' '}{toastContent}
                      </span>
                    </Alert>
                  }
              
                    <div className="mb-2 block">
                      <Label
                        htmlFor="email1"
                        value="Your email"
                      />
                    </div>
                    <TextInput
                      id="email1"
                      type="email"
                      placeholder="email@yourdomain"
                      required={true}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="password1"
                        value="Your password"
                      />
                    </div>
                    <TextInput
                      id="password1"
                      type="password"
                      required={true}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 ">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="">
                          Remember me
                      </Label>
                      </div>
                      <div className="flex justify-between grid grow xs:grid-cols-1">
                      <a href="#" className="text-blue-400 ml-10" onClick={()=>setRouter(3)}>sign up</a>
                      <a href="#" className="text-blue-400 ml-10" onClick={()=>setRouter(8)}>forgot password</a>

                      </div>
                  </div>
                  <Button type="submit">
                      Login
                  </Button>
                  <a className="text-blue-400 text-sm text-end" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Skip Login/Sign Up</a>
                </form>
            </Card>
          </div>
      </div>
    )
}
export default Login;