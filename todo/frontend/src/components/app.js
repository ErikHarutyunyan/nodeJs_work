import { useEffect, useLayoutEffect, useState } from "preact/hooks";
import TodoForm from "./Todo/TodoForm";
import TodoLIst from "./Todo/TodoList";
import TodoFooter from "./Todo/TodoFooter";

const App = () => {
  const [todos, setTodos] = useState(null);

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

  useEffect(() => {
    handleSubmit();
  }, todos);

  const handleSubmit = async () => {
    if (todos) {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todos),
      });
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
              setTodos([
                ...todos,
                {
                  id: Math.random(),
                  text: text,
                  isCompleted: false,
                },
              ]);
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
            }}
          />
          <TodoFooter
            todos={todos && todos}
            onClearcompleted={() => {
              setTodos(todos.filter((todo) => !todo.isCompleted));
            }}
          />
        </>
      </main>
    </div>
  );
};

export default App;
