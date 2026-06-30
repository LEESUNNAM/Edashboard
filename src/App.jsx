import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import SiteHeader from './components/common/SiteHeader';
import FileSharePage from './pages/FileSharePage';
import LoginPage from './pages/LoginPage';

function AppRoutes() {
  const { loading } = useAuthContext();

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <>
              <SiteHeader />
              <Box component="main" sx={{ flex: 1 }}>
                <FileSharePage />
              </Box>
            </>
          }
        />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter basename="/Edashboard">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
