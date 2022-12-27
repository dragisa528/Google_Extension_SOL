import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCardListApi, getProfile } from "../backend/utils/api";
import CardItem, { ICard } from "../components/CardItem";
import DropDownComp, { ItemType } from "../components/dropdown";
import InputComp from "../components/input";
import { useRouterContext } from "../provider/router_context";
import SearchEngine from "./search_engine";
import SearchEngineIframe from "./search_engin_iframe";

export enum SEARCH_TYPE{
    GOOGLE=0,
    BING=1,
    YAHOO=2

}
const Home =()=>{
    const [cardList,setCardList] = useState<any>([]);
    const {setSearch,setRouter} = useRouterContext();
    const handleGoogleSearch =(query:string)=>{
        setSearch(query);
        setRouter(7)
        // if(curItem.value===0)
        // window.open("https://solguerrilla.com/search?term="+search);
        // else if(curItem.value ===1)
        // window.open("https://www.bing.com/search?q="+search);
        // else if (curItem.value===2)
        // window.open("https://search.yahoo.com?q="+search);
    }
    const getCardList = ()=>{
        getCardListApi((error)=>{
            toast.error(error);
            return;
        }).then(res=>{
            if(!res)return;
            if(res.data.status){
                console.log(res.data.list);
                const data = res.data.list.slice(0,6)
                setCardList(res.data.list);
            }else{
                toast.error(res.data.message);   
            }
        })
    }
    useEffect(()=>{
        getCardList();
    },[])
    return(
        <div className="w-full h-full  mx-auto flex justify-center items-center grow">
            <div className=" sm:w-full sm:px-4  h-fit flex flex-col justify-center w-full   ">
                <div className="flex justify-center grow max-w-[500px] mx-auto w-full">
                <InputComp onhandle={handleGoogleSearch} />
                </div>
                {/* <div className="w-full justify-end flex items-center">
                    <p>Powered by</p>
                    <DropDownComp ItemList={ItemList} label={""} setCurItem={setCurItem}  />
                    <p>{curItem.label}</p>
                </div> */}
                
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1  mt-3 mx-auto">1
                    {
                        cardList.map((item:any)=>{
                           return <CardItem title={item.title} img={item.img_url} link={item.link} source={item.source} summary={item.summary}/>
                        })
                    }
                </div>
            </div>
        
        </div>
    )
}
export default Home;