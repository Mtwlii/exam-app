
import { diplomaListQueryOptions } from '../diploma.option';
import { useQuery } from '@tanstack/react-query';

export default function useDiploma( searchParams: URLSearchParams   ) {
  return  useQuery(diplomaListQueryOptions(searchParams));
}

