import { useState, useEffect } from 'react';
import type { ApiResponseDataType } from '../components/common/utils/api/api.type';
import { isFunction, isNotEmptyObject } from '../components/common/utils/main-utils';

interface PayloadType {
  url: string;
  params?: Record<string, unknown>;
}
interface UseFetchPropsType {
  dontCall?: boolean;
  request: (args: PayloadType) => {};
  payload: PayloadType;
}
interface FetchStateType {
  loading: boolean;
  data: unknown;
  message: string;
};
export function useFetch(props: UseFetchPropsType) {
  const { request, payload, dontCall = false } = props;
  const [state, setState] = useState<FetchStateType>({
    loading: false,
    data: null,
    message: ''
  });

  const fetchData = async () => {
    setState({ loading: true, data: null, message: '' });
    try {
      const response = await request(payload) as ApiResponseDataType;
      setState({ loading: false, data: response?.data, message: response?.message });
    } catch (error: any) {
      setState({ loading: false, data: null, message: error?.message });
    }

  }

  useEffect(() => {
    if (dontCall || !isFunction(request) || !isNotEmptyObject(payload)) return;
    fetchData();
    return () => setState({ loading: false, data: null, message: '' });
  }, [dontCall, request, JSON.stringify(payload)]);

  return {
    ...state,
    refresh: fetchData,
  };
}
