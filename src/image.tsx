import iso from './images.json';

interface Image {
  id: string;
  name: string;
  type: string;
  cpu: number;
  ram: number;
  disk: number;
}

const IMAGES: Image[] = iso;

export type {Image};
export {IMAGES};
