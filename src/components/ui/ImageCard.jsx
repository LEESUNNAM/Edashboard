import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { supabase, BUCKET_NAME } from '../../lib/supabase';

/**
 * ImageCard 컴포넌트
 *
 * Props:
 * @param {string} fileName - 파일명 [Required]
 * @param {string} publicUrl - 공개 이미지 URL [Required]
 * @param {function} onDeleted - 삭제 완료 후 호출되는 콜백 [Required]
 *
 * Example usage:
 * <ImageCard fileName="photo.jpg" publicUrl="https://..." onDeleted={handleRefresh} />
 */
function ImageCard({ fileName, publicUrl, onDeleted }) {
  const handleDownload = async () => {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(fileName);
    if (error || !data) return;
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);
    if (!error) onDeleted();
  };

  const displayName = fileName.length > 20
    ? fileName.slice(0, 17) + '...'
    : fileName;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={publicUrl}
        alt={fileName}
        sx={{
          height: 200,
          objectFit: 'cover',
          bgcolor: 'grey.100',
        }}
      />
      <CardContent sx={{ pb: 0, flexGrow: 1 }}>
        <Tooltip title={fileName} placement="top">
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {displayName}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Tooltip title="다운로드">
          <IconButton size="small" onClick={handleDownload} color="primary">
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="삭제">
          <IconButton size="small" onClick={handleDelete} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default ImageCard;
