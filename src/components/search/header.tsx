import { useRef } from 'react';
import { useRouterContext } from "../../provider/router_context"
import {  HiSearch } from 'react-icons/hi';
import {AiOutlineClose} from "react-icons/ai"
export default function Header() {
    const {search,setSearch,setSearchType} = useRouterContext();
    const searchInputRef = useRef<any>(null);
    function doSearch(e:any) {
        e.preventDefault();
        const newTerm = searchInputRef.current.value;
        setSearch(newTerm);
        setSearchType("all");
    }
    return(
        <header className="sticky top-0 bg-white w-full">
        <div className="flex w-full p-4 items-center justify-center" >
            
            <form className="flex flex-grow px-6 py-3 ml-10 mr-5 items-center border border-gray-200 rounded-full shadow-lg max-w-3xl" onSubmit={doSearch}>
                <input type="text" ref={searchInputRef} id="home_input" className="flex-grow w-full outline-0 focus:outline-0 border-0 focus:border-0" value={search} onChange={(e:any) => setSearch(e.value)} />
                <AiOutlineClose className="h-7 sm:mr-3 text-gray-500 cursor-pointer transition duration-100 transform hover:scale-125"
                onClick={() => (searchInputRef.current.value = '')} />
                <HiSearch className="h-6 text-blue-500  border-l-2 pl-1 w-[40px] h-[26px] border-gray-300" onClick={doSearch} />
                <button hidden type="submit"  onClick={doSearch}>Search</button>
            </form>
        </div>
    </header>
    )
}