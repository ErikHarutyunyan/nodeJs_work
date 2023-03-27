function TodoItem({
  todo,
  onChange,
  onDelete,
  refTodo,
  setEditing,
  editing,
  setText,
  editHandle,
  handleEdit,
}) {
  return (
    <div>
      <label htmlFor="#">
        {editing === todo.id ? (
          <textarea
            style="resize: none;"
            rows="1"
            cols="50"
            onChange={(evt) => {
              setText(evt.target.value);
            }}>
            {todo.text}
          </textarea>
        ) : (
          <>
            <input
              ref={refTodo}
              type="checkbox"
              checked={todo.isCompleted}
              onChange={(e) => {
                // e.target.checked
                onChange({
                  ...todo,
                  isCompleted: e.target.checked,
                });
              }}
            />
            {todo.text}
            <button
              onClick={() => {
                onDelete(todo);
                handleEdit(todo, "delete");
              }}>
              x
            </button>
          </>
        )}

        <button
          onClick={() => {
            if (!editing) {
              setEditing(todo.id);
            } else {
              editHandle(todo.id);
              setEditing(null);
            }
          }}>
          {editing === todo.id ? "Save" : "Edit"}
        </button>
      </label>
    </div>
  );
}

export default TodoItem;
