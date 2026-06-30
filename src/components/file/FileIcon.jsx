import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import ArticleIcon from '@mui/icons-material/Article';
import TableChartIcon from '@mui/icons-material/TableChart';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CodeIcon from '@mui/icons-material/Code';

const EXT_ICON_MAP = {
  pdf:  { Icon: PictureAsPdfIcon, color: '#F44336' },
  doc:  { Icon: ArticleIcon,      color: '#1565C0' },
  docx: { Icon: ArticleIcon,      color: '#1565C0' },
  hwp:  { Icon: ArticleIcon,      color: '#1A73E8' },
  hwpx: { Icon: ArticleIcon,      color: '#1A73E8' },
  txt:  { Icon: ArticleIcon,      color: '#607D8B' },
  xls:  { Icon: TableChartIcon,   color: '#2E7D32' },
  xlsx: { Icon: TableChartIcon,   color: '#2E7D32' },
  csv:  { Icon: TableChartIcon,   color: '#388E3C' },
  ppt:  { Icon: SlideshowIcon,    color: '#E64A19' },
  pptx: { Icon: SlideshowIcon,    color: '#E64A19' },
  jpg:  { Icon: ImageIcon,        color: '#FF8F00' },
  jpeg: { Icon: ImageIcon,        color: '#FF8F00' },
  png:  { Icon: ImageIcon,        color: '#F57C00' },
  gif:  { Icon: ImageIcon,        color: '#FB8C00' },
  webp: { Icon: ImageIcon,        color: '#FFA000' },
  svg:  { Icon: ImageIcon,        color: '#E65100' },
  zip:  { Icon: FolderZipIcon,    color: '#6D4C41' },
  rar:  { Icon: FolderZipIcon,    color: '#5D4037' },
  '7z': { Icon: FolderZipIcon,    color: '#4E342E' },
  tar:  { Icon: FolderZipIcon,    color: '#795548' },
  gz:   { Icon: FolderZipIcon,    color: '#8D6E63' },
  mp4:  { Icon: VideoFileIcon,    color: '#7B1FA2' },
  mov:  { Icon: VideoFileIcon,    color: '#6A1B9A' },
  avi:  { Icon: VideoFileIcon,    color: '#7B1FA2' },
  webm: { Icon: VideoFileIcon,    color: '#8E24AA' },
  mkv:  { Icon: VideoFileIcon,    color: '#9C27B0' },
  mp3:  { Icon: AudioFileIcon,    color: '#00838F' },
  wav:  { Icon: AudioFileIcon,    color: '#006064' },
  js:   { Icon: CodeIcon,         color: '#F9A825' },
  ts:   { Icon: CodeIcon,         color: '#1565C0' },
  py:   { Icon: CodeIcon,         color: '#1976D2' },
};

/**
 * FileIcon 컴포넌트
 *
 * Props:
 * @param {string} extension - 파일 확장자 (소문자) [Required]
 * @param {number} size - 아이콘 크기 (px) [Optional, 기본값: 36]
 *
 * Example usage:
 * <FileIcon extension="pdf" size={40} />
 */
function FileIcon({ extension = '', size = 36 }) {
  const mapping = EXT_ICON_MAP[extension.toLowerCase()] ?? { Icon: InsertDriveFileIcon, color: '#546E7A' };
  const { Icon, color } = mapping;
  return <Icon sx={{ fontSize: size, color }} />;
}

export default FileIcon;
