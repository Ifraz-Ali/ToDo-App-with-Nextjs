export type UserType = {
    id: string;
    userName: string;
    email: string;
    password: string;
    gender: string;
}
export type Todo = {
  _id: string;
  text: string | undefined;
  addTime?: string;
  isComplete: boolean;
  duration?: number;
  editTime?: string;
}
// ... existing code ...