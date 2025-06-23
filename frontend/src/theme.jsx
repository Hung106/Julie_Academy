import { createTheme } from '@mui/material/styles';

const getTheme = (mode = 'light') =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#3282B8',
                contrastText: '#fff',
            },
            secondary: {
                main: '#BBE1FA',
                contrastText: '#0F4C75',
            },
            background: {
                default: mode === 'dark' ? '#1B264F' : '#F5F3F5',
                paper: mode === 'dark' ? '#222B45' : '#fff',
            },
            text: {
                primary: mode === 'dark' ? '#F5F3F5' : '#1B264F',
                secondary: mode === 'dark' ? '#BBE1FA' : '#576CA8',
            },
            divider: mode === 'dark' ? '#576CA8' : '#BBE1FA',
            error: {
                main: '#e53935',
            },
            warning: {
                main: '#ffb300',
            },
            info: {
                main: '#1976d2',
            },
            success: {
                main: '#43a047',
            },
        },
        typography: {
            fontFamily: 'Montserrat, Open Sans, Arial, sans-serif',
            h1: { fontWeight: 900 },
            h2: { fontWeight: 800 },
            h3: { fontWeight: 700 },
            h4: { fontWeight: 700 },
            h5: { fontWeight: 700 },
            h6: { fontWeight: 700 },
            button: { textTransform: 'none', fontWeight: 700 },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        fontWeight: 700,
                        fontFamily: 'Montserrat, Open Sans, Arial, sans-serif',
                        boxShadow: '0 2px 12px rgba(87,108,168,0.10)',
                        transition: 'all 0.2s',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 20,
                    },
                },
            },
            MuiContainer: {
                styleOverrides: {
                    root: {
                        paddingLeft: 16,
                        paddingRight: 16,
                    },
                },
            },
        },
    });

export default getTheme;
