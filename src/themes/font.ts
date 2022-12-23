import { ITheme } from "./utils";

export type IFontType   ={
    forma:string;
    helvetica:string;
    freightsans:string;
    proxima:string;
    noto:string;
    mont:string;  
}

export const DefaultFonts :IFontType={
    forma:"forma djr text",
    helvetica:"helvetica neue",
    freightsans:"freightsans pro",
    proxima:"proxima nova",
    noto:"noto sans",
    mont:"montserrat",
}