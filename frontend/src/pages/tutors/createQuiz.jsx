import React, { useState, useCallback } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, Typography, Button, Paper, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import QuizPopup from '../../components/QuizPopup';

const PageWrapper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
}));

const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
}));

const CreateNewButton = styled(Button)(({ theme }) => ({
    fontWeight: 'bold',
}));

const NavContainer = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(3),
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    padding: theme.spacing(1, 2),
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    display: 'inline-block',
    transition: 'color 0.3s, border-bottom-color 0.3s', 
    borderBottom: '3px solid transparent',
    
    '&.active': {
        color: theme.palette.primary.main,
        borderBottomColor: theme.palette.primary.main,
    },
    '&:hover': {
        color: theme.palette.primary.light,
    }
}));

const STRINGS = {
    title: 'Được tạo bởi tôi',
    createButton: '+ Tạo mới',
    newTab: 'Tạo',
    createdTab: 'Đã tạo',
};

export default function CreateQuiz() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const handleOpenPopup = useCallback(() => setPopupOpen(true), []);
  const handleClosePopup = useCallback(() => setPopupOpen(false), []);

  return (
    <PageWrapper elevation={1}>
      <Header>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {STRINGS.title}
        </Typography>
        <CreateNewButton 
          variant="contained" 
          color="primary" 
          onClick={handleOpenPopup}
        >
          {STRINGS.createButton}
        </CreateNewButton>
      </Header>
      
      <NavContainer>
        <StyledNavLink to="/create-quiz/new">
            {STRINGS.newTab}
        </StyledNavLink>
        <StyledNavLink to="/create-quiz/created">
            {STRINGS.createdTab}
        </StyledNavLink>
      </NavContainer>

      <main>
        <Outlet context={{ handleOpenPopup }} /> 
      </main>

      <QuizPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </PageWrapper>
  );
}