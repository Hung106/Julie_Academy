import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button as MuiButton,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    InputBase,
    Menu,
    MenuItem,
    Divider,
    Badge,
    ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { useKeycloak } from '@react-keycloak/web';

const COLORS = {
    darkestBlue: '#1B262C',
    darkBlue: '#0F4C75',
    mediumBlue: '#3282B8',
    lightBlue: '#BBE1FA',
    whiteText: '#FFFFFF',
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(COLORS.darkestBlue, 0.05),
    border: `1.5px solid ${COLORS.darkestBlue}`,
    '&:hover': {
        backgroundColor: alpha(COLORS.darkestBlue, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    flexGrow: 1,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.darkestBlue,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: COLORS.darkestBlue,
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    '& .MuiInputBase-input::placeholder': {
        color: alpha(COLORS.darkestBlue, 0.7),
        opacity: 1,
    },
}));


const Navbar = ({ mode, toggleMode }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [anchorElAccount, setAnchorElAccount] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [active, setActive] = useState('Khám phá');
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();

    const roles = keycloak?.authenticated ? (keycloak.tokenParsed?.realm_access?.roles || []) : [];

useEffect(() => {
    if (keycloak?.authenticated) {
        setUserName(
            keycloak.tokenParsed?.name ||
            keycloak.tokenParsed?.preferred_username ||
            "Tài khoản"
        );
        setUserAvatar(""); 
    } else {
        const mockUserData = localStorage.getItem('userData');
        try {
            if (mockUserData) {
                const parsedData = JSON.parse(mockUserData);
                setUserName(parsedData.name || parsedData.username || "Tài khoản");
                setUserAvatar(parsedData.avatar || "");
            } else {
                setUserName("Khách");
            }
        } catch (e) {
            setUserName("Khách");
            setUserAvatar("");
            localStorage.removeItem('userData');
        }
    }
    let storedCartItems = [];
    try {
        const cartRaw = localStorage.getItem('cart');
        storedCartItems = cartRaw ? JSON.parse(cartRaw) : [];
    } catch (e) {
        storedCartItems = [];
        localStorage.removeItem('cart');
    }
    setCartItemCount(storedCartItems.length);
}, [keycloak]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAccountMenuOpen = (event) => {
        setAnchorElAccount(event.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAnchorElAccount(null);
    };

    const handleMenuItemClick = (text, path) => {
        setActive(text);
        if (path) {
            navigate(path);
        }
        handleAccountMenuClose();
        if (mobileOpen) {
            setMobileOpen(false);
        }
    };

    const Logout = async () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        handleAccountMenuClose();
        if (keycloak?.authenticated) {
            keycloak.logout();
        } else {
            navigate('/');
        }
    };


    // Các route theo role
    const roleMenuItems = [];
    if (roles.includes('tutor')) {
        roleMenuItems.push({ text: 'Dashboard Gia sư', path: '/dashboard/tutor', icon: <DashboardIcon fontSize="small" /> });
        roleMenuItems.push({ text: 'Voice Gia sư', path: '/tutor-voice', icon: <ListAltIcon fontSize="small" /> });
    }
    if (roles.includes('student')) {
        roleMenuItems.push({ text: 'Dashboard Học sinh', path: '/dashboard/student', icon: <DashboardIcon fontSize="small" /> });
    }
    if (roles.includes('parent')) {
        roleMenuItems.push({ text: 'Dashboard Phụ huynh', path: '/dashboard/parent', icon: <DashboardIcon fontSize="small" /> });
    }

    // Account menu items (for dropdown menu)
    const accountMenuItems = [
        ...roleMenuItems,
    ];

    const drawerItems = [
        { text: 'Khám phá', path: '#', onClick: () => handleMenuItemClick('Khám phá', '#') },
        ...(
            !keycloak?.authenticated
                ? [
                    { text: 'Đăng nhập', path: '/login', onClick: () => handleMenuItemClick('Đăng nhập', '/login') }
                ]
                : [
                    ...roleMenuItems.map(item => ({ ...item, onClick: () => handleMenuItemClick(item.text, item.path) })),
                    { text: 'Đăng xuất', onClick: Logout, icon: <ExitToAppIcon fontSize="small" /> }
                ]
        ),
    ];

    const handleSearch = (searchTerm) => {
        const trimmedSearchTerm = searchTerm.trim();
        if (trimmedSearchTerm) {
            navigate(`/search?q=${encodeURIComponent(trimmedSearchTerm)}`);
        }
    };

    return (
        <>
            <AppBar position="sticky" sx={{
                backgroundColor: '#A6B0CF',
                color: '#222222',
                boxShadow: "none",
                borderBottom: `1px solidrgb(71, 105, 187)`,
                zIndex: 200,
            }}>
                <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important', padding: { xs: '0 16px', md: '0 32px' } }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            display: { xs: "block", md: "none" },
                            mr: 1,
                            color: COLORS.darkestBlue
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box component={Link} to="/" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        gap: 1.5,
                        flexShrink: 0,
                    }}>
                        <img
                            src="/logo.png"
                            alt="Smart Practice Logo"
                            style={{ height: 32, width: 32, objectFit: 'contain' }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontFamily: 'Montserrat, Arial, sans-serif',
                                fontWeight: 900,
                                fontSize: { xs: 18, sm: 20, md: 22 },
                                letterSpacing: 2,
                                color: '#fff',
                                textTransform: 'uppercase',
                                ml: 0.5,
                                lineHeight: 1.1,
                                background: 'linear-gradient(90deg, #3F599C 0%, #274690 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 2px 8px #1B264F44',
                            }}
                        >
                            Julie Academy
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 3, gap: 1 }}>
                        <MuiButton
                            component={Link}
                            to="#"
                            color="inherit"
                            sx={{
                                color: COLORS.darkestBlue,
                                fontWeight: 500,
                                fontSize: 17,
                                textTransform: 'none',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                '&:hover': {
                                    backgroundColor: COLORS.mediumBlue,
                                    color: COLORS.whiteText,
                                },
                            }}
                            onClick={() => setActive('Khám phá')}
                        >
                            Khám phá <Typography component="span" sx={{ fontSize: 14, ml: 0.5, lineHeight: 1 }}>▼</Typography>
                        </MuiButton>
                        {/* Hiển thị các route theo role nếu đã đăng nhập */}
                        {keycloak?.authenticated && roleMenuItems.map(item => (
                            <MuiButton
                                key={item.text}
                                component={Link}
                                to={item.path}
                                color="inherit"
                                sx={{
                                    color: COLORS.darkestBlue,
                                    fontWeight: 500,
                                    fontSize: 17,
                                    textTransform: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '4px',
                                    '&:hover': {
                                        backgroundColor: COLORS.mediumBlue,
                                        color: COLORS.whiteText,
                                    },
                                }}
                                onClick={() => handleMenuItemClick(item.text, item.path)}
                                startIcon={item.icon}
                            >
                                {item.text}
                            </MuiButton>
                        ))}
                    </Box>
                    <Search sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1, maxWidth: { sm: 200, md: 280 }, mr: 3 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm…"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleSearch(event.target.value);
                                }
                            }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!keycloak?.authenticated ? (
                            <MuiButton
                                component={Link}
                                to="/login"
                                color="inherit"
                                sx={{
                                    color: COLORS.darkestBlue,
                                    fontWeight: 500,
                                    fontSize: 16,
                                    textTransform: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '4px',
                                    '&:hover': {
                                        backgroundColor: COLORS.darkBlue,
                                        color: COLORS.whiteText,
                                    },
                                }}
                                onClick={() => handleMenuItemClick("Đăng nhập", "/login")}
                            >
                                Đăng nhập
                            </MuiButton>
                        ) : null}
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="account-menu-appbar"
                            aria-haspopup="true"
                            onClick={handleAccountMenuOpen}
                            color="inherit"
                            sx={{ color: COLORS.darkestBlue }}
                        >
                            {userAvatar ? <Avatar src={userAvatar} sx={{ width: 32, height: 32 }} /> : <AccountCircleIcon />}
                        </IconButton>
                        <IconButton onClick={toggleMode} color="inherit" aria-label="Chuyển dark/light mode">
                            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                    {keycloak?.authenticated && (
                        <Menu
                            id="account-menu-appbar"
                            anchorEl={anchorElAccount}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElAccount)}
                            onClose={handleAccountMenuClose}
                            sx={{ '& .MuiPaper-root': { minWidth: 220, backgroundColor: COLORS.darkestBlue, color: COLORS.whiteText } }}
                        >
                            <Box sx={{ padding: '10px 16px' }}>
                                <Typography variant="subtitle1" noWrap sx={{ color: COLORS.whiteText }}>
                                    {userName || "Tài khoản"}
                                </Typography>
                            </Box>
                            <Divider sx={{ backgroundColor: COLORS.mediumBlue }} />
                            {accountMenuItems.map((item) => (
                                <MenuItem key={item.text} onClick={() => handleMenuItemClick(item.text, item.path)} component={Link} to={item.path}
                                    sx={{
                                        '&:hover': { backgroundColor: COLORS.darkBlue },
                                        color: COLORS.whiteText
                                    }}
                                >
                                    {item.icon && <ListItemIcon sx={{ color: COLORS.whiteText }}>{item.icon}</ListItemIcon>}
                                    <ListItemText primary={item.text} />
                                </MenuItem>
                            ))}
                            <Divider sx={{ backgroundColor: COLORS.mediumBlue }} />
                            <MenuItem onClick={Logout}
                                sx={{
                                    '&:hover': { backgroundColor: COLORS.darkBlue },
                                    color: COLORS.whiteText
                                }}
                            >
                                <ListItemIcon><ExitToAppIcon fontSize="small" sx={{ color: COLORS.whiteText }} /></ListItemIcon>
                                <ListItemText primary="Đăng xuất" />
                            </MenuItem>
                        </Menu>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: 'border-box',
                        width: 240,
                        backgroundColor: COLORS.darkestBlue,
                        color: COLORS.whiteText
                    },
                }}
            >
                <Toolbar sx={{ backgroundColor: COLORS.darkestBlue, borderBottom: `1px solid ${COLORS.mediumBlue}` }}>
                    <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} onClick={handleDrawerToggle}>
                        <img
                            src="/logo.png"
                            alt="Logo"
                            style={{ height: "32px", marginRight: "10px" }}
                        />
                        <Typography variant="h6" noWrap sx={{ fontWeight: 800, fontSize: 20, color: COLORS.lightBlue }}>
                            Julie Academy
                        </Typography>
                    </Box>
                    <IconButton onClick={handleDrawerToggle} sx={{ ml: 'auto', color: COLORS.whiteText }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <Box sx={{ padding: '8px 16px' }}>
                    <Search sx={{ width: '100%', margin: '0', backgroundColor: alpha(COLORS.whiteText, 0.1) }}>
                        <SearchIconWrapper sx={{ color: COLORS.whiteText }}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm…"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleSearch(event.target.value);
                                    setMobileOpen(false);
                                }
                            }}
                            sx={{ '& .MuiInputBase-input': { color: COLORS.whiteText } }}
                        />
                    </Search>
                </Box>
                <List>
                    {drawerItems.map((item) => (
                        <ListItem button key={item.text} onClick={item.onClick} component={item.path ? Link : 'div'} to={item.path || undefined}
                            sx={{
                                '&:hover': { backgroundColor: COLORS.darkBlue },
                                color: COLORS.whiteText
                            }}
                        >
                            {item.icon && <ListItemIcon sx={{ color: COLORS.whiteText }}>{item.icon}</ListItemIcon>}
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    color: active === item.text ? COLORS.lightBlue : COLORS.whiteText,
                                    fontWeight: active === item.text ? "bold" : "normal",
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default React.memo(Navbar);