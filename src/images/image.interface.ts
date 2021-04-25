export interface BaseImage {
  path: string;
  name: string;
  smallthumbnail: string;
  largethumbnail: string;
}

export interface Image extends BaseImage {
  id: number;
}
