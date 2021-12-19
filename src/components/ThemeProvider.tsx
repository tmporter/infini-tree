import { ReactNode } from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";

type Props = {
  children: ReactNode;
};

const theme = {
  colors: {
    red: "#F36363",
    blue: "#51A3A3",
    purple: "#75485E",
    yellow: "#DFCC74",
    green: "#C3E991",
    black: "#000501",
    white: "#FDFFFC",
  },
};

const ThemeProvider = ({ children }: Props) => {
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
};

export default ThemeProvider;
