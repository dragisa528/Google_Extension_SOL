import { useRouterContext } from "../provider/router_context";
import { Button} from "flowbite-react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

const ContactUs = ()=>{
    const {setRouter} = useRouterContext();
    const navigate = useNavigate();
    const container = {
        width: 800,
        margin: '50px auto'
      }
      
    return (
        <div className="w-full h-full  mx-auto flex justify-center items-center grow" style={container}>
            <Button style={{position:'absolute', cursor:'pointer', top:'10px', right:'10px'}} onClick={()=>{navigate("/"); setRouter(5);}}>
                Back Home
            </Button>
            <div>
              <p style = {{fontSize:'20px', fontWeight: 'bold', textAlign:'center'}}>About Us</p>
              <p>Welcome to Sol Guerrilla LLC.</p>
              <p>Help transition the world to a greener cleaner future with your internet search.</p>
              <p>Create an account to support solar power projects, get updates on the most recent environmental trends and submit solar power projects for funding.</p>
              <p>Multiply the impact of your internet searches by inviting your friends to join your network.</p>
            </div>
        </div>
    )
}

export default ContactUs;