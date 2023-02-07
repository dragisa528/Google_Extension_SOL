import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { AcceptRequest} from "../backend/utils/api";
import { ToastContainer, toast } from 'react-toastify';
import { useRouterContext } from "../provider/router_context";
import { Label,TextInput,Checkbox,Button, Card,Alert} from "flowbite-react";
import {HiInformationCircle} from "react-icons/hi"
import { InviteSignUpRequst } from "../backend/utils/api";

function InviteSignUp() {
    const {id} = useParams(); //hash value
     // const []
     const navigate = useNavigate();
     const [isSent ,setIsSent]= useState<Boolean>(false);
     const [isSuccess,setIsSuccess] = useState<Boolean>(false);
     const [email,setEmail] = useState<string>("");
     const [password,setPassword] = useState<string>("");
     const [repeat,setRepeat] = useState<string>("");
     const [faildAlert,setFaildAlert] = useState<string>("");
     const [successAlert,setSuccessAlert] = useState<string>("");
     const [beforeAlert,setBeforeAlert] = useState<string>("");
     const [isShowbeforeAlert,setIsShowBeforeAlert] = useState<boolean>(false)
     const [verifySucces,setVerifySuccess] = useState<boolean>(false);
     const [verifyResult,setVerifyResult] = useState<string>("");
     const [isAgree, setIsAgree]     = useState<boolean>(false);
 
     const {setRouter} = useRouterContext();
     const handleInviteSignUp =async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
       if(!id){
         setBeforeAlert(`Invalid Invite`);
         setIsShowBeforeAlert(true);
         return;
       }
       if(!isAgree) {
         setBeforeAlert(`You don't agree with this Terms and Conditions and Privacy Policy`);
         setIsShowBeforeAlert(true);
         return;
       }
       if(password !== repeat){
           setBeforeAlert(`Don't match password. Please input password again.`);
           setIsShowBeforeAlert(true);
           return;
       }
       const data ={
         email:email,
         password:password
       }
       InviteSignUpRequst({id:id,password:password,email:email},(error)=>{
            setBeforeAlert(error);
            setIsShowBeforeAlert(true);
        }).then(res=>{
            if(!res) return;
            if(res.data.status){
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);
            }
            navigate('/');
            setRouter(5); 
        });
     }
    useEffect(()=>{
        if(id){
            AcceptRequest({id:id},(error:string)=>{
            toast.error(error);
        }).then((res)=>{
            if(!res) return;
            if(typeof res === "string") return;
            if(!res.data.status){
                setEmail(res.data.data.email);
                // toast.success(res.data.message);
            }
            })
        }
        
    },[])

    return(
        <div className="lg:container md:container mx-auto flex justify-center min-h-screen max-screen-h">
          <div className="max-w-[350px] mx-auto grow my-auto shadow-xl">
          <Card className="w-full">

                  {
                    !isSent&&
                    <div>
                      <h3 className="text-lg font-bold  ">Invited Sign up</h3>      
                        <form className="flex flex-col gap-4" onSubmit={handleInviteSignUp}>
                            <div>
                              {
                                isShowbeforeAlert&&
                                <Alert  color="failure">
                                  <span>
                                    <span className="font-medium">
                                      Faild Alert!
                                    </span>
                                    {' '}{beforeAlert}
                                  </span>
                                </Alert>
                              }
                              <div className="mb-2 block">
                                <Label
                                  htmlFor="email2"
                                  value="Your email"
                                />
                              </div>
                              <TextInput
                                id="email2"
                                type="email"
                                placeholder="email@yourdomain"
                                required={true}
                                shadow={true}
                                value={email}
                                disabled
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label
                                  htmlFor="password2"
                                  value="Your password"
                                />
                              </div>
                              <TextInput
                                id="password2"
                                type="password"
                                required={true}
                                shadow={true}
                                onChange={(e:any)=>{setPassword(e.target.value);setIsShowBeforeAlert(false)}}
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label
                                  htmlFor="repeat-password"
                                  value="Repeat password"
                                />
                              </div>
                              <TextInput
                                id="repeat-password"
                                type="password"
                                required={true}
                                shadow={true}
                                onChange={(e:any)=>{setRepeat(e.target.value);setIsShowBeforeAlert(false)}}
                            
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="agree" onChange={(e)=>{setIsAgree(e.target.checked)}} className="p-4"/>
                              <Label htmlFor="agree">
                              Check to indicate that you agree to the{' '}
                                <a
                                  style={{cursor:"pointer"}}
                                  onClick={()=>window.open("/terms-and-conditions")}
                                  className="text-blue-600 hover:underline dark:text-blue-500"
                                >
                                  Terms and Conditions
                                </a>
                              {' '}and{' '}
                                <a
                                  style={{cursor:"pointer"}}
                                  onClick={()=>window.open("/privacy-policy")}
                                  className="text-blue-600 hover:underline dark:text-blue-500"
                                >
                                  Privacy Policy
                                </a>
                              </Label>
                            </div>
                            <Button type="submit" >
                              Register new account
                            </Button>
                      </form>
                    </div>

                  }
            </Card>
          </div>
        </div>
    )
}

export default InviteSignUp;