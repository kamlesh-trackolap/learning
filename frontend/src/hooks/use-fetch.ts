/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, startTransition } from 'react';
import type { ApiResponseDataType } from '../components/common/utils/api/api.type';
import { isFunction, isNotEmptyObject } from '../components/common/utils/main-utils';

interface PayloadType {
  url: string;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

interface UseFetchPropsType {
  dontCall?: boolean;
  request: (args: PayloadType) => Promise<ApiResponseDataType>;
  payload: PayloadType;
}

interface FetchStateType {
  loading: boolean;
  data: unknown;
  message: string;
  success: boolean;
}

export function useFetch(props: UseFetchPropsType) {
  const { request, payload, dontCall = false } = props;

  const [state, setState] = useState<FetchStateType>({
    loading: false,
    data: null,
    message: '',
    success: false,
  });

  const fetchData = async () => {
    setState({
      loading: true,
      data: null,
      message: '',
      success: false,
    });

    try {
      const response = await request(payload);
      setState({
        loading: false,
        data: response.data,
        message: response.message,
        success: response.success,
      });
    } catch (error: any) {
      setState({
        loading: false,
        data: null,
        message: error?.message ?? 'Something went wrong',
        success: false,
      });
    }
  };

  useEffect(() => {
    if (dontCall || !isFunction(request) || !isNotEmptyObject(payload)) return;
    startTransition(() => {
      fetchData();
    });
  }, [dontCall, request, JSON.stringify(payload)]);

  return {
    ...state,
    refresh: fetchData,
  };
}
