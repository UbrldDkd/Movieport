import { useState, useContext } from 'react';
import authApiClient from '../../auth/authApiClient';
import { AuthContext } from '../../auth/AuthContext';

export function useUpdateAvatar() {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateAvatar = async ({ avatar, croppedDataUrl }) => {
    let previousUser;

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      const hasAvatar = !!avatar && avatar !== 'custom';
      const hasImage = !!croppedDataUrl && (!avatar || avatar === 'custom');

      if (hasImage) {
        const blob = await fetch(croppedDataUrl).then((r) => r.blob());

        const file = new File([blob], 'avatar.png', {
          type: 'image/png',
        });

        formData.append('avatar_image', file);
      } else if (hasAvatar) {
        formData.append('avatar', avatar);
      }

      // Optimistic update
      setUser((prev) => {
        previousUser = prev;

        return {
          ...prev,
          avatar: hasAvatar ? avatar : null,
          avatar_image: hasImage ? croppedDataUrl : null,
          avatar_url: hasImage ? croppedDataUrl : null,
        };
      });

      const res = await authApiClient.post(
        '/accounts/profile/update_avatar/',
        formData
      );

      // Replace optimistic values with server values if returned
      setUser((prev) => ({
        ...prev,
        ...res.data,
      }));

      return res.data;
    } catch (err) {
      // Roll back on failure
      if (previousUser) {
        setUser(previousUser);
      }

      setError(err.response?.data || err.message || 'Failed to update avatar');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { updateAvatar, isLoading, error };
}
