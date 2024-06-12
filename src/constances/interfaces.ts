export interface Topic {
  id: number;
  title: string;
  ownerId?: number;
  updatedAt: Date;
  createdAt?: Date;
}
export interface Card {
  id: number;
  front: string;
  back: string;
  reviewTime: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  topicId: number;
  ownerId: number;
  topic?:Topic;
}
export interface ChipData {
  key: number;
  label: string;
  subLable: string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'info'
    | 'success'
    | 'default'
    | 'error';
}
