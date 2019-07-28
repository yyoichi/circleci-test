import React, { ReactNode } from 'react';
import styles from './TodoList.css';

const TodoList = ({ children }: { children: ReactNode }) => {
  return <div className={styles.todoList}>{children}</div>;
};

export default TodoList;
