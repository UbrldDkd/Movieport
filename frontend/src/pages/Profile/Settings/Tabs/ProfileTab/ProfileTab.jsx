import SettingsForm from './SettingsForm/SettingsForm';
import { useState, useEffect, useRef } from 'react';
import FavouritesSelection from './FavouritesSelection/FavouritesSelection';
import { getChangedFields } from './helpers/getChangedFields';
import { useSaveProfileSettings } from '../../../../../api/account/profile/settings/useSaveProfileSettings';
import { useSaveFavourites } from '../../../../../api/account/profile/settings/useSaveFavourites';

export default function ProfileTab({ profileData, favourites }) {
  const [originalProfile, setOriginalProfile] = useState(null);
  const [newProfile, setNewProfile] = useState(null);
  const [originalFavourites, setOriginalFavourites] = useState([]);
  const [newFavourites, setNewFavourites] = useState([]);
  const initialisedRef = useRef(false);

  const { updateProfile, isLoading } = useSaveProfileSettings();
  const { saveFavourites, isLoading: favLoading } = useSaveFavourites();

  // init profile
  useEffect(() => {
    if (!profileData) return;
    setNewProfile({ ...profileData });
    setOriginalProfile({ ...profileData });
  }, [profileData]);

  // init favourites
  useEffect(() => {
    if (!favourites || initialisedRef.current) return;
    initialisedRef.current = true;

    const cloned = favourites.map((item) => ({ ...item }));
    setOriginalFavourites(cloned);
    setNewFavourites(cloned);
  }, [favourites]);

  const handleProfileChange = (field, value) => {
    setNewProfile((prev) => ({ ...prev, [field]: value }));
  };

  // already computed externally (kept as-is)
  const hasFavouriteChanges =
    newFavourites.length !== originalFavourites.length ||
    newFavourites.some(
      (item, i) =>
        item.tmdb_id !== originalFavourites[i]?.tmdb_id ||
        item.favourited !== originalFavourites[i]?.favourited
    );

  const hasProfileChanges =
    JSON.stringify(newProfile) !== JSON.stringify(originalProfile);

  const hasChanges = hasFavouriteChanges || hasProfileChanges;

  const handleSave = async () => {
    if (!hasChanges || !newProfile || !profileData) return;

    try {
      if (hasProfileChanges) {
        const changes = getChangedFields(profileData, newProfile);
        if (Object.keys(changes).length) {
          await updateProfile(changes);
          setOriginalProfile({ ...newProfile });
        }
      }

      if (hasFavouriteChanges) {
        console.log('saving favourites...', newFavourites);
        await saveFavourites(newFavourites);
        setOriginalFavourites(newFavourites.map((item) => ({ ...item })));
      }
    } catch (e) {
      console.log('save failed', e);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='text-lg mb-2 font-semibold tracking-wider text-text-primary'>
        Profile
      </div>

      <div className='w-full md:flex-row sm:flex-row flex-col flex gap-3'>
        <div className='flex flex-col w-full gap-4 md:max-w-2/5'>
          <SettingsForm
            profileData={newProfile}
            onChange={handleProfileChange}
          />
        </div>

        <div className='flex flex-col w-full'>
          <FavouritesSelection
            items={newFavourites}
            setItems={setNewFavourites}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!hasChanges || isLoading || favLoading}
        className='bg-zinc-800/90 w-fit mt-4 px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'
      >
        SAVE
      </button>
    </div>
  );
}
