import { useState, useEffect, useCallback } from 'react';
import { fetchFiles, incrementDownload, deleteFile } from '../services/fileService';

export function useFileList() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchFiles({ category, search, sort });
      setFiles(data);
    } finally {
      setIsLoading(false);
    }
  }, [category, search, sort]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDownload = useCallback(async (file) => {
    // 다운로드 링크 실행
    const a = document.createElement('a');
    a.href = file.file_url;
    a.download = file.original_name;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 카운트 증가 (비동기, 에러 무시)
    incrementDownload(file.id).then(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, download_count: (f.download_count ?? 0) + 1 } : f
        )
      );
    }).catch(() => {});
  }, []);

  const handleDelete = useCallback(async (id, filePath) => {
    await deleteFile(id, filePath);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return {
    files,
    isLoading,
    category, setCategory,
    search, setSearch,
    sort, setSort,
    refresh: load,
    handleDownload,
    handleDelete,
  };
}
