import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import FileCard from './FileCard';

/**
 * FileList 컴포넌트 — 파일 목록 렌더링 + 빈 상태 + 로딩
 *
 * Props:
 * @param {Array} files - 파일 메타데이터 배열 [Required]
 * @param {boolean} isLoading - 로딩 중 여부 [Required]
 * @param {function} onDownload - 다운로드 핸들러 [Required]
 * @param {function} onDelete - 삭제 핸들러 [Required]
 * @param {string} search - 현재 검색어 (빈 상태 메시지에 사용) [Optional]
 *
 * Example usage:
 * <FileList files={files} isLoading={false} onDownload={handleDownload} onDelete={handleDelete} />
 */
function FileList({ files, isLoading, onDownload, onDelete, search = '' }) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (files.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 12,
          bgcolor: 'background.paper',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <FolderOffIcon sx={{ fontSize: 56, color: 'var(--color-accent)', mb: 2 }} />
        <Typography
          sx={{ fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'text.primary', mb: 0.75 }}
        >
          {search ? '검색 결과가 없습니다' : '업로드된 파일이 없습니다'}
        </Typography>
        <Typography sx={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-text-muted)' }}>
          {search
            ? `"${search}"에 해당하는 파일을 찾을 수 없습니다`
            : '파일을 업로드하여 공유를 시작하세요'}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {files.map((file) => (
        <Grid key={file.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FileCard
            file={file}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default FileList;
