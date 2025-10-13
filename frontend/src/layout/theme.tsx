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
            secondary: '#9ACBD0'
        },
        primary: {
            main: '#9ACBD0'
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
