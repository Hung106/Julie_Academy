import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import {
    AppBar, Toolbar, IconButton, Typography, Button as MuiButton,
    Avatar, Drawer, List, ListItem, ListItemText, Box, InputBase,
    Menu, MenuItem, Divider, ListItemIcon, Tooltip, useTheme, Container
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.2),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '25ch',
        },
    },
}));

const Brand = React.memo(() => {
    const theme = useTheme();
    return (
        <Box
            component={Link}
            to="/"
            sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover .logo-image': {
                    transform: 'scale(1.1)',
                    filter: `drop-shadow(0 0 7px ${alpha(theme.palette.primary.light, 0.6)})`,
                },
                '&:hover .brand-text': {
                    textShadow: `0 0 16px ${alpha(theme.palette.primary.main, 0.8)}`,
                },
            }}
        >
            <Box
                className="logo-image"
                component="img"
                src="/logo.png"
                alt="Julie Academy Logo"
                sx={{
                    height: 40,
                    width: 40,
                    mr: 1.5,
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease-in-out, filter 0.3s ease-in-out',
                }}
            />
            <Typography
                className="brand-text"
                variant="h5"
                noWrap
                component="div"
                sx={{
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    background: `linear-gradient(45deg, ${theme.palette.info.light} 20%, ${theme.palette.primary.main} 85%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    transition: 'text-shadow 0.3s ease-in-out',
                }}
            >
                Julie Academy
            </Typography>
        </Box>
    );
});

const DesktopNavLinks = React.memo(({ items, onNavigate }) => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
        {items.map(item => (
            <MuiButton
                key={item.text}
                onClick={() => onNavigate(item.path)}
                startIcon={item.icon}
                sx={{ color: 'inherit', fontWeight: 500, opacity: 0.85, '&:hover': { opacity: 1, bgcolor: 'action.hover' } }}
            >
                {item.text}
            </MuiButton>
        ))}
    </Box>
));

const UserMenu = React.memo(({ anchorEl, onClose, onLogout, userName, menuItems, onNavigate }) => (
    <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        PaperProps={{
            elevation: 3,
            sx: {
                overflow: 'visible', mt: 1.5, minWidth: 240,
                '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0 },
            },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
        <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>{userName}</Typography>
        </Box>
        <Divider />
        {menuItems.map((item) => (
            <MenuItem key={item.text} onClick={() => onNavigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.text}
            </MenuItem>
        ))}
        {menuItems.length > 0 && <Divider />}
        <MenuItem onClick={onLogout}>
            <ListItemIcon><ExitToAppIcon color="error" /></ListItemIcon>
            <Typography color="error">Đăng xuất</Typography>
        </MenuItem>
    </Menu>
));

const MobileDrawer = React.memo(({ open, onClose, isAuthenticated, onLogout, menuItems, onNavigate }) => (
     <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 260 }} role="presentation">
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">Julie Academy</Typography>
            </Toolbar>
            <Divider />
            <List>
                {!isAuthenticated ? (
                    <ListItem button onClick={() => onNavigate('/login')}>
                        <ListItemText primary="Đăng nhập" />
                    </ListItem>
                ) : (
                    <>
                        {menuItems.map((item) => (
                            <ListItem button key={item.text} onClick={() => onNavigate(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                        <Divider sx={{ my: 1 }} />
                        <ListItem button onClick={onLogout}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Đăng xuất" />
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    </Drawer>
));

const ProfessionalNavbar = ({ mode, toggleMode }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();

    const isAuthenticated = keycloak.authenticated;
    const userName = useMemo(() => isAuthenticated ? keycloak.tokenParsed?.name || "Tài khoản" : "", [isAuthenticated, keycloak.tokenParsed]);
    const roles = useMemo(() => isAuthenticated ? keycloak.tokenParsed?.realm_access?.roles || [] : [], [isAuthenticated, keycloak.tokenParsed]);

    const handleDrawerToggle = useCallback(() => setMobileOpen(prev => !prev), []);
    const handleMenuOpen = useCallback((event) => setAnchorEl(event.currentTarget), []);
    const handleMenuClose = useCallback(() => setAnchorEl(null), []);

    const handleNavigate = useCallback((path) => {
        if (path) navigate(path);
        handleMenuClose();
        if (mobileOpen) handleDrawerToggle();
    }, [navigate, mobileOpen, handleDrawerToggle]);

    const handleLogout = useCallback(() => {
        handleMenuClose();
        if (isAuthenticated) keycloak.logout({ redirectUri: window.location.origin });
    }, [keycloak, isAuthenticated, handleMenuClose]);

    const handleSearch = useCallback((searchTerm) => {
        const trimmed = searchTerm.trim();
        if (trimmed) navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }, [navigate]);

    const roleMenuItems = useMemo(() => {
        const items = [];
        if (roles.includes('tutor')) {
            items.push({ text: 'Dashboard Gia sư', path: '/dashboard/tutor', icon: <DashboardIcon fontSize="small" /> });
            items.push({ text: 'Tạo Quiz', path: '/createQuiz', icon: <QuizIcon fontSize="small" /> });
        }
        if (roles.includes('student')) {
            items.push({ text: 'Dashboard Học sinh', path: '/dashboard/student', icon: <DashboardIcon fontSize="small" /> });
        }
        return items;
    }, [roles]);

    const theme = useTheme();

    return (
        <>
            <AppBar
                position="sticky"
                elevation={2}
                sx={{
                    bgcolor: mode === 'light' ? '#101828' : theme.palette.background.paper,
                    color: mode === 'light' ? theme.palette.common.white : theme.palette.text.primary,
                    transition: theme.transitions.create(['background-color', 'color'], {
                        duration: theme.transitions.duration.short,
                    }),
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ minHeight: '68px !important' }}>
                        <Brand />
                        <Box sx={{ flexGrow: 1 }} />
                        <DesktopNavLinks items={roleMenuItems} onNavigate={handleNavigate} />
                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Tìm kiếm…"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
                                />
                            </Search>

                            <Tooltip title={mode === 'dark' ? "Chế độ sáng" : "Chế độ tối"}>
                                <IconButton onClick={toggleMode} color="inherit">
                                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </Tooltip>

                            {isAuthenticated ? (
                                <Tooltip title="Tài khoản">
                                    <IconButton onClick={handleMenuOpen} color="inherit">
                                        <Avatar sx={{ width: 38, height: 38, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                                          {userName.charAt(0).toUpperCase() || <AccountCircleIcon />}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <MuiButton
                                    variant="contained"
                                    onClick={() => handleNavigate('/login')}
                                    sx={{ display: { xs: 'none', md: 'flex' } }}
                                >
                                    Đăng nhập
                                </MuiButton>
                            )}
                        </Box>
                        
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{ ml: 1, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            <UserMenu
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                onLogout={handleLogout}
                userName={userName}
                menuItems={roleMenuItems}
                onNavigate={handleNavigate}
            />
            <MobileDrawer
                open={mobileOpen}
                onClose={handleDrawerToggle}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                menuItems={roleMenuItems}
                onNavigate={handleNavigate}
            />
        </>
    );
};

export default ProfessionalNavbar;