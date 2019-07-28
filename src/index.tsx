import React, { useState, useCallback, useEffect } from 'react';
import { render } from 'react-dom';
import {Todo} from './domain/todo';
import AddTodo from './modules/AddTodo/AddTodo';
import TodoList from './modules/TodoList/TodoList';
import TodoListItem from './modules/TodoListItem/TodoListItem';
import styles from './index.css';

const generateId = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 12) +
    Math.random()
      .toString(36)
      .substring(2, 12)
  );
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback(
    (value: string) => {
      const todo = { id: generateId(), value };
      setTodos([...todos, todo]);
    },
    [todos]
  );

  const deleteTodo = useCallback((id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  const loadTodos = useCallback(() => {
    const todos = localStorage.getItem('todos');
    return JSON.parse(todos);
  }, []);

  const saveTodos = useCallback(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todosByLocalStorage = loadTodos();
    if (todosByLocalStorage) {
      setTodos(todosByLocalStorage);
    }
  }, [setTodos, loadTodos]);

  useEffect(() => {
    saveTodos();
  }, [saveTodos]);

  return (
    <div className={styles.app}>
      <AddTodo addTodo={addTodo} />
      <TodoList>
        {todos.map(todo => (
          <TodoListItem todo={todo} deleteTodo={deleteTodo} key={todo.id} />
        ))}
      </TodoList>
    </div>
  );
};

render(<App />, document.querySelector('#root'));
