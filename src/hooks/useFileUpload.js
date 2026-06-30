import { useState, useCallback } from 'react';
import { uploadFile } from '../services/fileService';
import { MAX_FILE_SIZE } from '../config/fileConfig';

const INITIAL_STATE = { isUploading: false, progress: [], errors: [], successCount: 0 };

export function useFileUpload(onSuccess) {
  const [state, setState] = useState(INITIAL_STATE);

  const processFiles = useCallback(async (files) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const initialProgress = fileArray.map((f) => ({
      name: f.name,
      status: 'pending',
      relativePath: f.webkitRelativePath || '',
    }));

    setState({ isUploading: true, progress: initialProgress, errors: [], successCount: 0 });

    let successCount = 0;
    const errors = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];

      // 크기 사전 검증
      if (file.size > MAX_FILE_SIZE) {
        const msg = `${file.name}: 파일 크기가 50MB를 초과합니다.`;
        errors.push(msg);
        setState((prev) => {
          const p = [...prev.progress];
          p[i] = { ...p[i], status: 'error', message: msg };
          return { ...prev, progress: p, errors: [...prev.errors, msg] };
        });
        continue;
      }

      setState((prev) => {
        const p = [...prev.progress];
        p[i] = { ...p[i], status: 'uploading' };
        return { ...prev, progress: p };
      });

      try {
        await uploadFile(file, file.webkitRelativePath || '');
        successCount++;
        setState((prev) => {
          const p = [...prev.progress];
          p[i] = { ...p[i], status: 'done' };
          return { ...prev, progress: p, successCount: prev.successCount + 1 };
        });
      } catch (err) {
        const msg = `${file.name}: ${err.message}`;
        errors.push(msg);
        setState((prev) => {
          const p = [...prev.progress];
          p[i] = { ...p[i], status: 'error', message: err.message };
          return { ...prev, progress: p, errors: [...prev.errors, msg] };
        });
      }
    }

    setState((prev) => ({ ...prev, isUploading: false }));

    if (successCount > 0 && onSuccess) onSuccess();
  }, [onSuccess]);

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return { ...state, processFiles, reset };
}
