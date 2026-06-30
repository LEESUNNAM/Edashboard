import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_LABELS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const ONLINE_USERS = [
  { name: '김지수', role: '편집자', isOnline: true, initial: '김' },
  { name: '박민준', role: '뷰어', isOnline: true, initial: '박' },
  { name: '이유진', role: '편집자', isOnline: false, initial: '이' },
  { name: '최서연', role: '관리자', isOnline: true, initial: '최' },
  { name: '정하늘', role: '뷰어', isOnline: false, initial: '정' },
];

/**
 * MiniCalendar 컴포넌트
 * 월 단위 달력 UI
 */
function MiniCalendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const isToday = (d) =>
    d !== null &&
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <Box>
      {/* 월 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 'var(--spacing-md)',
        }}
      >
        <IconButton
          size="small"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          sx={{ color: 'text.secondary', p: '4px' }}
          aria-label="이전 달"
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 'var(--font-size-h2)',
            color: 'text.primary',
          }}
        >
          {MONTH_LABELS[month]} {year}
        </Typography>
        <IconButton
          size="small"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          sx={{ color: 'text.secondary', p: '4px' }}
          aria-label="다음 달"
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 요일 헤더 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: '4px' }}>
        {DAY_LABELS.map((day) => (
          <Typography
            key={day}
            sx={{
              textAlign: 'center',
              fontSize: 'var(--font-size-day-label)',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              py: '4px',
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      {/* 날짜 그리드 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {cells.map((d, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1',
              borderRadius: 'var(--radius-circle)',
              bgcolor: isToday(d) ? 'primary.main' : 'transparent',
              cursor: d ? 'pointer' : 'default',
              '&:hover': d && !isToday(d) ? { bgcolor: 'var(--color-accent)' } : {},
              transition: 'background-color 0.15s',
            }}
          >
            {d && (
              <Typography
                sx={{
                  fontSize: 'var(--font-size-caption)',
                  fontWeight: isToday(d) ? 700 : 400,
                  color: isToday(d) ? 'white' : 'text.primary',
                  lineHeight: 1,
                }}
              >
                {d}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/**
 * RightPanel 컴포넌트
 *
 * Props:
 * @param {number} width - 패널 너비 (px) [Required]
 * @param {number} topOffset - 상단 오프셋 (TopBar 높이, px) [Required]
 *
 * Example usage:
 * <RightPanel width={280} topOffset={64} />
 */
function RightPanel({ width, topOffset }) {
  return (
    <Box
      sx={{
        width,
        flexShrink: 0,
        position: 'fixed',
        top: topOffset,
        right: 0,
        height: `calc(100vh - ${topOffset}px)`,
        bgcolor: 'background.paper',
        borderLeft: '1px solid var(--color-accent)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        overflowY: 'auto',
        zIndex: 1000,
      }}
    >
      {/* 달력 섹션 */}
      <Box sx={{ p: 'var(--spacing-xl)' }}>
        <MiniCalendar />
      </Box>

      <Divider sx={{ borderColor: 'var(--color-accent)' }} />

      {/* 온라인 사용자 섹션 */}
      <Box sx={{ p: 'var(--spacing-xl)', flex: 1 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 'var(--font-size-h2)',
            color: 'text.primary',
            mb: 'var(--spacing-md)',
          }}
        >
          온라인 사용자
        </Typography>

        {ONLINE_USERS.map((user) => (
          <Box
            key={user.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)',
              py: 'var(--spacing-xs)',
            }}
          >
            {/* 아바타 + 온라인 상태 표시 */}
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Avatar
                sx={{
                  width: 'var(--avatar-size-md)',
                  height: 'var(--avatar-size-md)',
                  bgcolor: 'primary.light',
                  color: 'primary.dark',
                  fontSize: 'var(--font-size-body-sm)',
                  fontWeight: 700,
                }}
              >
                {user.initial}
              </Avatar>
              <FiberManualRecordIcon
                sx={{
                  position: 'absolute',
                  bottom: -1,
                  right: -1,
                  fontSize: '12px',
                  color: user.isOnline ? '#4caf50' : '#bdbdbd',
                }}
              />
            </Box>

            {/* 이름 및 역할 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 500,
                  color: 'text.primary',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {user.role}
              </Typography>
            </Box>

            {/* 온라인 텍스트 */}
            <Typography
              sx={{
                fontSize: '11px',
                color: user.isOnline ? '#4caf50' : 'var(--color-text-muted)',
                flexShrink: 0,
              }}
            >
              {user.isOnline ? '온라인' : '오프라인'}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default RightPanel;
