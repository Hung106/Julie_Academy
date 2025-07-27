import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import {
  AppBar, Toolbar, IconButton, Typography, Button, Avatar, Box, Menu, MenuItem,
  Divider, ListItemIcon, Tooltip, useTheme, Badge, InputBase,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// --- LAYOUT CONSTANTS ---
const HEADER_HEIGHT = 64;
const FULL_SIDEBAR_WIDTH = 260;
const COLLAPSED_SIDEBAR_WIDTH = 80;

const USER_MENU_CONFIG = [
  { text: 'Hồ sơ', path: '/profile', icon: <PersonOutlineIcon fontSize="small" /> },
  { text: 'Cài đặt', path: '/settings', icon: <SettingsOutlinedIcon fontSize="small" /> },
  { text: 'Ngôn ngữ', path: '/language', icon: <LanguageIcon fontSize="small" /> },
];

// --- STYLED COMPONENTS ---

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isSidebarExpanded' && prop !== 'isSidebarMounted', // Thêm prop mới
})(({ theme, isSidebarExpanded, isSidebarMounted }) => ({ // Nhận prop mới
  height: HEADER_HEIGHT,
  color: theme.palette.text.primary,
  backdropFilter: 'blur(10px)',
  background: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[900],
  borderBottom: 'none',

  // Chỉ áp dụng width và marginLeft khi sidebar đã được mount và trên màn hình lớn
  [theme.breakpoints.up('lg')]: {
    width: isSidebarMounted
      ? `calc(100% - ${isSidebarExpanded ? FULL_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH}px)`
      : '100%', // Nếu chưa mount, giữ 100%
    marginLeft: isSidebarMounted
      ? `${isSidebarExpanded ? FULL_SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH}px`
      : '0px', // Nếu chưa mount, giữ 0px
  },

  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.common.white, 0.08),
  border: 'none',
  width: '100%',
  maxWidth: 500,
  display: 'flex',
  alignItems: 'center',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.5)}`,
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
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, `calc(1em + ${theme.spacing(4)})`),
    width: '100%',
  },
}));

const HeaderIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[400],
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    color: theme.palette.common.white,
  },
}));

// --- HEADER COMPONENT ---

function Header({
  mode,
  toggleMode,
  isSidebarExpanded,
  onDesktopSidebarToggle,
  onMobileSidebarToggle,
  isSidebarMounted, // Nhận prop mới
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { keycloak, initialized } = useKeycloak();

  const isAuth = useMemo(() => initialized && keycloak.authenticated, [initialized, keycloak.authenticated]);

  const userInfo = useMemo(() => {
    if (!isAuth || !keycloak.tokenParsed) return { name: 'Guest', email: '' };
    return {
      name: keycloak.tokenParsed.name || 'Tài khoản',
      email: keycloak.tokenParsed.email || ''
    };
  }, [isAuth, keycloak.tokenParsed]);

  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleNav = useCallback((path) => {
    closeMenu();
    navigate(path);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    closeMenu();
    keycloak.logout({ redirectUri: window.location.origin });
  }, [keycloak]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (!initialized) {
    // Nếu chưa khởi tạo Keycloak, vẫn render AppBar cơ bản với full width
    return <AppBar position="fixed" sx={{ height: HEADER_HEIGHT, width: '100%', background: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[900], }} elevation={0} />;
  }

  return (
    <StyledAppBar position="fixed" elevation={0} isSidebarExpanded={isSidebarExpanded} isSidebarMounted={isSidebarMounted}>
      <Toolbar sx={{ minHeight: HEADER_HEIGHT, px: { xs: 1, sm: 2 } }}>

        <HeaderIconButton edge="start" onClick={onMobileSidebarToggle} sx={{ mr: 1, display: { lg: 'none' } }}>
          <MenuIcon />
        </HeaderIconButton>

        {/* Biểu tượng Chevron cho desktop: Chỉ hiển thị nếu sidebar đã được mount */}
        {isSidebarMounted && ( // Chỉ hiển thị icon khi sidebar đã mount
          <HeaderIconButton onClick={onDesktopSidebarToggle} sx={{ display: { xs: 'none', lg: 'inline-flex' } }}>
            {isSidebarExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </HeaderIconButton>
        )}


        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', px: 2 }}
        >
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          <Tooltip title="Tìm kiếm">
            <HeaderIconButton sx={{ display: { md: 'none' } }} onClick={() => navigate('/search')}>
              <SearchIcon />
            </HeaderIconButton>
          </Tooltip>
          <Tooltip title="Thông báo">
            <HeaderIconButton>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </HeaderIconButton>
          </Tooltip>
          <Tooltip title={mode === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}>
            <HeaderIconButton onClick={toggleMode}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </HeaderIconButton>
          </Tooltip>

          {isAuth ? (
            <Tooltip title="Tài khoản">
              <IconButton onClick={openMenu} sx={{ p: 0, ml: 1 }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                  {userInfo.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : (
            <Button variant="contained" onClick={() => navigate('/login')} sx={{ ml: 1 }}>
              Đăng nhập
            </Button>
          )}
        </Box>
      </Toolbar>

      {isAuth && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              overflow: 'visible',
              borderRadius: '12px',
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[5],
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
              '&:before': {
                content: '""', display: 'block', position: 'absolute', top: 0, right: 20,
                width: 10, height: 10,
                transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
                borderLeft: `1px solid ${theme.palette.divider}`,
                borderTop: `1px solid ${theme.palette.divider}`,
                background: 'inherit',
              },
            },
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight={600}>{userInfo.name}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {userInfo.email}
            </Typography>
          </Box>
          <Divider />
          {USER_MENU_CONFIG.map((item) => (
            <MenuItem key={item.text} onClick={() => handleNav(item.path)} sx={{ py: 1.2, px: 2 }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {item.text}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ py: 1.2, px: 2, color: 'error.main' }}>
            <ListItemIcon sx={{ color: 'error.main' }}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        </Menu>
      )}
    </StyledAppBar>
  );
}

export default React.memo(Header);