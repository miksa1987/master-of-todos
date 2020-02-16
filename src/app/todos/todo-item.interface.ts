export interface TodoItem {
  id?: string;
  title: string;
  additional: string;
  important: boolean;
  state: string;
  userId: string;
  dateDue: Date;
}
