// next-env-custom.d.ts
import { NextPage } from 'next';

declare global {
  type DynamicParams = { [key: string]: string }
  
  namespace JSX {
    interface IntrinsicAttributes {
      params?: any;
    }
  }
}

export {};