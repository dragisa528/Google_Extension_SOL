import { Avatar, Badge, Button, Card, Progress } from 'flowbite-react';
import { useRouterContext } from '../provider/router_context';
import { IProjectForAny } from './project';
import { Api } from '../backend/utils/index';
import {useState} from 'react';
import Videoplayer from '../components/video';
const ProjectDetail = ()=>{
    const {curProject,setRouter} = useRouterContext();
    const [isShowen,setIsShowen]= useState<boolean>(false);
    const [isPaly,setIsPaly] = useState<boolean>(false);
    const {title,progress,goal,budget,activist,image,supportCount,allocate_budget,project_id,description,user_img,total_power,city,country,state,publish_at,isSupport,link} = curProject;
    
    return(
        <div className='container mx-auto flex justify-center min-h-screen py-5'>
            <Card className='h-fit my-auto'>
                <div className='grid lg:grid-cols-2  xs:grid-cols-1 gap-4 p-3'>
                    <div className='relative min-w-[300px] min-h-[300px]'   onMouseEnter={() => setIsShowen(true)} onMouseLeave={() => setIsShowen(false)}>
                        <Videoplayer url={link} height={300} width={400} image={image} />
                    </div>
                    <div>
                        <div className='flex gap-4 items-center my-1'>
                            <h1>Title:</h1>
                            <h1>{title}</h1>
                        </div>
                        <div className='flex items-center justify-between w-full items-center my-2'>
                            <div>
                                <h2>Total Budget</h2>
                                <p className='text-center'>{goal}$</p>
                            </div>
                            <div>
                                <h2>Allocate Budget</h2>
                                <p className='text-center'>{allocate_budget}$</p>
                            </div>
                            <div className='text-center'>
                                <h2>Total Power</h2>
                                <p>{total_power}kWh</p>
                            </div>
                        </div>
                        <div className='w-full my-2'>
                            <p className='my-2'>Progress: {progress}%</p>
                            <Progress className='my-2' progress={progress} />
                        </div>
                        <div className='flex gap-4 my-2 items-center'>
                            {
                                budget<=allocate_budget&&
                                <Badge color="success">
                                    Reached Goal
                                </Badge>
                            }
                            {
                                publish_at&&
                                <Badge color="indigo">
                                    {publish_at}
                                </Badge>
                            }
                        </div>
                        
                            <p>Supporters: {supportCount?supportCount:0}</p>
                        
                        <div className='flex gap-4 items-center my-2'>
                            {
                                user_img&&
                                <Avatar
                                    img={Api.host_url+"/api/auth/profileImg?img="+user_img}
                                    rounded={true}
                                />
                            }
                            <p>{activist}</p>
                        </div>
                        <div className='my-2'>
                            <h3>Description</h3>
                            <p className='p-2 w-full'>
                                {description}
                            </p>
                        </div>
                        <div>
                        <Button className='w-full' onClick={()=>setRouter(2)}>
                          Back
                        </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
export default ProjectDetail;