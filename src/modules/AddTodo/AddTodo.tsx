import React, { useRef, useCallback } from 'react';
import styles from './AddTodo.css';

const AddTodo = ({ addTodo }: { addTodo: (value: string) => void }) => {
  const input = useRef<HTMLInputElement>();
  const onAddClick = useCallback(() => {
    const value = input.current.value;
    if (value) {
      addTodo(input.current.value);
      input.current.value = '';
    }
  }, [addTodo]);

  return (
    <div className={styles.addTodo}>
      <input className={styles.addTodoForm} type="text" ref={input} />
      <button className={styles.addTodoButton} onClick={onAddClick}>
        Add
      </button>
    </div>
  );
};

export default AddTodo;
