import { GiCaptainHatProfile } from 'react-icons/gi';
import { PRESET_AVATARS } from '../../pages/Profile/Settings/Tabs/AvatarTab/constants/presetAvatars';

const SIZE_MAP = {
  xs: {
    container: 'w-6 h-6',
    icon: 'text-sm',
  },
  sm: {
    container: 'w-9 h-9',
    icon: 'text-xl',
  },
  md: {
    container: 'w-16 h-16',
    icon: 'text-3xl',
  },
  lg: {
    container: 'w-23 h-23',
    icon: 'text-5xl',
  },
  xl: {
    container: 'w-28 h-28',
    icon: 'text-6xl',
  },
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function normalizeSrc(src) {
  if (!src) return null;

  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:')
  ) {
    return src;
  }

  if (src.startsWith('/')) {
    return `${API_BASE_URL}${src}`;
  }

  return `${API_BASE_URL}/${src}`;
}

export default function Pfp({
  user,
  avatar,
  avatarUrl,
  size = 'md',
  className = '',
  imgClassName = '',
  alt = 'Profile',
  fallbackClassName = '',
}) {
  const resolvedAvatar =
    avatar ??
    user?.avatar ??
    user?.avatar_url ??
    user?.avatarUrl ??
    user?.avatar_image ??
    user?.avatarImage ??
    avatarUrl ??
    null;

  const presetAvatar =
    typeof resolvedAvatar === 'string'
      ? PRESET_AVATARS.find(
          (preset) => preset.id === resolvedAvatar.toLowerCase()
        )
      : null;

  const src = presetAvatar ? null : normalizeSrc(resolvedAvatar);

  const sizeConfig = SIZE_MAP[size] || SIZE_MAP.md;
  const sizeScale =
    size === 'xs'
      ? 0.5
      : size === 'sm'
        ? 0.75
        : size === 'md'
          ? 1
          : size === 'lg'
            ? 1.35
            : 1.6;
  const iconSize = Math.round(34 * sizeScale);

  const PresetIcon = presetAvatar?.icon;

  return (
    <div
      className={`rounded-full border border-zinc-800 bg-zinc-800 flex items-center justify-center overflow-hidden ${sizeConfig.container} ${className}`}
    >
      {presetAvatar ? (
        <div
          className='w-full h-full flex items-center justify-center'
          style={{ background: presetAvatar.bg }}
        >
          {PresetIcon ? (
            <PresetIcon size={iconSize} color={presetAvatar.color} />
          ) : (
            <GiCaptainHatProfile
              className={`text-zinc-400 ${sizeConfig.icon}`}
            />
          )}
        </div>
      ) : src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center ${fallbackClassName}`}
        >
          <GiCaptainHatProfile className={`text-zinc-400 ${sizeConfig.icon}`} />
        </div>
      )}
    </div>
  );
}
