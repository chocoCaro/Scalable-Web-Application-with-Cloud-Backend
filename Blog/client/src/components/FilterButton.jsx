import { useState } from 'react';
import clsx from 'clsx';

export default function FilterButton({ onSuccess }) {
  const [topicsDropdown, setTopicsDropdown] = useState(false);

  const availableTopics = ['Technology', 'Programming', 'Travel', 'Health', 'Sport'];

  const handleFilter = (topic) => {
    onSuccess(topic);
    setTopicsDropdown(false);
  };

  return (
    <div className='w-[150px]'>
      <button
        onClick={() => setTopicsDropdown(!topicsDropdown)}
        className={clsx(
          'w-full h-full bg-black text-white hover:cursor-pointer hover:bg-gray-800',
          {
            'rounded-[15px]': !topicsDropdown,
            'rounded-t-[15px]': topicsDropdown,
          },
        )}
      >
        Filter topcis
      </button>

      {topicsDropdown && (
        <ul className='absolute w-[150px] h-[90px] bg-black border-t rounded-b-[15px] overflow-y-scroll'>
          {availableTopics.map((topic) => (
            <li
              key={topic}
              onClick={() => handleFilter(topic)}
              className='flex items-center justify-center h-[30px] text-white hover:cursor-pointer hover:bg-gray-800'
            >
              {topic}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
