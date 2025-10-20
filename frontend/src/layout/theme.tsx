import { createTheme } from "@mui/material/styles"

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: '#F2EFE7',
            paper: '#F2EFE7'
        },
        text: {
            primary: '#2973B2',
            secondary: '#2973B2'
        },
        primary: {
            main: '#2973B2'
        }
    },
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#211832',
            paper: '#211832'
        },
        text: {
            primary: '#F25912',
            secondary: '#F25912',
        },
    }

})
