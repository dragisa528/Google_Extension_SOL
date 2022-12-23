import { IColorType } from "./colors";
import { IFontType } from "./font";

export interface ITheme {
    [key: string]: string;
}
export interface IThemes {
    [key: string]: ITheme;
}

export interface IMappedTheme {
    [key: string]: string | null ;
}

export const mapTheme = (colors: IColorType,fonts:IFontType): IMappedTheme => {
    return {
        ...colorMapTheme(colors),
        ...fontMapTheme(fonts)
    };
  };
export const colorMapTheme = (variables: IColorType) : IMappedTheme =>{
    return {
        '--color-blue': variables?.blue || '',
        '--color-yellow': variables?.yellow || '',
        '--color-gray-100': variables?.gray['100'] || '',
        '--color-gray-200':variables?.gray['200'] || '',
        '--color-gray-300':variables?.gray['300'] || ''
    }
}

export const fontMapTheme = (variables: IFontType) : IMappedTheme =>{
    return {
        '--font-forma':variables?.forma || '',
        '--font-helvetica':variables?.helvetica || '',
        '--font-freightsans':variables?.freightsans || '',
        '--font-proxima':variables?.proxima || '',
        '--font-noto':variables?.noto || '',
        '--font-mont':variables?.mont || '',
    }
}
