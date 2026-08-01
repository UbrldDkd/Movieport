import { services } from './constants/services';
import { Link } from 'react-router-dom';

export default function ServicesDropdown({ mediaType }) {
  return (
    <div>
      {services.map((service) => {
        const Icon = service.icon;

        return (
          <Link
            to={`/${mediaType}/service/${service.name}`}
            key={service.id}
            className='
              flex
              items-center
              text-start
              cursor-pointer
              w-full
              px-2
              py-1
              text-xs
              text-zinc-800
              hover:text-zinc-300
              hover:bg-zinc-700
            '
          >
            {Icon && <Icon className='text-lg shrink-0' />}

            <span className='whitespace-nowrap'>{service.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
