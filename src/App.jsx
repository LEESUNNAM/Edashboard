import { useState } from 'react';
import Box from '@mui/material/Box';
import Sidebar from './components/common/Sidebar';
import TopBar from './components/common/TopBar';
import RightPanel from './components/common/RightPanel';
import DashboardPage from './pages/DashboardPage';

const SIDEBAR_WIDTH = 200;
const RIGHT_PANEL_WIDTH = 280;
const TOPBAR_HEIGHT = 64;

function App() {
  const [activePage, setActivePage] = useState('gallery');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 좌측 사이드바 */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        width={SIDEBAR_WIDTH}
      />

      {/* 메인 영역 */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
          mr: { xs: 0, lg: `${RIGHT_PANEL_WIDTH}px` },
          minWidth: 0,
        }}
      >
        {/* 상단 헤더 */}
        <TopBar
          height={TOPBAR_HEIGHT}
          sidebarWidth={SIDEBAR_WIDTH}
          rightPanelWidth={RIGHT_PANEL_WIDTH}
        />

        {/* 페이지 콘텐츠 */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 3 },
            mt: `${TOPBAR_HEIGHT}px`,
          }}
        >
          <DashboardPage />
        </Box>
      </Box>

      {/* 우측 패널 */}
      <RightPanel width={RIGHT_PANEL_WIDTH} topOffset={TOPBAR_HEIGHT} />
    </Box>
  );
}

export default App;
