import Cookies from 'universal-cookie';
export const setCookie = (key:string,value:string)=>{
    const cookies = new Cookies();
    cookies.set(key, value, { path: '/' });
}

export const getCookie = (key:string):string=>{
    const cookies = new Cookies();
    return cookies.get(key);
}
export const removeCookie = (key:string)=>{
    const cookies = new Cookies();
    cookies.remove('jwt');
}