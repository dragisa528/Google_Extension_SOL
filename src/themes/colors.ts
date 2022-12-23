import { ITheme } from "./utils";

export type IColorType ={
    blue:string;
    gray:ITheme;
    yellow:string
}

export const DefaultColors :IColorType={
    blue:"#4364f7",
    gray:{
        100:"#141515",
        200:"#231f20",
        300:"#707070"
      },
      yellow:"#f6a934"
}

export const DarkColors :IColorType={
    blue:"#000",
    gray:{
        100:"#141515",
        200:"#231f20",
        300:"#707070"
      },
    yellow:"#f6a934"
}