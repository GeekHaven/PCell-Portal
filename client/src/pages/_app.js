import "@/styles/globals.css";
import "@fontsource/ibm-plex-sans";

import { useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import ThemeContext from "@/contexts/theme.context";
import { getTheme } from "@/utils/theme";

export default function App({ Component, pageProps }) {
  let [mode, setMode] = useState("dark");
  let theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
