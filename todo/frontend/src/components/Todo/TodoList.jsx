import TodoItem from "./TodoItem";

function TodoLIst({ todos, onChange, onDelete }) {
  return (
    <div>
      {todos?.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChange={onChange}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export default TodoLIst;
