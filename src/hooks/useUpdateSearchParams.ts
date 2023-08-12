import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useUpdateSearchParams = (params: { key: string; value: string }[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  params.forEach(({ key, value }) => current.set(key, value));

  const search = current.toString();

  const query = search ? `?${search}` : '';

  router.push(`${pathname}${query}`);
};

export default useUpdateSearchParams;
