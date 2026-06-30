import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { SORT_OPTIONS } from '../../config/fileConfig';

/**
 * SearchSort 컴포넌트
 *
 * Props:
 * @param {string} search - 검색어 [Required]
 * @param {function} onSearch - 검색어 변경 핸들러 [Required]
 * @param {string} sort - 정렬 기준 [Required]
 * @param {function} onSort - 정렬 변경 핸들러 [Required]
 *
 * Example usage:
 * <SearchSort search={search} onSearch={setSearch} sort={sort} onSort={setSort} />
 */
function SearchSort({ search, onSearch, sort, onSort }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
      {/* 검색 입력 */}
      <Box
        sx={{
          flex: 1,
          minWidth: 200,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-card)',
          px: 1.5,
          py: 0.75,
          gap: 1,
        }}
      >
        <SearchIcon sx={{ fontSize: 'var(--icon-size)', color: 'var(--color-text-muted)', flexShrink: 0 }} />
        <InputBase
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="파일명으로 검색..."
          sx={{
            flex: 1,
            fontSize: 'var(--font-size-body)',
            color: 'text.primary',
            '& input::placeholder': { color: 'var(--color-text-muted)' },
          }}
        />
      </Box>

      {/* 정렬 드롭다운 */}
      <Select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        size="small"
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-body)',
          color: 'text.primary',
          minWidth: 160,
          boxShadow: 'var(--shadow-card)',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid var(--color-accent)' },
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 'var(--font-size-body)' }}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default SearchSort;
