import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

/**
 * AuthGuard 컴포넌트 — 비로그인 시 업로드 영역 대체 표시
 *
 * Props:
 * @param {boolean} isLoggedIn - 로그인 여부 [Required]
 * @param {React.ReactNode} children - 로그인 시 표시할 콘텐츠 [Required]
 *
 * Example usage:
 * <AuthGuard isLoggedIn={!!user}><DropZone /></AuthGuard>
 */
function AuthGuard({ isLoggedIn, children }) {
  const navigate = useNavigate();

  if (isLoggedIn) return children;

  return (
    <Box
      sx={{
        border: '2px dashed var(--color-accent)',
        borderRadius: 'var(--radius-lg)',
        bgcolor: 'background.paper',
        p: { xs: 4, md: 5 },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <LockIcon sx={{ fontSize: 48, color: 'var(--color-text-muted)' }} />
      <Box>
        <Typography sx={{ fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
          로그인이 필요합니다
        </Typography>
        <Typography sx={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-text-muted)' }}>
          파일을 업로드하려면 먼저 로그인해 주세요
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={() => navigate('/login')}
        sx={{
          bgcolor: 'primary.dark',
          '&:hover': { bgcolor: 'primary.dark', opacity: 0.9 },
          borderRadius: 'var(--radius-sm)',
          px: 4,
          fontWeight: 700,
        }}
      >
        로그인 / 회원가입
      </Button>
    </Box>
  );
}

export default AuthGuard;
