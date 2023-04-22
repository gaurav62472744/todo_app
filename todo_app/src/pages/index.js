import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const newTodos = [...todos];
      newTodos[editIndex] = editValue;
      setTodos(newTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo("");
    setEditValue("");
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <form onSubmit={handleSubmit} className="flex items-center mb-4">
        <input
          type="text"
          value={editIndex !== null ? editValue : newTodo}
          onChange={(e) =>
            editIndex !== null
              ? setEditValue(e.target.value)
              : setNewTodo(e.target.value)
          }
          placeholder="Add a new todo"
          className="rounded-l-lg p-4 w-full border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        />
        <button
          type="submit"
          className={`px-8 rounded-r-lg ${
            editIndex !== null ? "bg-blue-500" : "bg-green-500"
          } text-white font-bold p-4 uppercase border-t border-b border-r ${
            editIndex !== null ? "border-blue-500" : "border-green-500"
          }`}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>
      {todos.map((todo, index) => (
        <div key={index} className="flex items-center mb-4">
          <p
            className={`rounded-l-lg p-4 w-full border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white ${
              editIndex === index ? "bg-yellow-100" : ""
            }`}
          >
            {editIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full"
              />
            ) : (
              todo
            )}
          </p>
          {editIndex !== index && (
            <>
              <button
                onClick={() => handleEdit(index)}
                className="px-8 bg-yellow-500 text-white font-bold p-4 uppercase border-yellow-500 border-t border-b border-r"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-8 rounded-r-lg bg-red-500 text-white font-bold p-4 uppercase border-red-500 border-t border-b border-r"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
