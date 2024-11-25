import { useSearchParams } from 'next/navigation';

const useUpdateSearchParams = (params: { key: string; value: string }[]) => {
  const searchParams = useSearchParams();

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  params.forEach(({ key, value }) => {
    if (value) current.set(key, value);
    else current.delete(key);
  });

  const searchValue = current.toString();

  return { searchValue };
};

export default useUpdateSearchParams;
