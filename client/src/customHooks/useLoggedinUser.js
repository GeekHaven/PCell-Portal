import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { isUserAuthenticated } from '@/utils/API/auth';

export default function useLoggedinUser() {
  // const router = useRouter();
  const { data: user, isLoading } = useQuery({
    queryKey: 'user',
    queryFn: isUserAuthenticated,
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });
  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [isLoading, user]);

  return { user, isLoading };
}
