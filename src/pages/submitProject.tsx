import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Label,TextInput,Checkbox,Button, Card,Avatar,FileInput, Alert} from "flowbite-react";
import { submitProject } from "../backend/utils/api";
import { useAuthContext } from '../provider/auth_provider';
import { useNavigate, useNavigation, useParams } from "react-router-dom";

const SubmitProject =()=>{
  const navigate = useNavigate();
  const [isAvatarValid,setIsAvatarValid] = useState<boolean>(false)
  const [title,setTitle]                 = useState<string>("");
  const [curFile,setCurFile]             = useState<File|null>(null);
  const [description,setDescription]     = useState<string>("");
  const [budget,setBudget]               = useState<number>(0);
  const [power,setPower]                 = useState<number>(0);
  const [isAgree,setIsAgree]           = useState<boolean>(false);
  const [city,setCity]                   = useState<string>("");
  const [state,setState]                 = useState<string>("");
  const [country,setCountry]             = useState<string>("");
  const [link,setLink]                   = useState<string>(" http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4");
  const {isAnymouse}                     = useAuthContext();
  
  const onFileChange = (event:any)=>{
    if(!event || !event.currentTarget || !event.currentTarget.files)return;
      const _curFile = event.currentTarget.files[0];
      const fileType = _curFile.type;
      const size    = _curFile.size;
      console.log(_curFile, "height");

    if(size > 2097152){
      toast.warning("Image Size is over 1MB!");
      setIsAvatarValid(false)
      return;
    }

    if(fileType=="image/jpeg" || fileType =="image/png" || fileType=="image/jpg"){
       setCurFile(_curFile)
       setIsAvatarValid(true);
    }else{
        toast.warning("Image is supported only jpg and png!");
        setIsAvatarValid(false)
        return;
    }
  }

  const handleSubmit = ()=>{
    if(isAnymouse) {
      toast.warn("Please Sign in!");
      return;
    }
    if(title === "" || description === "" || budget === 0 || power === 0 || city ==="" || country ==="" || state===""){
      toast.warn("Please input correctly");
      return;
    }
    if(!isAgree) {
      toast.warn("You don't agree with this Terms and Conditions and Privacy Policy");
      return;
    }
    if(!curFile) toast.warn("Please Select project photo");
    const data = {
      title:title,
      description:description,
      budget:budget,
      total_power:power,
      img_file:curFile,
      city:city,
      state:state,
      country:country,
      link:link
    }
    submitProject(data,(error:string)=>{
      toast.error(error);
      return;
    }).then(res=>{
      if(!res) return;
      if(res.data.status){
        toast.success(res.data.message);
        setTitle("");
        setCurFile(null);
        setIsAvatarValid(false);
        setDescription("");
        setBudget(0);
        setPower(0);
        // setIsAgree(false);
        setCity("");
        setState("");
        setCountry("");
        setLink("");
        return;
      }
    })
  }

  useEffect(()=>{
      document.getElementById("Footer")!.style!.position='relative';
  },[])

  return(
       <div className="bg-white">
          <Card className="lg:container mx-auto mt-10">
            <h5 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                  Submit a Project
                  </h5>
            <div className="flex justify-center w-full">
              {
                  isAvatarValid?
                  <Avatar
                      img={curFile?URL.createObjectURL(curFile):""}
                      rounded={false}
                      bordered={true}
                      size="xl"
                      style={{cursor:"pointer"}}
                        
                  />:
                  <Avatar rounded={false}  bordered={true}
                  size="xl"
                  style={{cursor:"pointer"}} />
              }                  
            </div>
            
            <div className="mx-auto max-w-[300px] flex justify-center">
              <FileInput id="file" helperText="" onChange={onFileChange}/>
            </div>
            <Alert color="info">
              <span>
                <span className="font-medium">
                  Info alert!
                </span>
                {' '}Available project Image-size limit is 2MB
              </span>
            </Alert>      
              
          {/* <div className="flex justify-between md:w-1/2 sm:w-[100%]">
              <p>Already an user?</p>
              <a href="#" className="text-blue-500">Sign In</a>
          </div>

          <div className="flex justify-between  md:w-1/2 sm:w-[100%]">
              <input type="text" className="bg-[#f2f4f8] rounded-md p-2 border-0" placeholder="First Name" />
              <input type="text" className="bg-[#f2f4f8] rounded-md p-2 border-0" placeholder="Last Name" />
          </div>
          <input type="text" className="bg-[#f2f4f8] rounded-md p-2 border-0 lg:w-1/4  md:w-1/3 sm:w-[100%]" placeholder="Email Address" />
          <input type="text" className="bg-[#f2f4f8] rounded-md p-2 border-0 lg:w-1/4  md:w-1/3 sm:w-[100%]" placeholder="Password" /> */}
          <div className="grid lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-1 gap-2">
              <input value={title} type="text"  onChange={(e:any)=>setTitle(e.target.value)} className="bg-[#f2f4f8] rounded-md p-2 border-0 lg:col-span-6 md:col-span-6" placeholder="Enter Project title " />
              <input value={link} type="text" onChange={(e:any)=>setLink(e.target.value)} className="bg-[#f2f4f8] rounded-md p-2 border-0 lg:col-span-6 md:col-span-6" placeholder="Enter video link" />
              <input value={city} type="text" className="bg-[#f2f4f8] rounded-md p-2 border-0 lg:col-span-2 md:col-span-2" onChange={(e:any)=>setCity(e.target.value)} placeholder="City" />
              <input value={state} type="text" className="bg-[#f2f4f8] rounded-md p-2 border-0 lg:col-span-4 md:col-span-5" onChange={(e:any)=>setState(e.target.value)} placeholder="State/Province" />
              <input value={country} type="text" className="bg-[#f2f4f8] rounded-md p-2 border-0 lg:col-span-2 md:col-span-3" onChange={(e:any)=>setCountry(e.target.value)} placeholder="Country" />
          </div>
          <textarea value={description} name="detail" id="project_detail" onChange={(e:any)=>setDescription(e.target.value)}  cols={30} rows={10} placeholder="Tell us more about your project:"></textarea>
          <div className="flex gap-2 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              <div style={{alignSelf: 'center',justifySelf:'center'}}><input value={budget} type="number" className="bg-[#f2f4f8] rounded-md p-2 border-0 flex-3" onChange={(e:any)=>setBudget(parseInt(e.target.value))} placeholder="Budget in USD" /> USD</div>
              <div style={{alignSelf: 'center',justifySelf:'center'}}><input value={power} type="number" className="bg-[#f2f4f8] rounded-md p-2 border-0 flex-3" onChange={(e:any)=>setPower(parseInt(e.target.value))} placeholder="Power: kWh" /> kWh</div>
              <div className="flex items-center ml-5 gap-2">
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

          </div>        
          <Button onClick={handleSubmit}>
            Submit Project
            <svg
              className="ml-2 -mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
       </div>
      )
}
export default SubmitProject;