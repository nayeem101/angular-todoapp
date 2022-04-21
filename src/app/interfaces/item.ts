export interface Item {
  id?: number;
  title: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
