import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signUp, resetPassword, isLoading, error, setError } = useAuth();

  const [tab, setTab] = useState(0); // 0: 로그인, 1: 회원가입
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showReset, setShowReset] = useState(false);

  const handleTabChange = (_, v) => {
    setTab(v);
    setError('');
    setSuccessMsg('');
    setShowReset(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');

    if (tab === 1 && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (tab === 0) {
      const ok = await signIn(email, password);
      if (ok) navigate('/');
    } else {
      const ok = await signUp(email, password);
      if (ok) setSuccessMsg('회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해 주세요.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const ok = await resetPassword(email);
    if (ok) setSuccessMsg('비밀번호 재설정 링크를 이메일로 발송했습니다.');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
      }}
    >
      {/* 브랜드 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <FolderSharedIcon sx={{ fontSize: 32, color: 'primary.dark' }} />
        <Typography sx={{ fontSize: '24px', fontWeight: 700, color: 'primary.dark' }}>
          E·Share
        </Typography>
      </Box>

      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-container)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {!showReset ? (
            <>
              {/* 탭 */}
              <Tabs
                value={tab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  mb: 3,
                  '& .MuiTab-root': {
                    fontSize: 'var(--font-size-body)',
                    fontWeight: 500,
                    textTransform: 'none',
                    color: 'var(--color-text-muted)',
                  },
                  '& .Mui-selected': { color: 'primary.dark', fontWeight: 700 },
                  '& .MuiTabs-indicator': { bgcolor: 'primary.dark', height: 3, borderRadius: '3px 3px 0 0' },
                }}
              >
                <Tab label="로그인" disableRipple />
                <Tab label="회원가입" disableRipple />
              </Tabs>

              {/* 알림 */}
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 'var(--radius-sm)' }} onClose={() => setError('')}>
                  {error}
                </Alert>
              )}
              {successMsg && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: 'var(--radius-sm)' }}>
                  {successMsg}
                </Alert>
              )}

              {/* 폼 */}
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="이메일"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  size="small"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 'var(--radius-sm)' } }}
                />
                <TextField
                  label="비밀번호"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  size="small"
                  inputProps={{ minLength: 6 }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 'var(--radius-sm)' } }}
                />
                {tab === 1 && (
                  <TextField
                    label="비밀번호 확인"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    fullWidth
                    size="small"
                    inputProps={{ minLength: 6 }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 'var(--radius-sm)' } }}
                  />
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    mt: 0.5,
                    bgcolor: 'primary.dark',
                    '&:hover': { bgcolor: 'primary.dark', opacity: 0.9 },
                    borderRadius: 'var(--radius-sm)',
                    py: 1.2,
                    fontSize: 'var(--font-size-body)',
                    fontWeight: 700,
                  }}
                >
                  {isLoading ? '처리 중…' : tab === 0 ? '로그인' : '회원가입'}
                </Button>
              </Box>

              {tab === 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      component="button"
                      type="button"
                      onClick={() => { setShowReset(true); setError(''); setSuccessMsg(''); }}
                      sx={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-caption)',
                        color: 'var(--color-text-muted)',
                        '&:hover': { color: 'primary.dark', textDecoration: 'underline' },
                      }}
                    >
                      비밀번호를 잊으셨나요?
                    </Typography>
                  </Box>
                </>
              )}
            </>
          ) : (
            /* 비밀번호 재설정 */
            <>
              <Typography sx={{ fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                비밀번호 재설정
              </Typography>
              <Typography sx={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-text-muted)', mb: 3 }}>
                가입한 이메일로 재설정 링크를 발송합니다.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 'var(--radius-sm)' }} onClose={() => setError('')}>
                  {error}
                </Alert>
              )}
              {successMsg && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: 'var(--radius-sm)' }}>
                  {successMsg}
                </Alert>
              )}

              <Box component="form" onSubmit={handleResetPassword} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="이메일"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  size="small"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 'var(--radius-sm)' } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    bgcolor: 'primary.dark',
                    '&:hover': { bgcolor: 'primary.dark', opacity: 0.9 },
                    borderRadius: 'var(--radius-sm)',
                    py: 1.2,
                    fontWeight: 700,
                  }}
                >
                  {isLoading ? '발송 중…' : '재설정 링크 발송'}
                </Button>
                <Button
                  type="button"
                  variant="text"
                  onClick={() => { setShowReset(false); setError(''); setSuccessMsg(''); }}
                  sx={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-caption)', textTransform: 'none' }}
                >
                  로그인으로 돌아가기
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
