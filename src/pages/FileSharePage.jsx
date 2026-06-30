import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import DropZone from '../components/upload/DropZone';
import CategoryTabs from '../components/common/CategoryTabs';
import SearchSort from '../components/common/SearchSort';
import FileList from '../components/file/FileList';
import { useFileUpload } from '../hooks/useFileUpload';
import { useFileList } from '../hooks/useFileList';

function FileSharePage() {
  const {
    files, isLoading,
    category, setCategory,
    search, setSearch,
    sort, setSort,
    refresh,
    handleDownload, handleDelete,
  } = useFileList();

  const { isUploading, progress, errors, successCount, processFiles, reset } = useFileUpload(refresh);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 } }}>

      {/* 업로드 영역 */}
      <Box sx={{ mb: 4 }}>
        <DropZone
          onFiles={processFiles}
          isUploading={isUploading}
          progress={progress}
          errors={errors}
          successCount={successCount}
          onReset={reset}
        />
      </Box>

      {/* 카테고리 탭 */}
      <Box sx={{ mb: 2 }}>
        <CategoryTabs value={category} onChange={setCategory} />
      </Box>

      {/* 검색 + 정렬 + 파일 수 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 2.5,
          flexWrap: 'wrap',
        }}
      >
        <SearchSort
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
        />
        {!isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            <Typography sx={{ fontSize: 'var(--font-size-body-sm)', color: 'var(--color-text-muted)' }}>
              총
            </Typography>
            <Chip
              label={`${files.length}개`}
              size="small"
              sx={{
                bgcolor: 'var(--color-accent)',
                color: 'primary.dark',
                fontSize: 'var(--font-size-caption)',
                fontWeight: 700,
                height: 22,
              }}
            />
          </Box>
        )}
      </Box>

      {/* 파일 목록 */}
      <FileList
        files={files}
        isLoading={isLoading}
        onDownload={handleDownload}
        onDelete={handleDelete}
        search={search}
      />
    </Container>
  );
}

export default FileSharePage;
