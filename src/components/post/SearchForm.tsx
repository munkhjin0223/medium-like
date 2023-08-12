'use client';

import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { FunctionComponent, useState } from 'react';

interface SearchFormProps {
  searchValue?: string;
}

const SearchForm: FunctionComponent<SearchFormProps> = (props) => {
  const [searchValue, setSearchValue] = useState(props.searchValue || '');
  const [finalSearchValue, setFinalSearchValue] = useState(props.searchValue || '');

  useUpdateSearchParams([{ key: 'searchValue', value: finalSearchValue }]);

  const onSearch = (e: any) => {
    if (e.key === 'Enter') {
      setFinalSearchValue(searchValue);
    }
  };

  return (
    <div className='relative top-2 max-w-lg'>
      <input
        aria-label='Нийтлэл хайх'
        type='text'
        onKeyUp={onSearch}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        placeholder='Нийтлэл хайх'
        className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
      />
      <svg
        className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
    </div>
  );
};

export default SearchForm;
