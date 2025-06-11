import React from "react";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import '../assets/fonts.css'
import { ThemeProvider } from '@mui/material/styles';
import backgroundImage from '../assets/home_background.jpg';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4e54c8',
        },
        secondary: {
            main: '#f1f1f1',
        },
    }
})

const HomePage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    background: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    color: "white",
                }}
            >
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>
                    <Typography variant="h1" sx={{fontFamily: "HomeFont" ,fontWeight: "bold", mb: 8}}>
                        DjGrego
                    </Typography>
                    {/*<Typography variant="h5" sx={{mb: 4}}>
                        Simple. Elegant. Powerful.
                    </Typography>*/}
                </motion.div>
            </Box>
        </ThemeProvider>
    );
}

export default HomePage;