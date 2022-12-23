import { useEffect } from "react";
const useOutsideAlerter = (ref:any,isShow:boolean=false)=>{
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event:any) {
          if (ref.current && !ref.current.contains(event.target) ) {
                
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
}
export default useOutsideAlerter;