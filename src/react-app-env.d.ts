/// <reference types="react-scripts" />
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NONE: string;
    REACT_APP_HASH: string;
    REACT_APP_API_URI: string;
    REACT_APP_WS_URI: string;
  }
}
