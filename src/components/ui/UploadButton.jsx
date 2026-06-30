import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { supabase, BUCKET_NAME } from '../../lib/supabase';

/**
 * UploadButton 컴포넌트
 *
 * Props:
 * @param {function} onUploaded - 업로드 완료 후 호출되는 콜백 [Required]
 *
 * Example usage:
 * <UploadButton onUploaded={handleRefresh} />
 */
function UploadButton({ onUploaded }) {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsLoading(true);
    const errors = [];

    for (const file of files) {
      const safeName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(safeName, file, { upsert: false });
      if (error) errors.push(file.name);
    }

    setIsLoading(false);
    e.target.value = '';

    if (errors.length) {
      setSnack({ open: true, message: `업로드 실패: ${errors.join(', ')}`, severity: 'error' });
    } else {
      setSnack({ open: true, message: `${files.length}개 파일 업로드 완료!`, severity: 'success' });
      onUploaded();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <UploadFileIcon />}
        onClick={handleClick}
        disabled={isLoading}
        sx={{ borderRadius: 2, px: 3 }}
      >
        {isLoading ? '업로드 중...' : '이미지 업로드'}
      </Button>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} variant="filled" onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default UploadButton;
