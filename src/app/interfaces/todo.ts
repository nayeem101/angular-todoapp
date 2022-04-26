export interface Todo {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dateTime: Date; //expires in
  createdAt: Date;
  updatedAt?: Date;
}
