import { createTheme } from "@mui/material/styles"

export const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1e1e1e'
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
    }

})
