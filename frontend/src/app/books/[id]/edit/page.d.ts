import { JSX } from 'react';

declare module "*/app/books/[id]/edit/page" {
    export interface PageProps {
      params: { id: string };
    }
    
    export default function Page(props: PageProps): JSX.Element;
}