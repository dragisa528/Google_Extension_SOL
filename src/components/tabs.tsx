import {Tabs} from "flowbite-react";
const TabsComp = ()=>{
    return(

        <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
            >
            <Tabs.Item title="Network" >
               <div className="bg-black">
               Profile content
               </div>
            </Tabs.Item>
            <Tabs.Item
                active={true}
                title="Projects"
            >
                Dashboard content
            </Tabs.Item>
            
        </Tabs.Group>
    )
}
export default TabsComp;