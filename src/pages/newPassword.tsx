import { useEffect,useState } from "react";
import { Label,TextInput,Checkbox,Button, Card,Alert} from "flowbite-react";
import { useRouterContext } from "../provider/router_context";
import {HiInformationCircle} from "react-icons/hi"
import { convertFormData, mailVerify, signUp } from "../backend/utils/api";
import { setCookie } from "../backend/utils/cookies";
import { setNewPassword } from "../backend/utils/api";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

const NewPassword = ()=>{
    const {id} = useParams(); //hash value
  // const verification
  const navigate = useNavigate();
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [isAgree, setIsAgree]     = useState<boolean>(false);
  const [faildAlert,setFaildAlert] = useState<string>("");
  const [successAlert,setSuccessAlert] = useState<string>("");
  const [beforeAlert,setBeforeAlert] = useState<string>("");
  const [agreement, setAgreement] = useState(true);
  const handleSetAgremment = () => setAgreement(!agreement);
  const {setRouter} = useRouterContext();
  const [isShowbeforeAlert,setIsShowBeforeAlert] = useState<boolean>(false)
  const handleNewPassword =async(event:React.FormEvent<HTMLFormElement>)=>{
    if(!isAgree) {
      setBeforeAlert(`You don't agree with this Terms and Conditions and Privacy Policy`);
      setIsShowBeforeAlert(true);
      return;
    }
    if(id){
      event.preventDefault();
        if(password !== confirmPassword){
          setBeforeAlert(`Dont match password. Please input password again`);
          setIsShowBeforeAlert(true);
          return;
      }
      const data ={
        id       : id,
        password : password
      }
      setNewPassword(data, (error)=>{
        setFaildAlert(error);
      }).then(res=>{
        if(!res) return;
        if(res.data.status){
          setSuccessAlert(res.data.message)
          navigate("/"); setRouter(5);
        } else {
          setFaildAlert(res.data.message)
        }
      })
      // if(password != "" && confirmPassword !="" && password === confirmPassword ){
      //   setNewPassword({id:id,password:password},(error)=>{
      //     toast.error(error);
      //   }).then(res=>{
      //     if(!res) return;
      //     if(res.data.status){
      //       toast.success(res.data.message);
      //       navigate("/"); setRouter(5);
      //     }else{
      //       toast.warning(res.data.message);
      //     }
      //   });
      // }else{
      //   toast.warning("Please input password correctly!");
      // }
    }
    else{
        setFaildAlert("Invalid Invite")
    }
  }

    return(
        <div className="lg:container md:container mx-auto flex justify-center min-h-screen max-screen-h">
            <div className="max-w-[350px] mx-auto grow my-auto shadow-xl">
                <Card className="w-full">
                    <h3 className="text-lg font-bold  ">Set New Password</h3>      
                    <form className="flex flex-col gap-4" onSubmit={handleNewPassword}>
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
                                htmlFor="New-Password"
                                value="New Password"
                            />
                            </div>
                            <TextInput
                            id="New-Password"
                            type="password"
                            required={true}
                            shadow={true}
                            onChange={(e)=>{setPassword(e.target.value);setIsShowBeforeAlert(false)}}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label
                                htmlFor="Confirm-password"
                                value="Confirm Password"
                            />
                            </div>
                            <TextInput
                            id="Confirm-password"
                            type="password"
                            required={true}
                            shadow={true}
                            onChange={(e)=>{setConfirmPassword(e.target.value);setIsShowBeforeAlert(false)}}
                        
                            />
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="agree" onChange={(e)=>{setIsAgree(e.target.checked)}} className="p-4"/>
                          <Label htmlFor="agree">
                          Check to indicate that you agree to the{' '}
                            <a
                              style={{cursor:"pointer"}}
                              onClick={()=>navigate("/terms-and-conditions")}
                              className="text-blue-600 hover:underline dark:text-blue-500"
                            >
                              Terms and Conditions
                            </a>
                          {' '}and{' '}
                            <a
                              style={{cursor:"pointer"}}
                              onClick={()=>navigate("/privacy-policy")}
                              className="text-blue-600 hover:underline dark:text-blue-500"
                            >
                              Privacy Policy
                            </a>
                          </Label>
                        </div>
                        <Button type="submit">
                            Set New Password
                        </Button>
                        <div className="flex justify-end">
                            <a href="#" className="text-sm text-blue-500" onClick={()=>{navigate("/"); setRouter(5);}}>Login</a>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}
    export default NewPassword;