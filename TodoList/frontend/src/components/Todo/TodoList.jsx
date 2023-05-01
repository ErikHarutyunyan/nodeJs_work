import TodoItem from "./TodoItem";
import { useState } from "react";

function TodoLIst({
  todos,
  onChange,
  onDelete,
  refTodo,
  setEditing,
  editing,
  setTodos,
  handleEdit,
}) {
  const [text, setText] = useState("");

  const editHandle = (id) => {
    let todoEdit = todos.map((todo) => {
      debugger
      return todo.id === id
        ? {
            ...todo,
            text: text,
          }
        : todo;
    });
    setTodos(todoEdit);
    let itemEdit = todoEdit.filter((item) => item.id === id);
    handleEdit(itemEdit[0], "edit");
  };

  return (
    <div>
      {todos?.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChange={onChange}
            onDelete={onDelete}
            refTodo={refTodo}
            setEditing={setEditing}
            editing={editing}
            setText={setText}
            editHandle={editHandle}
            handleEdit={handleEdit}
          />
        );
      })}
    </div>
  );
}

export default TodoLIst;
