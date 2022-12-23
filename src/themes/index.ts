import {basicThemeComponent as base, darkThemeComponent as dark,IThemeComponents} from './base';
import { IThemes,IMappedTheme,mapTheme,ITheme } from './utils';

export const DEFAULT_THEME: string = 'base';

export const themes: IThemeComponents = {
    base,
    dark
};

// export const extend = (
//     extending: ITheme,
//     newTheme: ITheme
//   ): ITheme => {
//     return { ...extending, ...newTheme };
//   };

export const applyTheme = (theme: string): void => {
    const themeObject: IMappedTheme = mapTheme(themes[theme]?.colors,themes[theme]?.fonts);
    if (!themeObject) return;

    const root = document.documentElement;

    Object.keys(themeObject).forEach((property) => {
        if (property === 'name') {
        return;
        }
        root.style.setProperty(property, themeObject[property]);
    });
};

export default base