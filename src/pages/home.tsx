import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCardListApi, getProfile } from "../backend/utils/api";
import CardItem, { ICard } from "../components/CardItem";
import DropDownComp, { ItemType } from "../components/dropdown";
import InputComp from "../components/input";
import { useRouterContext } from "../provider/router_context";
import SearchEngine from "./search_engine";
import SearchEngineIframe from "./search_engin_iframe";
import MyLeaderBoardAd from "../components/GoogleAd";
import { useAuthContext } from "../provider/auth_provider";
import { Api } from '../backend/utils/index';
import '../components/search/SearchBar.css'
import { FaAngleUp } from 'react-icons/fa';

export enum SEARCH_TYPE{
    GOOGLE=0,
    BING=1,
    YAHOO=2

}
const Home =()=>{
    const [cardList,setCardList] = useState<any>([]);
    const {setSearch, setRouter, titleName} = useRouterContext();
    const [showBottomBtn, setShowBottomBtn] = useState(true);
    
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
        document.getElementById("Footer")!.style!.position='absolute';
        document.getElementById("Footer")!.style!.bottom='0';
        document.getElementById("Footer")!.style!.width='100%';
    },[])

    ////////////////////// Scroll Bar Setting //////////////////////
    const {background} = useAuthContext();
    const [_back,setBack] = useState<string | null>();
    const[lastTop, setLastTop]=useState(0);
    const[originalStyle, setOriginalStyle] = useState(false);

    const handleScroll = () => {
        const el =document.getElementById("scroll_cont");
        const scrollPosition = el!.scrollTop; // => scroll position
        // console.log(scrollPosition, "scrollpos");
        const op= 1- el!.scrollTop / el!.clientHeight;
        setOriginalStyle(el!.scrollHeight-el!.scrollTop==el!.clientHeight)
        document.getElementById("img_cont")!.style!.opacity=op.toString();
        if(op<0.7){
            // var topdistance = document.getElementById("sb_form")!.offsetTop;
            // console.log(topdistance, "distance");
            document.getElementById("sb_form")!.style!.top='-65px';
            document.getElementById("sb_form")!.parentElement!.style!.width='98%';
            document.getElementById("sbox")!.classList!.add("fix");
            document.getElementById("header_BG")!.classList!.add("bg-white");
            
        }
        else{
            document.getElementById("sb_form")!.parentElement!.style!.width='86%';
            document.getElementById("sb_form")!.style!.top='120px';
            document.getElementById("sbox")!.classList!.remove("fix");
            document.getElementById("header_BG")!.classList!.remove("bg-white");
            
        }
        if(el!.scrollTop > 100){
            setShowBottomBtn(false);
        } 
        if(el!.scrollTop < 50) {
            setShowBottomBtn(true);
        }
        setLastTop(scrollPosition);
    };

    const goToBottom = () => {
        const el =document.getElementById("scroll_cont");
        // const op= 1- el!.scrollTop / el!.clientHeight;
        el!.scrollTop = el!.clientHeight;
        // window.scrollTo({
        //     top: 176,
        //     behavior: 'smooth',
        // });
    };

    useEffect(() => {
      handleScroll();
      document.getElementById("scroll_cont")!.addEventListener("scroll", handleScroll);
    //   return () => {
    //     // document.getElementById("scroll_cont")!.removeEventListener("scroll", handleScroll);
    //   };
        // window.addEventListener('scroll', () => {
        //     if (window.scrollY == 0) {
        //         setShowBottomBtn(true);
        //     } else {
        //         setShowBottomBtn(false);
        //     }
        // });
    }, []);
    return(
        <>
        {/* <MyLeaderBoardAd /> */}
        <div id="img_cont"
        style={{
            listStyle: "none",
            borderSpacing: "0px",
            border: "0px",
            textDecoration: "none",
            padding: "0px",
            margin: "0px",
            fontWeight: "inherit",
            fontSize: "inherit",
            borderCollapse: "collapse",
            backgroundPosition: "center",
            inset: "0px",
            backgroundSize: "cover",
            backgroundImage:`url(${Api.base_url+"/auth/back?img="+_back})`,
            backgroundRepeat: 'no-repeat',
            position: "fixed",
            opacity: 1,
            display: "block",
            zIndex:"-1"
          }}
        />

            <div style={{alignItems:'center'}}>
                <div
                className="dimmer"
                style={{
                    listStyle: "none",
                    borderSpacing: "0px",
                    border: "0px",
                    textDecoration: "none",
                    padding: "0px",
                    margin: "0px",
                    fontWeight: "inherit",
                    fontSize: "inherit",
                    borderCollapse: "collapse",
                    transition: "background-color 0.2s ease 0s",
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    left: "0px",
                    top: "0px",
                    pointerEvents: "none",
                }}>
                    <div style={{height:'68px', top:'0'}} id="header_BG"></div>
                </div>
                <main
                id="sbox"
                className="sbox">
                    <div className="flex grow lg:w-[500px] mx-auto w-full" id="sb_form">
                        <InputComp onhandle={handleGoogleSearch} titlename={titleName} />
                    </div>
                </main>
                
                <div
                className="bottom_row"
                style={{
                    listStyle: "none",
                    borderSpacing: "0px",
                    border: "0px",
                    textDecoration: "none",
                    padding: "0px",
                    margin: "0px",
                    fontWeight: "inherit",
                    fontSize: "inherit",
                    borderCollapse: "collapse",
                    overflow: "hidden",
                    left: "0px",
                    height: "calc(100% - 4.7rem - 35px)",
                    width: "calc(100% - 8px)",
                    bottom: "35px",
                    position: "absolute",
                }}
                >
                    <div id="scroll_cont">
                        <div id="vs_cont">
                            <div className="top-to-btm">
                                {" "}
                                {showBottomBtn && (
                                    <FaAngleUp
                                        className="icon-position icon-style"
                                        onClick={goToBottom}
                                    />
                                )}{" "}
                            </div>
                            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 mx-auto">
                                {
                                    cardList.map((item:any, index:number)=>{
                                    return <CardItem title={item.title} key={index} img={item.img_url} link={item.link} source={item.source} summary={item.summary}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}
export default Home;