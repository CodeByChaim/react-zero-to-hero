
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Action =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: number }
  | { type: "REMOVE"; payload: number };