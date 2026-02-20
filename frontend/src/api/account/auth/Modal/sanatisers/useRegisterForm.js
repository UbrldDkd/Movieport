import { useState, useContext } from 'react';
import { registerUser } from '../../../../../api/account/registerUser';
import { AuthContext } from '../../AuthContext';
import { VALIDATORS } from './constants/validators';

export function useRegisterForm({ onClose }) {
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [checkboxes, setCheckboxes] = useState({
    over16AndTerms: false,
    acceptPrivacyPolicy: false,
    isHuman: false,
  });
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pass formData context for similarity validation on password
  const validateField = (name, value, data = formData) => {
    const validator = VALIDATORS[name];
    return validator ? validator(value, data) : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, updated),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const errors = {};
    Object.keys(VALIDATORS).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) errors[key] = err;
    });

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    if (!checkboxes.over16AndTerms)
      return setSubmitError('You must be over 16 and accept the terms of use');
    if (!checkboxes.acceptPrivacyPolicy)
      return setSubmitError('You must accept the privacy policy');
    if (!checkboxes.isHuman)
      return setSubmitError('Please confirm you are human');

    try {
      const sanitized = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        phone: formData.phone.trim(),
      };
      await registerUser(sanitized, setSubmitError, setIsLoading, setUser);
      onClose();
    } catch {
    }
  };

  return {
    formData,
    fieldErrors,
    checkboxes,
    submitError,
    isLoading,
    handleChange,
    handleBlur,
    handleCheckbox,
    handleSubmit,
  };
}
