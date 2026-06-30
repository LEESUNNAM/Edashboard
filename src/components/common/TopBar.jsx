import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

/**
 * TopBar 컴포넌트
 *
 * Props:
 * @param {number} height - 헤더 높이 (px) [Required]
 * @param {number} sidebarWidth - 좌측 사이드바 너비 (px) [Required]
 * @param {number} rightPanelWidth - 우측 패널 너비 (px) [Required]
 *
 * Example usage:
 * <TopBar height={64} sidebarWidth={200} rightPanelWidth={280} />
 */
function TopBar({ height, sidebarWidth, rightPanelWidth }) {
  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: { xs: 0, md: `${sidebarWidth}px` },
        right: { xs: 0, lg: `${rightPanelWidth}px` },
        height,
        bgcolor: 'background.paper',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, md: 3 },
        gap: 2,
        zIndex: 1100,
      }}
    >
      {/* 모바일 전용 브랜드명 */}
      <Typography
        sx={{
          display: { xs: 'block', md: 'none' },
          fontSize: '16px',
          fontWeight: 700,
          color: 'primary.dark',
          whiteSpace: 'nowrap',
          mr: 1,
        }}
      >
        E·Gallery
      </Typography>

      {/* 검색바 */}
      <Box
        sx={{
          flex: 1,
          maxWidth: 360,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'background.default',
          borderRadius: 'var(--radius-md)',
          px: 'var(--spacing-sm)',
          py: '6px',
          gap: 1,
        }}
      >
        <SearchIcon
          sx={{ color: 'text.disabled', fontSize: 'var(--icon-size)', flexShrink: 0 }}
        />
        <InputBase
          placeholder="이미지 검색..."
          sx={{
            flex: 1,
            fontSize: 'var(--font-size-body)',
            color: 'text.primary',
            '& input::placeholder': { color: 'var(--color-text-muted)' },
          }}
        />
      </Box>

      {/* 우측 공백 */}
      <Box sx={{ flex: 1 }} />

      {/* 알림 아이콘 */}
      <IconButton
        size="small"
        aria-label="알림"
        sx={{
          color: 'text.secondary',
          width: 40,
          height: 40,
          '&:hover': { bgcolor: 'background.default' },
        }}
      >
        <Badge badgeContent={3} color="error">
          <NotificationsIcon sx={{ fontSize: 'var(--icon-size)' }} />
        </Badge>
      </IconButton>

      {/* 프로필 아바타 */}
      <Avatar
        sx={{
          width: 'var(--avatar-size-md)',
          height: 'var(--avatar-size-md)',
          bgcolor: 'primary.main',
          fontSize: '15px',
          fontWeight: 700,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'primary.dark' },
          transition: 'background-color 0.2s',
        }}
        aria-label="내 프로필"
      >
        이
      </Avatar>
    </Box>
  );
}

export default TopBar;
