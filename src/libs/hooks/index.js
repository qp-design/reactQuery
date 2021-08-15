import { useRef, useEffect } from 'react'
import {useQuery, useMutation, useQueryClient } from 'react-query'

export const useMountedRef = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true
    return () => isMounted.current = false
  }, [])

  return isMounted
}


// 文档：https://react-query.tanstack.com/reference/useQuery#_top
export const useListQuery = (params, queryKey, api) => {
  return useQuery(
    [queryKey, params],
    () => {
      const controller = new AbortController()
      const signal = controller.signal
      const promise = api(params, signal)
      // Cancel the request if React Query calls the `promise.cancel` method
      promise.cancel = () => controller.abort()
      return promise
    },
    {
      refetchOnWindowFocus: false,
      retry: false
      // keepPreviousData : true,
    }
  )
}

export const useDeleteMutation = (queryKey, api, params) => {
  return useMutation(
    ({ goodsId }) => api({goods_id: goodsId}),
    useCallBack([queryKey, params],
      (target, old) => {
        old.data = old.data?.filter(item => item.goodsId !== target.goodsId)
        return old
      }
    )
  )
}

export const useUpdateMutation = (queryKey, api, params) => {
  return useMutation(
    ({ goodsId }) => api({goods_id: goodsId}),
    useCallBack([queryKey, params],
      (target, old) => {
        old.data = old.data?.map(item => item.goodsId === target.goodsId ? { ...item, ...target } : item)
        return old
      }
    )
  )
}

const useCallBack = (queryKey, callback) => {
  const queryClient = useQueryClient()
  return {
    onMutate: async(variables) => {
      await queryClient.cancelQueries(queryKey)
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => {
        return callback(variables, old);
      });
      return { previousItems };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
    onSuccess: (data, variables, context) => queryClient.invalidateQueries(queryKey),
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  }
}
