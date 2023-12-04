import {extendTheme, ThemeConfig} from "@chakra-ui/react"

const config: ThemeConfig = {
    initialColorMode: "light"
}

const theme = extendTheme({extendTheme});

export default theme;