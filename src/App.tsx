import React, { useEffect, useState } from "react";
import "./App.css";
import {
  APICreateTodoRouteResponse,
  APIListTodoRouteResponse,
  Todo
} from "./server";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/v1/todos");
      const json: APIListTodoRouteResponse = await res.json();
      setTodos(json.data);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todo = { title };
    const res = await fetch("/api/v1/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json: APICreateTodoRouteResponse = await res.json();
    setTodos([...todos, json.data]);
    setTitle("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <section>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="title" style={{ display: "block" }}>
            Title
          </label>
          <input
            id="title"
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </section>
      <section>
        {(!isLoading && (
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        )) || <span>Loading...</span>}
      </section>
    </div>
  );
}

export default App;
