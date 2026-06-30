import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageIcon from '@mui/icons-material/Storage';
import ImageCard from '../components/ui/ImageCard';
import UploadButton from '../components/ui/UploadButton';
import { supabase, BUCKET_NAME } from '../lib/supabase';

/**
 * StatCard 컴포넌트 — 통계 수치 카드
 *
 * Props:
 * @param {React.ReactNode} icon - 아이콘 컴포넌트 [Required]
 * @param {string} label - 카드 라벨 [Required]
 * @param {string|number} value - 표시할 수치 [Required]
 * @param {string} iconBgColor - 아이콘 배경 색상 [Optional, 기본값: var(--color-accent)]
 *
 * Example usage:
 * <StatCard icon={<PhotoLibraryIcon />} label="총 이미지" value={24} />
 */
function StatCard({ icon, label, value, iconBgColor = 'var(--color-accent)' }) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-md)',
          p: 'var(--spacing-lg) !important',
        }}
      >
        {/* 아이콘 */}
        <Box
          sx={{
            width: 'var(--cta-button-size)',
            height: 'var(--cta-button-size)',
            borderRadius: 'var(--radius-circle)',
            bgcolor: iconBgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            '& .MuiSvgIcon-root': { color: 'primary.dark', fontSize: '22px' },
          }}
        >
          {icon}
        </Box>

        {/* 텍스트 */}
        <Box>
          <Typography
            sx={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.2,
              mb: '2px',
            }}
          >
            {label}
          </Typography>
          <Typography
            sx={{
              fontSize: 'var(--font-size-page-title)',
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

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

    const imageFiles = data.filter(
      (f) => f.name && f.name !== '.emptyFolderPlaceholder'
    );

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

  const totalSize = images.reduce((acc, img) => acc + (img.metadata?.size ?? 0), 0);
  const formattedSize =
    totalSize > 1024 * 1024
      ? `${(totalSize / (1024 * 1024)).toFixed(1)} MB`
      : `${(totalSize / 1024).toFixed(0)} KB`;

  return (
    <Box sx={{ maxWidth: 1200 }}>
      {/* 페이지 제목 + 업로드 버튼 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          gap: 'var(--spacing-md)',
          mb: 'var(--spacing-2xl)',
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '22px', md: 'var(--font-size-page-title)' },
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1.2,
            }}
          >
            내 갤러리
          </Typography>
          <Typography
            sx={{
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--color-text-muted)',
              mt: '4px',
            }}
          >
            이미지를 업로드하고 관리하세요
          </Typography>
        </Box>
        <UploadButton onUploaded={fetchImages} />
      </Box>

      {/* 통계 카드 3개 */}
      <Grid container spacing={2} sx={{ mb: 'var(--spacing-2xl)' }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            icon={<PhotoLibraryIcon />}
            label="총 이미지"
            value={isLoading ? '-' : images.length}
            iconBgColor="var(--color-accent)"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            icon={<CloudUploadIcon />}
            label="최근 업로드"
            value={isLoading ? '-' : `${Math.min(images.length, 5)}개`}
            iconBgColor="var(--color-primary-light)"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            icon={<StorageIcon />}
            label="사용 용량"
            value={isLoading ? '-' : formattedSize}
            iconBgColor="rgba(93, 128, 153, 0.15)"
          />
        </Grid>
      </Grid>

      {/* 갤러리 섹션 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)',
          mb: 'var(--spacing-lg)',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '18px', md: 'var(--font-size-h2)' },
            fontWeight: 700,
            color: 'text.primary',
          }}
        >
          이미지 목록
        </Typography>
        {!isLoading && (
          <Chip
            label={`${images.length}개`}
            size="small"
            sx={{
              bgcolor: 'var(--color-accent)',
              color: 'text.primary',
              fontSize: 'var(--font-size-caption)',
              fontWeight: 600,
              height: 22,
            }}
          />
        )}
      </Box>

      {/* 갤러리 콘텐츠 */}
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
          }}
        >
          <CircularProgress sx={{ color: 'primary.main' }} />
        </Box>
      ) : images.length === 0 ? (
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
          <PhotoLibraryIcon
            sx={{ fontSize: 48, color: 'var(--color-accent)', mb: 2 }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: 'var(--font-size-h2)',
              fontWeight: 700,
              color: 'text.primary',
              mb: 1,
            }}
          >
            업로드된 이미지가 없습니다
          </Typography>
          <Typography
            sx={{
              fontSize: 'var(--font-size-body-sm)',
              color: 'var(--color-text-muted)',
            }}
          >
            상단의 업로드 버튼으로 이미지를 추가하세요
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
    </Box>
  );
}

export default DashboardPage;
