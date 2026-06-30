/** 최대 업로드 파일 크기 (50MB) */
export const MAX_FILE_SIZE = 52428800;

/** 카테고리 정의 */
export const CATEGORIES = [
  { id: 'all',    label: '전체보기' },
  { id: 'doc',    label: '문서' },
  { id: 'image',  label: '이미지' },
  { id: 'zip',    label: '압축파일' },
  { id: 'video',  label: '영상' },
  { id: 'etc',    label: '기타' },
];

/** 확장자 → 카테고리 매핑 */
export const EXTENSION_CATEGORY_MAP = {
  pdf: 'doc', doc: 'doc', docx: 'doc', hwp: 'doc', hwpx: 'doc',
  txt: 'doc', csv: 'doc', xls: 'doc', xlsx: 'doc', ppt: 'doc', pptx: 'doc',
  odt: 'doc', ods: 'doc', odp: 'doc',

  jpg: 'image', jpeg: 'image', png: 'image', gif: 'image',
  webp: 'image', svg: 'image', bmp: 'image', ico: 'image', tiff: 'image',

  zip: 'zip', rar: 'zip', '7z': 'zip', tar: 'zip', gz: 'zip',
  bz2: 'zip', xz: 'zip',

  mp4: 'video', mov: 'video', avi: 'video', webm: 'video',
  mkv: 'video', wmv: 'video', flv: 'video', m4v: 'video',
};

/** 정렬 옵션 */
export const SORT_OPTIONS = [
  { value: 'newest',    label: '최신순' },
  { value: 'downloads', label: '다운로드 많은 순' },
  { value: 'size_desc', label: '파일 크기 큰 순' },
  { value: 'size_asc',  label: '파일 크기 작은 순' },
  { value: 'name',      label: '이름순' },
];
