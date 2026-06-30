import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CATEGORIES } from '../../config/fileConfig';

/**
 * CategoryTabs 컴포넌트
 *
 * Props:
 * @param {string} value - 현재 선택된 카테고리 ID [Required]
 * @param {function} onChange - 카테고리 변경 핸들러 (newValue) [Required]
 *
 * Example usage:
 * <CategoryTabs value="all" onChange={setCategory} />
 */
function CategoryTabs({ value, onChange }) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        px: 1,
      }}
    >
      <Tabs
        value={value}
        onChange={(_, v) => onChange(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          '& .MuiTab-root': {
            fontSize: 'var(--font-size-nav)',
            fontWeight: 500,
            color: 'var(--color-text-muted)',
            minHeight: 48,
            textTransform: 'none',
            px: { xs: 1.5, md: 2.5 },
          },
          '& .Mui-selected': {
            color: 'primary.dark',
            fontWeight: 700,
          },
          '& .MuiTabs-indicator': {
            bgcolor: 'primary.dark',
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        }}
      >
        {CATEGORIES.map((cat) => (
          <Tab key={cat.id} value={cat.id} label={cat.label} disableRipple />
        ))}
      </Tabs>
    </Box>
  );
}

export default CategoryTabs;
