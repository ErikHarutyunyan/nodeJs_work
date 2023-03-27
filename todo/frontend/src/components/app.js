import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import TodoForm from "./Todo/TodoForm";
import TodoLIst from "./Todo/TodoList";
import TodoFooter from "./Todo/TodoFooter";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [editing, setEditing] = useState(null);
  const refTodo = useRef(null);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const data = await fetch(`http://localhost:3001/todos`);
      const json = await data.json();
      if (isSubscribed) {
        setTodos(json);
      }
    };
    fetchData().catch(console.error);
    return () => (isSubscribed = false);
  }, []);

  const handleSubmit = async (todosNew) => {
    const response = await fetch("http://localhost:3001/todosAdd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todosNew),
    });
    if (response.ok) {
      const res = await response.json();
      console.log(res.mess);
    } else {
      console.error("Error todo-list");
    }
  };

  const handleEdit = async (itemEdit, option) => {
    if (option === "edit") {
      const response = await fetch("http://localhost:3001/todosEdit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemEdit),
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res.mess);
      } else {
        console.error("Error todo-list");
      }
    } else if (option === "delete") {
      const response = await fetch("http://localhost:3001/todosDelete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemEdit),
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res.mess);
      } else {
        console.error("Error todo-list");
      }
    } else if (option === "modify") {
      const response = await fetch("http://localhost:3001/todosModify", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemEdit),
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res.mess);
      } else {
        console.error("Error todo-list");
      }
    } else if (option === "deleteCompleted") {
      const response = await fetch(
        "http://localhost:3001/todosDeleteCompleted",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemEdit),
        }
      );
      if (response.ok) {
        const res = await response.json();
        console.log(res.mess);
      } else {
        console.error("Error todo-list");
      }
    }
  };

  if (!todos) {
    return (
      <div id="app">
        <main>
          <h2>Loading...</h2>
        </main>
      </div>
    );
  }
  return (
    <div id="app">
      <main>
        <>
          <TodoForm
            onAdd={(text) => {
              let idRandom = Math.random();
              setTodos([
                ...todos,
                {
                  id: idRandom,
                  text: text,
                  isCompleted: false,
                },
              ]);
              handleSubmit({
                id: idRandom,
                text: text,
                isCompleted: false,
              });
            }}
          />
          <TodoLIst
            todos={todos && todos}
            onDelete={(todo) => {
              setTodos(todos.filter((t) => t.id !== todo.id));
            }}
            onChange={(newTodo) => {
              setTodos(
                todos.map((todo) => {
                  if (todo.id === newTodo.id) {
                    return newTodo;
                  }
                  return todo;
                })
              );
              handleEdit(newTodo, "modify");
            }}
            refTodo={refTodo}
            setEditing={setEditing}
            editing={editing}
            setTodos={setTodos}
            handleEdit={handleEdit}
          />
          <TodoFooter
            todos={todos && todos}
            onClearcompleted={() => {
              let completed = todos.filter((todo) => !todo.isCompleted);
              setTodos(completed);
              handleEdit(completed, "deleteCompleted");
            }}
          />
        </>
      </main>
    </div>
  );
};

export default App;
