import { useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * DropZone 컴포넌트 — 드래그앤드롭 + 파일/폴더 선택 + 업로드 진행 상태
 *
 * Props:
 * @param {function} onFiles - 선택된 File[] 전달 콜백 [Required]
 * @param {boolean} isUploading - 업로드 진행 중 여부 [Required]
 * @param {Array} progress - 파일별 진행 상태 배열 [Required]
 * @param {string[]} errors - 에러 메시지 배열 [Required]
 * @param {number} successCount - 성공한 파일 수 [Required]
 * @param {function} onReset - 상태 초기화 콜백 [Required]
 *
 * Example usage:
 * <DropZone onFiles={processFiles} isUploading={false} progress={[]} errors={[]} successCount={0} onReset={reset} />
 */
function DropZone({ onFiles, isUploading, progress, errors, successCount, onReset }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(files);
  }, [onFiles]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragOver(false), []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) onFiles(files);
    e.target.value = '';
  };

  const doneCount = progress.filter((p) => p.status === 'done').length;
  const totalCount = progress.length;
  const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  const hasResult = !isUploading && totalCount > 0;

  return (
    <Box>
      {/* 드롭존 */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          border: '2px dashed',
          borderColor: isDragOver ? 'primary.main' : 'var(--color-accent)',
          borderRadius: 'var(--radius-lg)',
          bgcolor: isDragOver ? 'rgba(122, 174, 200, 0.08)' : 'background.paper',
          p: { xs: 4, md: 5 },
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(122, 174, 200, 0.04)' },
        }}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <UploadFileIcon
          sx={{ fontSize: 48, color: isDragOver ? 'primary.main' : 'var(--color-text-muted)', mb: 1.5 }}
        />
        <Typography
          sx={{ fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'text.primary', mb: 0.5 }}
        >
          파일을 여기에 드래그하거나 클릭하여 업로드하세요
        </Typography>
        <Typography sx={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-text-muted)', mb: 3 }}>
          최대 50MB · PDF, 이미지, ZIP, HWP, DOCX, XLSX, MP4 등 지원
        </Typography>

        {/* 버튼 영역 */}
        <Box
          sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            sx={{ bgcolor: 'primary.dark', '&:hover': { bgcolor: 'primary.dark', opacity: 0.9 } }}
          >
            파일 선택
          </Button>
          <Button
            variant="outlined"
            startIcon={<FolderOpenIcon />}
            disabled={isUploading}
            onClick={() => folderInputRef.current?.click()}
            sx={{ borderColor: 'primary.dark', color: 'primary.dark' }}
          >
            폴더 선택
          </Button>
        </Box>

        {/* 숨김 input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
        <input
          ref={folderInputRef}
          type="file"
          multiple
          hidden
          webkitdirectory=""
          onChange={handleFileChange}
        />
      </Box>

      {/* 업로드 진행 상태 */}
      {isUploading && totalCount > 0 && (
        <Box sx={{ mt: 2, p: 2.5, bgcolor: 'background.paper', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'text.primary' }}>
              업로드 중…
            </Typography>
            <Typography sx={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-text-muted)' }}>
              {doneCount} / {totalCount}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{ height: 8, borderRadius: 4, bgcolor: 'var(--color-accent)', '& .MuiLinearProgress-bar': { bgcolor: 'primary.dark' } }}
          />
          <Box sx={{ mt: 1.5, maxHeight: 120, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {progress.map((p, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {p.status === 'done' && <CheckCircleIcon sx={{ fontSize: 14, color: '#4caf50' }} />}
                {p.status === 'error' && <ErrorIcon sx={{ fontSize: 14, color: '#f44336' }} />}
                {(p.status === 'uploading' || p.status === 'pending') && (
                  <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: 'var(--color-accent)', flexShrink: 0 }} />
                )}
                <Typography sx={{ fontSize: '12px', color: p.status === 'error' ? '#f44336' : 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* 결과 메시지 */}
      {hasResult && (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {successCount > 0 && (
            <Alert
              severity="success"
              onClose={onReset}
              sx={{ borderRadius: 'var(--radius-md)' }}
            >
              {successCount}개 파일이 성공적으로 업로드되었습니다.
            </Alert>
          )}
          {errors.length > 0 && (
            <Alert severity="error" onClose={onReset} sx={{ borderRadius: 'var(--radius-md)' }}>
              <Typography sx={{ fontSize: 'var(--font-size-body-sm)', fontWeight: 600, mb: 0.5 }}>
                {errors.length}개 파일 업로드 실패
              </Typography>
              {errors.map((e, i) => (
                <Typography key={i} sx={{ fontSize: '12px' }}>{e}</Typography>
              ))}
            </Alert>
          )}
          {hasResult && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Chip
                label="초기화"
                size="small"
                onClick={onReset}
                sx={{ cursor: 'pointer', bgcolor: 'var(--color-accent)', fontSize: '12px' }}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default DropZone;
