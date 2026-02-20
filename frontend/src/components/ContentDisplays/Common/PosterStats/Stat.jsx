// React
import { useState } from 'react';

// Utils helpers
import { formatNumber } from '../../../../utils/helpers/formatNumber';

// Utils ui
import { Tooltip } from '../../../Common/Tooltip';

export default function Stat({ icon: Icon, value, label, view }) {
  const [hover, setHover] = useState(false);

  if (!value) return null;

  return (
    <Tooltip label={label}>
      <div className='relative flex flex-col sm:flex-col md:flex-col lg:flex-row items-center gap-0.25 text-xs font-semibold text-zinc-400 hover:text-zinc-300 transition cursor-default'>
        <Icon className='w-3 h-3 sm:w-4 sm:h-4  ' />
        <span>{formatNumber(value)}</span>
      </div>
    </Tooltip>
  );
}
