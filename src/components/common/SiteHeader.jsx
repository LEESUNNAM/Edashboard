import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

function SiteHeader() {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 2.5 },
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        boxShadow: 3,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <FolderSharedIcon sx={{ fontSize: 28, color: 'var(--color-accent)' }} />
      <Box>
        <Typography
          sx={{
            fontSize: { xs: '16px', md: '20px' },
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'white',
          }}
        >
          E·Share
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            color: 'var(--color-accent)',
            lineHeight: 1.2,
          }}
        >
          파일을 업로드하고 공유하세요
        </Typography>
      </Box>
    </Box>
  );
}

export default SiteHeader;
