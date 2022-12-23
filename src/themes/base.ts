// export default {
//     primary: '#61DAFB',
//     secondary: '#254E70',
//     negative: '#e45b78',
//     positive: '#A3D9B1',
//     textPrimary: '#333',
//     backgroundPrimary: '#efefef',
//     backgroundSecondary: '#F6F9FC',

import { DarkColors, DefaultColors, IColorType } from "./colors";
import { DefaultFonts, IFontType } from "./font";

// };
export type IThemeComponent ={
    colors:IColorType,
    fonts:IFontType
}
export type IThemeComponents = {
    [key:string]:IThemeComponent
}
export const basicThemeComponent:IThemeComponent ={
    colors:DefaultColors,
    fonts:DefaultFonts
} 

export const darkThemeComponent:IThemeComponent ={
    colors:DarkColors,
    fonts:DefaultFonts
} 