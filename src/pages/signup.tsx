import { useEffect,useState } from "react";
import { Label,TextInput,Checkbox,Button, Card,Alert} from "flowbite-react";
import { useRouterContext } from "../provider/router_context";
import {HiInformationCircle} from "react-icons/hi"
import { convertFormData, mailVerify, signUp } from "../backend/utils/api";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

const Signup = ()=>{
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
    const [verifyCode,setVerifyCode]= useState<number>(0);
    const [veryfyShow,setVerifyShow] = useState<boolean>(false)
    const [verifySucces,setVerifySuccess] = useState<boolean>(false);
    const [verifyResult,setVerifyResult] = useState<string>("");
    const [isAgree, setIsAgree]     = useState<boolean>(false);

    const {setRouter} = useRouterContext();
    const handleVerify =(e:any)=>{
          const value = e.target.value;
          if(value.length==6){
            const data = {
              email:email,
              random:value
            }
            mailVerify(data,(error:string)=>{
              setVerifyShow(true);
              setVerifySuccess(false);
              setVerifyResult(error);
            }).then((res:any)=>{
              if(!res) return;
              setIsSent(true);
              setIsSuccess(true);
              if(res.data.status){
                setVerifyShow(true);
                setVerifySuccess(true);
                setVerifyResult("Congratulations! You can use account");
                // setCookie("jwt",res.data.token);
                setRouter(5);
              }else{
                setVerifyShow(true);
                setVerifySuccess(false);
                setVerifyResult(res.data.message);
              }
            })
          }
    }
    const submitForm =async(event:React.FormEvent<HTMLFormElement>)=>{
      if(!isAgree) {
        setBeforeAlert(`You don't agree with this Terms and Conditions and Privacy Policy`);
        setIsShowBeforeAlert(true);
        return;
      }
      event.preventDefault();
      if(password !== repeat){
          setBeforeAlert(`Don't match password. Please input password again.`);
          setIsShowBeforeAlert(true);
          return;
      }
      const data ={
        email:email,
        password:password
      }
      signUp(data,(error)=>{
        setIsSent(true);
        setIsSuccess(false);
        setFaildAlert(error)
      }).then((res:any)=>{
        if(!res) return;
        if(res.data.status){
          setIsSent(true);
          setIsSuccess(true);
          setSuccessAlert(res.data.message)
        }else{
          setIsSent(true);
          setIsSuccess(false);
          setFaildAlert(res.data.message)
        }
      })
    }
    return(
        <div className="lg:container md:container mx-auto flex justify-center min-h-screen max-screen-h">
          <div className="max-w-[350px] mx-auto grow my-auto shadow-xl">
          <Card className="w-full">

                  {
                    !isSent&&
                    <div>
                      <h3 className="text-lg font-bold  ">Sign up</h3>      
                        <form className="flex flex-col gap-4" onSubmit={submitForm}>
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
                                onChange={(e:any)=>{setEmail(e.target.value);setIsShowBeforeAlert(false)}}
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
                            <Button type="submit" >
                              Register new account
                            </Button>
                            <div className="flex justify-end">
                              <a href="#" className="text-sm text-blue-500" onClick={()=>setRouter(5)}>Login</a>
                            </div>
                      </form>
                    </div>

                  }
                  {
                    (isSent&&!isSuccess)&&
                    <div>
                        <Alert  color="failure">
                        <span>
                          <span className="font-medium">
                            Faild Alert!
                          </span>
                          {' '}{faildAlert}
                        </span>
                      </Alert>
                    </div>
                    
                  }
                  {
                    (isSent&&isSuccess)&&
                    <div>
                      {
                      !veryfyShow&&
                      <Alert
                      color="info"
                      icon={HiInformationCircle}
                    >
                      <span>
                        <span className="font-medium">
                          Success!
                        </span>
                        {' '}{successAlert}
                      </span>
                    </Alert>
                      }
                      {
                      (veryfyShow&&verifySucces)&&
                      <Alert
                        color="info"
                        icon={HiInformationCircle}
                      >
                        <span>
                          <span className="font-medium">
                            Success!
                          </span>
                          {' '}{verifyResult}
                        </span>
                      </Alert>
                      }

                      {
                      (veryfyShow&&!verifySucces)&&
                      <Alert  color="failure">
                      <span>
                        <span className="font-medium">
                          Faild Alert!
                        </span>
                        {' '}{verifyResult}
                      </span>
                    </Alert>
                      }
                      <TextInput
                      type="number"
                      required={true}
                      shadow={true}
                      placeholder="please input verify code from mail"
                      onChange={handleVerify}
                      />
                    </div>
                    
                  }
                  {
                    isSent&&
                    <Button onClick={()=>setRouter(5)}>
                        back to login
                    </Button>
                  }
            </Card>
          </div>
        </div>
    )
}
export default Signup