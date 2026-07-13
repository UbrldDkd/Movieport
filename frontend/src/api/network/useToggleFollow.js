import authApiClient from '../account/auth/authApiClient';

export function useToggleFollow(setIsFollowing) {
  const toggleFollow = async (username) => {
    // Optimistic update
    setIsFollowing((prev) => !prev);

    try {
      const { data } = await authApiClient.post(
        `/accounts/toggle_follow/${username}/`
      );
      console.log(data);
      return data;
    } catch (error) {
      // Roll back
      setIsFollowing((prev) => !prev);
      throw error;
    }
  };

  return { toggleFollow };
}
