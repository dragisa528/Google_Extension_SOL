import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/search/header";
import SearchResult from '../components/search/searchResult';
import { GOOGLE_SEARCH_API_KEY, GOOGLE_SEARCH_ENGINE_ID } from "../constant/api";
import { useRouterContext } from "../provider/router_context";

const SearchEngineIframe = ()=>{
    const {search,searchType,start} = useRouterContext();
    const [results,setResults] = useState<{data:any,isImageSearch:boolean}>({data:null,isImageSearch:false});
    useEffect(()=>{
        
        const useDummyData = false;
        const startIndex = start || "0";
        const imageSearch = searchType === "image";
        const searchTypeQuery = imageSearch ? '&searchType=image' : '';
        console.log("searchTypeQuery",imageSearch)
       
        if(search == undefined || search.trim() == ""){
            return;
        }
        let location = `https://www.googleapis.com/customsearch/v1/?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${search}&start=${startIndex}${searchTypeQuery}`;
        console.log("location",location)
        const data =
        useDummyData
            ? Response
            : fetch( 
                location
            ).then(async (response) =>{
                
                setResults({data:await response.json(),isImageSearch:imageSearch})
                return;
            });
        
    },[search,searchType,start])

    return (    
        <>
        <Header />
        <div className="bg-white  overflow-y-auto grow ">
            <SearchResult results={results.data} searchType={results.isImageSearch?"image":"all"} />
            {/* <aside className="mt-10">
                <ins className='adsbygoogle'
                    data-ad-client= 'ca-pub-5090203590318254'
                    data-ad-slot='4652126453'
                    data-ad-format= 'auto'
                    data-adtest="on"
                    data-full-width-responsive="true"
                >
                </ins>
            </aside> */}
        </div>
        </>
    )
}
export default SearchEngineIframe;