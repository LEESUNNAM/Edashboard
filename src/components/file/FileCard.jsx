import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from './FileIcon';
import { formatFileSize, formatDate } from '../../utils/fileUtils';
import { CATEGORIES } from '../../config/fileConfig';

const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

/**
 * FileCard 컴포넌트 — 파일 정보 카드
 *
 * Props:
 * @param {object} file - 파일 메타데이터 객체 [Required]
 * @param {function} onDownload - 다운로드 핸들러 [Required]
 * @param {function} onDelete - 삭제 핸들러 [Required]
 *
 * Example usage:
 * <FileCard file={fileObj} onDownload={handleDownload} onDelete={handleDelete} />
 */
function FileCard({ file, onDownload, onDelete }) {
  const displayName = file.original_name.length > 40
    ? file.original_name.slice(0, 38) + '…'
    : file.original_name;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, pb: 0 }}>
        {/* 아이콘 + 카테고리 */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <FileIcon extension={file.file_extension} size={40} />
          <Chip
            label={CATEGORY_LABEL[file.category] ?? '기타'}
            size="small"
            sx={{
              bgcolor: 'var(--color-accent)',
              color: 'primary.dark',
              fontSize: '11px',
              fontWeight: 600,
              height: 20,
            }}
          />
        </Box>

        {/* 파일명 */}
        <Tooltip title={file.original_name} placement="top">
          <Typography
            sx={{
              fontSize: 'var(--font-size-body)',
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1.4,
              mb: 1,
              wordBreak: 'break-all',
            }}
          >
            {displayName}
          </Typography>
        </Tooltip>

        {/* 메타 정보 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          <Typography sx={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            {formatFileSize(file.file_size)} · .{file.file_extension.toUpperCase()}
          </Typography>
          <Typography sx={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            {formatDate(file.created_at)}
          </Typography>
          {file.folder_path && (
            <Typography sx={{ fontSize: '11px', color: 'var(--color-text-muted)', mt: 0.25 }}>
              📁 {file.folder_path}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions
        sx={{ justifyContent: 'space-between', px: 2, pb: 1.5, pt: 0.5 }}
      >
        {/* 다운로드 수 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <DownloadIcon sx={{ fontSize: 14, color: 'var(--color-text-muted)' }} />
          <Typography sx={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            {file.download_count ?? 0}
          </Typography>
        </Box>

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="다운로드">
            <IconButton
              size="small"
              onClick={() => onDownload(file)}
              sx={{
                color: 'primary.dark',
                '&:hover': { bgcolor: 'var(--color-accent)' },
              }}
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="삭제">
            <IconButton
              size="small"
              onClick={() => onDelete(file.id, file.file_path)}
              sx={{
                color: 'text.disabled',
                '&:hover': { color: '#f44336', bgcolor: 'rgba(244,67,54,0.08)' },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
}

export default FileCard;
