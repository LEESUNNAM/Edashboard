import Box from '@mui/material/Box';
import SiteHeader from './components/common/SiteHeader';
import FileSharePage from './pages/FileSharePage';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader />
      <Box component="main" sx={{ flex: 1 }}>
        <FileSharePage />
      </Box>
    </Box>
  );
}

export default App;
