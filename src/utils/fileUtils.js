import { EXTENSION_CATEGORY_MAP } from '../config/fileConfig';

/** 파일 확장자 추출 (소문자) */
export function getExtension(filename) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

/** 확장자 → 카테고리 분류 */
export function getCategory(filename) {
  const ext = getExtension(filename);
  return EXTENSION_CATEGORY_MAP[ext] ?? 'etc';
}

/** 바이트 → 읽기 쉬운 크기 문자열 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/** 날짜 → 'YYYY.MM.DD' 형식 */
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

/** 충돌 방지용 고유 파일 경로 생성 */
export function generateUniqueFilePath(originalName, folderPath = '') {
  const ext = getExtension(originalName);
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const uniqueName = ext
    ? `${timestamp}_${random}.${ext}`
    : `${timestamp}_${random}`;
  return folderPath ? `${folderPath}/${uniqueName}` : uniqueName;
}

/** 폴더 업로드 시 상대 경로에서 폴더 경로 추출 */
export function extractFolderPath(relativePath) {
  if (!relativePath) return '';
  const parts = relativePath.split('/');
  parts.pop(); // 파일명 제거
  return parts.join('/');
}
