import { Modal,Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export type IBasicModal = {
    onClose:()=>void,
    isShow:boolean,
    children:any
}
const BasciModal:React.FC<IBasicModal> = ({isShow,onClose,children = null as any})=>{
    return(
        <Modal
        show={isShow}
        size="md"
        popup={true}
        onClose={onClose}
      >
        <Modal.Header />
        <Modal.Body>
            {children}
        </Modal.Body>
      </Modal>
    )
}

export default BasciModal;