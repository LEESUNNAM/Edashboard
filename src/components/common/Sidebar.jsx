import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';

/**
 * Sidebar 컴포넌트
 *
 * Props:
 * @param {string} activePage - 현재 활성화된 페이지 ID [Required]
 * @param {function} onNavigate - 네비게이션 클릭 핸들러 [Required]
 * @param {number} width - 사이드바 너비 (px) [Required]
 *
 * Example usage:
 * <Sidebar activePage="gallery" onNavigate={setActivePage} width={200} />
 */

const NAV_ITEMS = [
  { id: 'gallery', label: '갤러리', icon: <PhotoLibraryIcon /> },
  { id: 'stats', label: '통계', icon: <BarChartIcon /> },
  { id: 'users', label: '사용자', icon: <PeopleIcon /> },
  { id: 'calendar', label: '일정', icon: <CalendarMonthIcon /> },
  { id: 'settings', label: '설정', icon: <SettingsIcon /> },
];

function Sidebar({ activePage, onNavigate, width }) {
  return (
    <Box
      component="nav"
      sx={{
        width,
        flexShrink: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        bgcolor: 'primary.dark',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        zIndex: 1200,
        boxShadow: 'var(--shadow-container)',
      }}
    >
      {/* 브랜드 영역 */}
      <Box sx={{ px: 'var(--spacing-xl)', pt: 'var(--spacing-2xl)', pb: 'var(--spacing-lg)' }}>
        <Typography
          sx={{
            color: 'white',
            fontWeight: 700,
            fontSize: '18px',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
          }}
        >
          E·Gallery
        </Typography>
        <Typography
          sx={{
            color: 'var(--color-accent)',
            fontSize: 'var(--font-size-caption)',
            mt: '4px',
          }}
        >
          이미지 대시보드
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mx: 'var(--spacing-md)' }} />

      {/* 네비게이션 목록 */}
      <List sx={{ px: 'var(--spacing-sm)', py: 'var(--spacing-md)', flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <ListItemButton
              key={item.id}
              onClick={() => onNavigate(item.id)}
              sx={{
                borderRadius: 'var(--radius-sm)',
                mb: '2px',
                px: 'var(--spacing-sm)',
                py: 'var(--spacing-xs)',
                bgcolor: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                '&:hover': {
                  bgcolor: isActive ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
                },
                transition: 'background-color 0.2s',
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                  minWidth: 34,
                  '& .MuiSvgIcon-root': { fontSize: 'var(--icon-size)' },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 'var(--font-size-nav)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'white' : 'rgba(255,255,255,0.65)',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mx: 'var(--spacing-md)' }} />

      {/* 사용자 프로필 */}
      <Box
        sx={{
          p: 'var(--spacing-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)',
        }}
      >
        <Avatar
          sx={{
            width: 'var(--avatar-size-sm)',
            height: 'var(--avatar-size-sm)',
            bgcolor: 'var(--color-primary)',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          이
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: 'white',
              fontSize: 'var(--font-size-body-sm)',
              fontWeight: 600,
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            이선남
          </Typography>
          <Typography sx={{ color: 'var(--color-accent)', fontSize: '11px' }}>
            관리자
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
