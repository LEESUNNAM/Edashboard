import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ImageCard from '../components/ui/ImageCard';
import UploadButton from '../components/ui/UploadButton';
import { supabase, BUCKET_NAME } from '../lib/supabase';

function DashboardPage() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', { sortBy: { column: 'created_at', order: 'desc' } });

    if (error || !data) {
      setIsLoading(false);
      return;
    }

    const imageFiles = data.filter((f) => f.name && f.name !== '.emptyFolderPlaceholder');

    const withUrls = imageFiles.map((file) => {
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(file.name);
      return { ...file, publicUrl: urlData.publicUrl };
    });

    setImages(withUrls);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 3, md: 4 },
          px: { xs: 2, md: 4 },
          mb: 4,
          boxShadow: 2,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                이미지 갤러리
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
                총 {images.length}개의 이미지
              </Typography>
            </Box>
            <UploadButton onUploaded={fetchImages} />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pb: 6 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : images.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 12,
              color: 'text.secondary',
            }}
          >
            <Typography variant="h6" gutterBottom>
              업로드된 이미지가 없습니다
            </Typography>
            <Typography variant="body2">
              상단의 &quot;이미지 업로드&quot; 버튼으로 이미지를 추가하세요
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {images.map((img) => (
              <Grid key={img.name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ImageCard
                  fileName={img.name}
                  publicUrl={img.publicUrl}
                  onDeleted={fetchImages}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default DashboardPage;
