import { useState } from 'react';
import { useLoginUser } from '../../../../../api/account/useLoginUser';

export function useLoginForm({ onClose }) {
  const { loginUser, isLoading, error } = useLoginUser();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(formData);
    if (data) {
      setFormData({ username: '', password: '' });
      onClose();
    }
  };

  return {
    formData,
    rememberMe,
    setRememberMe,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
}
