import React from 'react';
import { NotFoundContentMsg } from './NotFoundContentMsg';

export const NotFoundContent = (value, notFoundAsyncData) => {
  let resultNotFoundAsyncData;
  if (notFoundAsyncData) {
    resultNotFoundAsyncData = notFoundAsyncData;
  } else {
    resultNotFoundAsyncData = () => {};
  }
  let isNull = false;
  let isNotFoundAsyncData = false;
  let isElse = false;
  if (value.length <= 1) {
    isNull = true;
  }
  if (notFoundAsyncData) {
    isNotFoundAsyncData = true;
  } else {
    isElse = true;
  }

  return (
    <div>
      {isNull && null}
      {isNotFoundAsyncData && <NotFoundContentMsg noFoundResult={resultNotFoundAsyncData} />}
      {isElse && <p>Sin datos que mostrar</p>}
    </div>
  );
};
