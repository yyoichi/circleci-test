import React, { useCallback } from 'react';
import { Todo } from '../../domain/todo';
import styles from './TodoListItem.css';

const TodoListItem = ({
  todo,
  deleteTodo
}: {
  todo: Todo;
  deleteTodo: (id: string) => void;
}) => {
  const onDeleteClick = useCallback(() => {
    deleteTodo(todo.id);
  }, [todo.id, deleteTodo]);

  return (
    <div className={styles.todoListItem} key={todo.id}>
      {todo.value}
      <button className={styles.todoDeleteButton} onClick={onDeleteClick}>
        ×
      </button>
    </div>
  );
};

export default TodoListItem;
