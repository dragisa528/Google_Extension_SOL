import { Modal,Button,TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import BasciModal from "./basicModal";
import {useState} from 'react';
export type IInviteModal = {
    onClose:()=>void,
    onClick:(email:string)=>void,
    isShow:boolean,
}
const InviteModal:React.FC<IInviteModal> = ({isShow,onClose,onClick})=>{
    const [email,setEmail] = useState<string>("");
    return(
        <BasciModal
        isShow={isShow}
        onClose={onClose}
      >
          <div className="text-center">
          
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Please input invite mail
            </h3>
            <form >
            <TextInput
              id="email1"
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="email@yourdomain"
              required={true}
              className="mb-4"
            />
            
            <div className="flex justify-center gap-4">
              <Button
                type="submit"
                color="failure"
                onClick={(e)=>{ onClick(email); e.preventDefault(); }}
              >
                Invite
              </Button>
              <Button
                color="gray"
                onClick={onClose}
              >
                No, cancel
              </Button>
           
            </div>
            </form>
          </div>
      </BasciModal>
    )
}

export default InviteModal;