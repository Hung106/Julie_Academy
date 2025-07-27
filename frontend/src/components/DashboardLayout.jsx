import React, { useState, useEffect } from 'react'; // Import useEffect
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const HEADER_HEIGHT = 64;

export default function DashboardLayout({ mode, toggleMode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Thêm trạng thái để theo dõi xem sidebar đã được gắn (mounted) trên desktop chưa
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);

  // Sử dụng useEffect để cập nhật isSidebarMounted sau khi component Sidebar được render lần đầu
  // Điều này sẽ chạy sau lần render đầu tiên của DashboardLayout
  useEffect(() => {
    // Chúng ta giả định rằng nếu isSidebarOpen là true (tức là sidebar có ý định hiển thị trên desktop)
    // thì nó sẽ sớm được mount.
    // Nếu bạn muốn chính xác hơn, bạn có thể truyền một callback từ Sidebar lên.
    // Tuy nhiên, với mục đích này, việc đợi một chu kỳ render là đủ.
    setIsSidebarMounted(true); 
  }, []); // Chạy một lần sau khi component mount

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      <Header
        mode={mode}
        toggleMode={toggleMode}
        isSidebarExpanded={isSidebarOpen}
        onDesktopSidebarToggle={handleSidebarToggle}
        onMobileSidebarToggle={handleMobileDrawerToggle}
        isSidebarMounted={isSidebarMounted} // Truyền trạng thái sidebar đã mount
      />
      <Sidebar
        isDesktopOpen={isSidebarOpen}
        isMobileOpen={mobileOpen}
        onMobileClose={handleMobileDrawerToggle}
        headerHeight={HEADER_HEIGHT}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: `${HEADER_HEIGHT}px`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}