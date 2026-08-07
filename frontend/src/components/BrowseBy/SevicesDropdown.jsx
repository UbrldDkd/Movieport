import { services } from './constants/services';
import { Link } from 'react-router-dom';
import { buildFiltersPath, isSelected } from './helpers/buildFiltersPath';
import { MdAnchor } from 'react-icons/md';

export default function ServicesDropdown({ mediaType, filters }) {
  return (
    <div>
      {services.map((service) => {
        const Icon = service.icon;
        const selected = isSelected({
          filters,
          field: 'service',
          value: service.name,
        });

        return (
          <Link
            to={buildFiltersPath({
              mediaType,
              filters,
              field: 'service',
              value: service.name,
              removeValue: selected,
            })}
            key={service.id}
            className={`flex items-center text-start w-full px-2 py-1 text-xs transition-colors ${
              selected
                ? 'text-zinc-200 bg-zinc-700'
                : 'text-zinc-800 hover:text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {Icon && <Icon className='text-lg shrink-0' />}

            <span className='whitespace-nowrap flex-1'>{service.name}</span>
            {selected && (
              <span className='ml-2 inline-flex items-center justify-center text-red-900 bg-zinc-600 rounded-xl w-5 h-5 text-xs'>
                <MdAnchor size={16} />
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
