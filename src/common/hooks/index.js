import {
  useLocation
} from "react-router-dom";
import { useRef, useEffect, useCallback } from "react";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const useMountedRef = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export const useSafeImplement = (dispatch) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  );
};