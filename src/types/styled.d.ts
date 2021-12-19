import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      red: string;
      blue: string;
      purple: string;
      yellow: string;
      green: string;
      black: string;
      white: string;
    };
  }

  export type ThemeColor = DefaultTheme["colors"];
}
