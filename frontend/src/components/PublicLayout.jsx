import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer'; 
const PublicLayout = ({ mode, toggleMode }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header mode={mode} toggleMode={toggleMode} />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default PublicLayout;