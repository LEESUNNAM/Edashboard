import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuth } from '../../hooks/useAuth';

function SiteHeader() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const initial = user?.email?.[0]?.toUpperCase() ?? '?';
  const email = user?.email ?? '';

  const handleSignOut = async () => {
    setAnchorEl(null);
    await signOut();
    navigate('/login');
  };

  return (
    <Box
      component="header"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        px: { xs: 2, md: 4 },
        py: { xs: 1.5, md: 2 },
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        boxShadow: 3,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* 브랜드 */}
      <FolderSharedIcon
        sx={{ fontSize: 26, color: 'var(--color-accent)', cursor: 'pointer', flexShrink: 0 }}
        onClick={() => navigate('/')}
      />
      <Box sx={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>
        <Typography sx={{ fontSize: { xs: '15px', md: '18px' }, fontWeight: 700, lineHeight: 1.2, color: 'white' }}>
          E·Share
        </Typography>
        <Typography sx={{ fontSize: '11px', color: 'var(--color-accent)', lineHeight: 1.2, display: { xs: 'none', sm: 'block' } }}>
          파일을 업로드하고 공유하세요
        </Typography>
      </Box>

      {/* 로그인 상태 */}
      {user ? (
        <>
          <Avatar
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'var(--color-primary)',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              '&:hover': { opacity: 0.85 },
              transition: 'opacity 0.2s',
            }}
          >
            {initial}
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: { borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-container)', minWidth: 200, mt: 0.5 },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon sx={{ fontSize: 16, color: 'var(--color-text-muted)' }} />
                <Typography sx={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)', wordBreak: 'break-all' }}>
                  {email}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <MenuItem
              onClick={handleSignOut}
              sx={{ gap: 1.5, py: 1.2, fontSize: 'var(--font-size-body)', color: '#f44336' }}
            >
              <LogoutIcon fontSize="small" />
              로그아웃
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate('/login')}
          sx={{
            borderColor: 'var(--color-accent)',
            color: 'var(--color-accent)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--font-size-caption)',
            fontWeight: 600,
            px: 1.5,
            py: 0.5,
            minHeight: 'unset',
            '&:hover': { borderColor: 'white', color: 'white', bgcolor: 'rgba(255,255,255,0.08)' },
          }}
        >
          로그인
        </Button>
      )}
    </Box>
  );
}

export default SiteHeader;
