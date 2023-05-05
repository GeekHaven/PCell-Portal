import { useQuery } from 'react-query';

import { isUserAuthenticated } from '@/utils/API/auth';

export default function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: 'user',
    queryFn: isUserAuthenticated,
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });

  return { user, isLoading };
}
