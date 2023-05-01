export default function TodoFooter({ todos, onClearcompleted }) {
  const completedSize = todos?.filter((todo) => todo.isCompleted).length;
  return (
    <div>
      <span>
        {completedSize}/{todos?.length} Completed
      </span>
      <button onClick={onClearcompleted}>Clear Completed</button>
    </div>
  );
}
