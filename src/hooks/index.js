import React, { useState, useRef, useEffect } from 'react';

/*
 * @description 针对多层嵌套的 state 合并更新可用
 * @params defaultState 默认一层及以上的对象
 */
export const useLegacyState = (defaultState) => {
  let [state, setState] = useState(defaultState);

  const setLegacyState = (nextState) => {
    let newState = { ...state, ...nextState };
    setState(newState);
  };

  return [state, setLegacyState];
};

/*
 * @description 只在更新时运行的 effect
 * @params callback 执行的函数
 */
export const useOnlyUpdateEffect = (callback) => {
  let isUpdateRef = useRef(false);

  useEffect(() => {
    if (isUpdateRef.current) {
      callback && callback();
    }
    if (!isUpdateRef.current) {
      isUpdateRef.current = true;
    }
  });
};

/*
 * @description 获取上一轮的 props 或 state
 * @params value 要存储的值
 */
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}