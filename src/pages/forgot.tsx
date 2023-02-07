import { Label,TextInput,Checkbox,Button, Card,Alert} from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { convertFormData, ForgotMail, signIn } from "../backend/utils/api";
import { setCookie } from "../backend/utils/cookies";
import { useAuthContext } from "../provider/auth_provider";
import { useRouterContext } from "../provider/router_context";

const Forgot  = ()=>{
    const [email,setEmail] = useState<string>("");
    const {setRouter} = useRouterContext();
    const submitForm =async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(email === ""){
            toast.warning("Please input email");
            return;
        }
        const data = {
            email:email
        }
        ForgotMail(data,(error)=>{
            toast.error(error);
            return;
        }).then(res=>{
            if(!res) return;
            if(res.data.status){
                toast.success(res.data.message);
                setRouter(5);
            }else{
                toast.warning(res.data.message);
                return;
            }
        })

    }
    const handleBack = ()=>{
        setRouter(5);
    }
   return(
    <div className="lg:container mx-auto min-h-screen max-h-screen flex justify-center">
        <div className="my-auto h-full  w-full max-w-[500px] mx-auto shadow-xl ">
            <Card>
                <div >
                    <h3 className="text-lg font-bold mb-3 ">Email Address</h3>      
                    <form className="flex flex-col gap-4" onSubmit={submitForm}>
                        <TextInput
                            id="email2"
                            type="email"
                            placeholder="email@yourdomain"
                            required={true}
                            shadow={true}
                            onChange={(e:any)=>{setEmail(e.target.value);}}
                            />
                             <div className="flex gap-4 justify-end">
                             <Button type="submit" >
                                send
                            </Button>
                            <Button  color={"failure"} onClick={handleBack}>
                                back
                            </Button>
                             </div>
                    </form>
                </div>
            </Card>
        </div>
    </div>
   )
}
export default Forgot;