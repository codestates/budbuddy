import { useEffect, useRef } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const queryString = require("query-string");
//리액트 컴포넌트 안에서 반복적으로 수행되는 무언가를 하고 싶을 때 쓰시면 됩니다.
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname, params) => navigate(`${pathname}?${createSearchParams(params)}`);
};
