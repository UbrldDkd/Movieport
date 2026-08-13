import { useState, useContext } from 'react';
import authApiClient from '../../auth/authApiClient';
import { AuthContext } from '../../auth/AuthContext';
import { supabase } from '../../../../lib/supabase';

export function useUpdateAvatar() {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateAvatar = async ({ avatar, croppedDataUrl }) => {
    let previousUser;

    try {
      setLoading(true);
      setError(null);

      const hasAvatar = !!avatar && avatar !== 'custom';
      const hasImage = !!croppedDataUrl && (!avatar || avatar === 'custom');

      let avatarUrl = null;

      // If user selected a preset avatar, just send avatar key to backend
      if (hasAvatar) {
        const res = await authApiClient.post(
          '/accounts/profile/update_avatar/',
          { avatar }
        );
        setUser((prev) => ({ ...prev, ...res.data }));
        return res.data;
      }

      if (!hasImage) {
        throw new Error('No avatar selected');
      }

      // Convert cropped image to blob and upload to Supabase
      const blob = await fetch(croppedDataUrl).then((r) => r.blob());
      const fileName = `avatar-${crypto.randomUUID()}.png`;

      const bucket = import.meta.env.VITE_SUPABASE_BUCKET || 'avatars';

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, blob, { contentType: 'image/png', upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      avatarUrl = data?.publicUrl || data?.publicURL || data?.public_url;

      if (!avatarUrl) {
        // fallback to constructed URL
        avatarUrl = `${import.meta.env.VITE_SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${fileName}`;
      }

      // Optimistic update with final URL
      setUser((prev) => {
        previousUser = prev;
        return {
          ...prev,
          avatar: null,
          avatar_image: avatarUrl,
          avatar_url: avatarUrl,
        };
      });

      const res = await authApiClient.post('/accounts/profile/update_avatar/', {
        avatar_image: avatarUrl,
      });

      // Replace optimistic values with server values if returned
      setUser((prev) => ({ ...prev, ...res.data }));

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
