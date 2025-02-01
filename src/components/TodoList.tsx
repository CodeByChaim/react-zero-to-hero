import React, { useReducer, useRef } from 'react';
import { Action, Todo } from '../types/type';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * The reducer function takes the current state and an action and returns the new state.
 * Each case modifies the state immutably (never directly modifying state).
 * This helps React detect changes efficiently and re-render only when needed.
 */
const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  // state: Holds the current list of todos.
  // dispatch: A function used to send actions to the reducer.
  // todoReducer: The function that determines how state changes based on actions.
  const [state, dispatch] = useReducer(todoReducer, todos);

  // inputRef holds a reference to the input field. <HTMLInputElement> ensures TypeScript knows the reference type
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (inputRef.current && inputRef.current.value.trim()) {
      // This tells the reducer to add a new todo. The reducer updates state, and React re-renders the UI.
      dispatch({ type: 'ADD', payload: inputRef.current.value });
      inputRef.current.value = ''; // Clear input
    }
  };

  return (
    <div>
      {/* This assigns inputRef to the <input> field. Now, inputRef.current will point to the actual input element. */}
      <input ref={inputRef} type={'text'} placeholder={'Enter a todo...'} />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {state.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {todo.text}
              <div>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
                >
                  ✓
                </button>
                <button
                  onClick={() => dispatch({ type: 'REMOVE', payload: todo.id })}
                >
                  ✗
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
