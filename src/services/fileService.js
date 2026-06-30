import { supabase, FILES_BUCKET, FILES_TABLE } from '../lib/supabase';
import { getExtension, getCategory, generateUniqueFilePath, extractFolderPath } from '../utils/fileUtils';
import { MAX_FILE_SIZE } from '../config/fileConfig';

/** 단일 파일 업로드 + DB 메타데이터 저장 */
export async function uploadFile(file, relativePath = '') {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`파일 크기가 50MB를 초과합니다: ${file.name}`);
  }

  const folderPath = relativePath ? extractFolderPath(relativePath) : '';
  const storagePath = generateUniqueFilePath(file.name, folderPath);
  const extension = getExtension(file.name);
  const category = getCategory(file.name);

  // Storage 업로드
  const { error: storageError } = await supabase.storage
    .from(FILES_BUCKET)
    .upload(storagePath, file, { upsert: false });

  if (storageError) throw new Error(`업로드 실패: ${storageError.message}`);

  // public URL 획득
  const { data: urlData } = supabase.storage
    .from(FILES_BUCKET)
    .getPublicUrl(storagePath);

  // DB 메타데이터 저장
  const { data, error: dbError } = await supabase
    .from(FILES_TABLE)
    .insert({
      file_name: storagePath.split('/').pop(),
      original_name: file.name,
      file_path: storagePath,
      file_url: urlData.publicUrl,
      file_type: file.type || 'application/octet-stream',
      file_extension: extension,
      file_size: file.size,
      category,
      folder_path: folderPath || null,
    })
    .select()
    .single();

  if (dbError) throw new Error(`메타데이터 저장 실패: ${dbError.message}`);
  return data;
}

/** 파일 목록 조회 */
export async function fetchFiles({ category = 'all', search = '', sort = 'newest' } = {}) {
  let query = supabase.from(FILES_TABLE).select('*');

  if (category !== 'all') {
    query = query.eq('category', category);
  }

  if (search.trim()) {
    query = query.ilike('original_name', `%${search.trim()}%`);
  }

  switch (sort) {
    case 'downloads':
      query = query.order('download_count', { ascending: false });
      break;
    case 'size_desc':
      query = query.order('file_size', { ascending: false });
      break;
    case 'size_asc':
      query = query.order('file_size', { ascending: true });
      break;
    case 'name':
      query = query.order('original_name', { ascending: true });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw new Error(`목록 조회 실패: ${error.message}`);
  return data ?? [];
}

/** 다운로드 카운트 증가 */
export async function incrementDownload(id) {
  const { data } = await supabase
    .from(FILES_TABLE)
    .select('download_count')
    .eq('id', id)
    .single();

  if (data) {
    await supabase
      .from(FILES_TABLE)
      .update({ download_count: (data.download_count ?? 0) + 1 })
      .eq('id', id);
  }
}

/** 파일 삭제 (Storage + DB) */
export async function deleteFile(id, filePath) {
  const { error: storageError } = await supabase.storage
    .from(FILES_BUCKET)
    .remove([filePath]);

  if (storageError) throw new Error(`Storage 삭제 실패: ${storageError.message}`);

  const { error: dbError } = await supabase
    .from(FILES_TABLE)
    .delete()
    .eq('id', id);

  if (dbError) throw new Error(`DB 삭제 실패: ${dbError.message}`);
}
