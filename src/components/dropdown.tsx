import React from "react";
import {Dropdown} from "flowbite-react";
import styled from 'styled-components';
import {FaChevronCircleDown} from "react-icons/fa";
export type ItemType ={
    label:string;
    value:number;
}
export type IDropDown ={
    ItemList:Array<ItemType> ;
    label:string;
    setCurItem:(value:ItemType)=>void;
}
const Dropdown1 = styled(Dropdown)`
    border-radius:100%;
    background:"#000",
    color:white;
`
const DropDownComp:React.FC<IDropDown> = ({label,ItemList,setCurItem})=>{
    return(
        <Dropdown
        label={<FaChevronCircleDown/>}
        inline={true}
        arrowIcon={false}
      >

        {
            ItemList?.map((item:ItemType,index:number)=>{
                return (
                    <Dropdown.Item key={index} onClick={()=>{setCurItem(item)}}>
                        {item.label}
                    </Dropdown.Item>
                )
            })
        }
      </Dropdown>  

    )
}
export default DropDownComp;