import React, { useMemo } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import {
  Box, Tooltip, Drawer, List, ListItemButton, ListItemIcon,
  ListItemText, Toolbar, Typography, useTheme, styled, alpha, Divider,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import LibraryIcon from '@mui/icons-material/MenuBookOutlined';

// --- LAYOUT CONSTANTS ---
const FULL_WIDTH = 260;
const COLLAPSED_WIDTH = 80;

// --- CENTRALIZED NAVIGATION CONFIGURATION ---
const menuItemsConfig = [
  { label: 'Trang tổng quan', to: '/tutor-dashboard', Icon: DashboardIcon },
  { label: 'Thư viện đề thi', to: '/create-quiz', Icon: LibraryIcon },
];

// --- STYLED COMPONENTS ---

const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: open ? FULL_WIDTH : COLLAPSED_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: open ? FULL_WIDTH : COLLAPSED_WIDTH,
    overflowX: 'hidden',
    borderRight: `1px solid ${theme.palette.divider}`,
    background: theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${theme.palette.background.default} 25%)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const NavButton = styled(ListItemButton)(({ theme, active }) => ({
  margin: theme.spacing(0.75, 2),
  padding: theme.spacing(1.25, 2),
  borderRadius: theme.shape.borderRadius * 1.5,
  transition: 'background-color 0.2s, color 0.2s, box-shadow 0.2s',

  ...(active && {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  }),
  ...(!active && {
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
      boxShadow: `inset 0 0 0 1px ${theme.palette.divider}`, // Subtle border on hover
      '& .MuiListItemIcon-root': {
        color: theme.palette.text.primary,
      },
    },
  }),

  '& .MuiListItemIcon-root': {
    minWidth: 0,
    justifyContent: 'center',
    transition: 'color 0.2s',
  },
}));

const BrandTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));

// --- SIDEBAR COMPONENT ---

function Sidebar({ isDesktopOpen, isMobileOpen, onMobileClose, headerHeight }) {
  const theme = useTheme();
  const location = useLocation();
  const menuItems = useMemo(() => menuItemsConfig, []);

  const drawerContent = (
    <>
      <Toolbar sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
          px: 2.5, minHeight: `${headerHeight}px !important`,
      }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{ width: 36, height: 36, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))' }}
          />
          {isDesktopOpen && (
            <BrandTypography variant="h6" noWrap sx={{ ml: 1.5 }}>
              Julie Academy
            </BrandTypography>
          )}
        </Box>
      </Toolbar>

      <Divider sx={{ mx: 2 }} />

      <List sx={{ mt: 2 }} disablePadding>
        {menuItems.map(({ label, to, Icon }) => {
          const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <Tooltip title={isDesktopOpen ? '' : label} placement="right" key={to}>
              <NavButton component={RouterLink} to={to} active={active ? 1 : 0}>
                <ListItemIcon sx={{ mr: isDesktopOpen ? 2 : 'auto' }}>
                  <Icon />
                </ListItemIcon>
                {isDesktopOpen && <ListItemText primary={label} primaryTypographyProps={{ fontWeight: 500 }} />}
              </NavButton>
            </Tooltip>
          );
        })}
      </List>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { lg: isDesktopOpen ? FULL_WIDTH : COLLAPSED_WIDTH }, flexShrink: { lg: 0 } }}>
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: FULL_WIDTH,
            borderRight: 'none',
            background: theme.palette.background.default,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <StyledDrawer
        variant="permanent"
        open={isDesktopOpen}
        sx={{ display: { xs: 'none', lg: 'block' } }}
      >
        {drawerContent}
      </StyledDrawer>
    </Box>
  );
}

export default React.memo(Sidebar);