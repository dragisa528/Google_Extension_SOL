import { useEffect, useState, useRef, useCallback } from 'react';
import { Label,TextInput,Checkbox,Button, Card,Avatar,FileInput} from "flowbite-react";
import { useRouterContext } from "../provider/router_context";
import {toast} from "react-toastify";
import { fileToBase64 } from "../helpers";
import { useAuthContext } from "../provider/auth_provider";
import { convertFormData, createProfile, getProfile, updateProfile } from "../backend/utils/api";
import { Api } from "../backend/utils";
const Profile  = ()=>{
    const [isAvatarValid,setIsAvatarValid] = useState<boolean>(false)
    const {setRouter} = useRouterContext();
    const inputFile = useRef(null)
    const {email,imgURL,isAccountInit,name,proInfo} = useAuthContext();
    const [first_name,setFirstName] = useState<string>(isAccountInit?name.split(" ")[0]:"");
    const [last_name,setLastName] = useState<string>(isAccountInit?name.split(" ").length?name.split(" ")[1]:"":"");
    const [city,setCity] = useState<string>(isAccountInit?proInfo?proInfo.city:"":"");
    const [stateProvince,setStateProvince] = useState<string>(isAccountInit?proInfo?proInfo.state:"":"");
    const [country,setCountry] = useState<string>(isAccountInit?proInfo?proInfo.country:"":"");
    const [base64,setBase64] = useState<string>("");
    const [curFile,setCurFile] = useState<File|null>(null);
    const submitForm =(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        
        // console.log("------email-----",email)
        // if(!isAccountInit && !curFile){
        //     toast.warn("please select photo");
        //     return;
        // }
        
        let data;
        if(curFile){

             data ={
                email:email,
                first_name:first_name,
                last_name:last_name,
                city:city,
                state:stateProvince,
                country:country,
                file_name:curFile?.name,
                img_file:curFile,
                isUpdate:isAccountInit                
            }
            
            const formData = convertFormData(data);
            createProfile(formData).then((res:any)=>{
                if(res.data.status){
                    toast.success("update profile successful")
                    window.location.reload();
                }else{
                    toast.warning(res.data.message)
                }
            })
            
        }else{
             data ={
                email:email,
                first_name:first_name,
                last_name:last_name,
                city:city,
                state:stateProvince,
                country:country,
                isUpdate:isAccountInit
            }
            const formData = convertFormData(data);

            updateProfile(formData).then((res:any)=>{
                if(res.data.status){
                    toast.success("update profile successful")
                    window.location.reload();
                }else{
                    toast.warning(res.data.message)
                }
            })
        }
           
      }
      const handleBack = ()=>{
        setRouter(0);
      }
      const onFileChange = (event:any)=>{
        if(!event || !event.currentTarget || !event.currentTarget.files)return;
        const _curFile = event.currentTarget.files[0];
        const fileType = _curFile.type;
        if(fileType=="image/jpeg" || fileType =="image/png" || fileType=="image/jpg"){
            // fileToBase64(curFile).then((res:string)=>{
            //     console.log(res);
            //     // setBase64(res)
            // });

            
           setCurFile(_curFile)
           setIsAvatarValid(true);
        }else{
            toast.warning("Image is supported only jpg and png!");
            return;
        }
        console.log(_curFile)
      }
    return(
        <div className="md:container flex justify-center mx-auto min-h-screen max-h-screen">
            <div className=" mx-auto my-auto w-max-[600px] grow shadow-2xl">
                <Card className="w-full">
                    <form className="flex flex-col gap-4" method="post"  onSubmit={submitForm}>
                            {/* <img src={Api.host_url+"/api/auth/profileImg?img="+imgURL} alt="1"  /> */}
                            <div className="flex justify-center w-full">
                            {
                                (!isAccountInit&&isAvatarValid)&&
                                <Avatar
                                    img={curFile?URL.createObjectURL(curFile):""}
                                    rounded={true}
                                    bordered={true}
                                    size="xl"
                                    style={{cursor:"pointer"}}
                                     
                                />
                            }
                            {
                                (!isAccountInit&&!isAvatarValid)&&
                                <Avatar rounded={true} img={curFile?URL.createObjectURL(curFile):""} bordered={true}
                                size="xl"
                                style={{cursor:"pointer"}} />
                            }
                            {
                                (isAccountInit&&imgURL!=="")&&
                                <Avatar rounded={true} img={curFile?URL.createObjectURL(curFile):imgURL}  bordered={true}
                                size="xl"
                                style={{cursor:"pointer"}} />
                            }
                             {
                                (isAccountInit&&imgURL==="")&&
                                <Avatar rounded={true} img={curFile?URL.createObjectURL(curFile):""}  bordered={true}
                                size="xl"
                                style={{cursor:"pointer"}} />
                            }
                            </div>
                            <div className="flex justify-center mt-3">
                                <FileInput
                                    id="file"
                                    helperText=""
                                    onChange={onFileChange}
                                />
                            </div>
                            <div className="grid md:grid-cols-2  my-4">
                                <div className="w-full sm:mb-3 xs:mb-3">
                                    <TextInput
                                        id="first_name"
                                        type="text"
                                        placeholder="First Name"
                                        required={true}
                                        value={first_name}
                                        className="max-w-[200px]"
                                        onChange={(e)=>setFirstName(e.target.value)}
                                    />   
                                </div>
                                <div className="w-full">
                                <TextInput
                                        id="Last_name"
                                        type="text"
                                        placeholder="Last Name"
                                        required={true}
                                        value={last_name}
                                        className="max-w-[200px]"
                                        onChange={(e)=>setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-4">
                                    <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 xs:col-span-12">
                                        <TextInput
                                            id="city"
                                            type="text"
                                            placeholder="City"
                                            value={city}
                                            required={true}
                                            onChange={(e)=>setCity(e.target.value)}
                                        />
                                    </div>
                                    <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 xs:col-span-12">
                                    <TextInput
                                            id="state"
                                            type="text"
                                            placeholder="State/Province"
                                            value={stateProvince}
                                            required={true}
                                            onChange={(e)=>setStateProvince(e.target.value)}
                                        />
                                    </div>
                                    <div className="lg:col-span-3 md:col-span-6 sm:col-span-12 xs:col-span-12">
                                        <TextInput
                                            id="country"
                                            type="text"
                                            placeholder="Country"
                                            value={country}
                                            required={true}onChange={(e)=>setCountry(e.target.value)}
                                        />
                                    </div>
                                    
                            </div>
                           {isAccountInit&&
                            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-3">
                                <div >
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
                                            disabled
                                            value={isAccountInit?email:""}
                                        />
                                    </div>
                                    <div>
                                    {/* <div className="mb-2 block">
                                        <Label
                                        htmlFor="password1"
                                        value="New password"
                                        />
                                    </div>
                                    <TextInput
                                        id="password1"
                                        type="password"
                                        required={true}
                                    /> */}
                                    </div>
                                </div>}
                        {/* <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">
                                    Remember me
                                </Label>
                            </div>
                            <a href="#" className="text-blue-400 lg:margin-right:50%  lg:margin-left:auto" onClick={()=>setRouter(3)}>sign up</a>
                        </div> */}
                        <Button type="submit">
                             Save
                        </Button>
                            <Button color={"failure"} onClick={()=>(isAccountInit?handleBack():localStorage.removeItem("jwt"), window.location.reload())}>
                                Back
                            </Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}
export default Profile;