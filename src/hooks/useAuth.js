import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const ERROR_MAP = {
  'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'Email not confirmed': '이메일 인증이 필요합니다. 메일함을 확인해 주세요.',
  'User already registered': '이미 가입된 이메일입니다.',
  'Password should be at least 6 characters': '비밀번호는 최소 6자 이상이어야 합니다.',
};

function localizeError(msg = '') {
  for (const [key, value] of Object.entries(ERROR_MAP)) {
    if (msg.includes(key)) return value;
  }
  return msg || '오류가 발생했습니다. 다시 시도해 주세요.';
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = useCallback(async (email, password) => {
    setIsLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(localizeError(err.message));
    setIsLoading(false);
    return !err;
  }, []);

  const signUp = useCallback(async (email, password) => {
    setIsLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signUp({ email, password });
    if (err) {
      setError(localizeError(err.message));
      setIsLoading(false);
      return false;
    }
    setIsLoading(false);
    return true;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const resetPassword = useCallback(async (email) => {
    setIsLoading(true);
    setError('');
    const { error: err } = await supabase.auth.resetPasswordForEmail(email);
    if (err) setError(localizeError(err.message));
    setIsLoading(false);
    return !err;
  }, []);

  return { signIn, signUp, signOut, resetPassword, isLoading, error, setError };
}
