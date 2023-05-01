import { useState } from "react";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  return (
    <form
      action="#"
      onSubmit={(e) => {
        if (text !== "") {
          e.preventDefault(); // նրա համարա որ չանի Default event-ը // բրաուզերին ասում ենք որ form sumbmit չանի
          onAdd(text);
          setText("");
        } else {
          alert("The input data is empty");
        }
      }}>
      <input
        type="text"
        value={text}
        onChange={(evt) => {
          setText(evt.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

export default TodoForm;
