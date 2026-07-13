import { useState } from 'react';
import authApiClient from '../../auth/authApiClient';

export function useUpdateAvatar() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateAvatar = async ({ avatar, croppedDataUrl }) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      const hasImage = !!croppedDataUrl;
      const hasAvatar = !!avatar && avatar !== 'custom';

      // IMAGE WINS ALWAYS
      if (hasImage) {
        const blob = await fetch(croppedDataUrl).then((r) => r.blob());

        const file = new File([blob], 'avatar.png', {
          type: 'image/png',
        });

        formData.append('avatar_image', file);
      } else if (hasAvatar) {
        formData.append('avatar', avatar);
      }

      // HARD SAFETY CHECK (prevents dual send bugs)
      const entries = [...formData.entries()];
      const hasAvatarField = entries.some((e) => e[0] === 'avatar');
      const hasImageField = entries.some((e) => e[0] === 'avatar_image');

      if (hasAvatarField && hasImageField) {
        throw new Error('Invalid payload: both avatar and avatar_image set');
      }
      console.log('FormData entries:', entries);
      const res = await authApiClient.post(
        '/accounts/profile/update_avatar/',
        formData
      );

      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message || 'Failed to update avatar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateAvatar, isLoading, error };
}
