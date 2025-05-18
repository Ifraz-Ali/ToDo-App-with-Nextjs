"use client"
import React, { useEffect, useState } from "react";
import TodoList from "../components/todo";
import Header from "../components/header";
import { useRouter } from "next/navigation";
import { Todo } from "../types/UserType";

const UITodo: React.FC = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [edit, setEdit] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [filterTodo, setFilterTodo] = useState<Todo[]>([]);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const fetchTodos = async () => {
    try {
      const userId = localStorage.getItem("loginKey");
      console.log("userId====>", userId);
      if (!userId) {
        router.push("/login");
        return;
      }
      const res = await fetch(`/api/todos?userId=${userId}`);
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setTodos(data);
      setUserName(userId); // Or derive name if your API returns it
    } catch (err) {
      console.error("Failed to fetch todos", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setFilterTodo(todos);
  }, [todos]);

  const addTodo = async () => {
    if (!task.trim()) return;
    const userId = localStorage.getItem("loginKey");
    const newTodo = { userId, text: task };

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (res.ok) {
      setTask("");
      fetchTodos();
    }
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };
  const editTodo = (id: string) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    if (!todoToEdit) return;

    setIsEdit(true);
    setEdit(todoToEdit.text || "");
    setEditId(id);
  };

  const updateTodo = async () => {
    if (!editId) return;

    await fetch(`/api/todos/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: edit,
        editTime: new Date().toISOString(),
      }),
    });

    setIsEdit(false);
    setEdit("");
    setEditId(null);
    fetchTodos();
  };

  const handleComplete = async (id: string, completed: boolean, finishTime: number) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo || !todo.addTime) return;

    const start = new Date(todo.addTime).getTime();
    const duration = finishTime - start;

    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isComplete: completed,
        duration,
      }),
    });

    fetchTodos();
  };

  const getAll = () => setFilterTodo(todos);
  const getPending = () => setFilterTodo(todos.filter((todo) => !todo.isComplete));
  const getCompleted = () => setFilterTodo(todos.filter((todo) => todo.isComplete));

  const handleLogOut = async () => {
    router.push("/login");
  };

  return (
    <div className="h-screen bg-zinc-800 text-white">
      <Header userName={userName} logoutUser={handleLogOut} />

      <div className="flex justify-center items-end space-x-4">
        <div className="pt-2 h-20 w-1/2 flex items-end flex-col  max-[640px]:w-3/4">
          <label htmlFor="todo" className="text-xl text-center w-1/2 ">Enter Tasks</label>
          <input
            type="text"
            id="todo"
            value={isEdit ? edit : task}
            onChange={(e) => isEdit ? setEdit(e.target.value) : setTask(e.target.value)}
            className="rounded w-80 h-8 px-2 text-sm text-gray-950"
            placeholder="Task"
          />
        </div>

        <div className="flex gap-2 w-1/4 mb-3 items-center ">
          {isEdit ? (
            <button className="bg-blue-500  px-4 py-1 rounded" onClick={updateTodo}>Save</button>
          ) : (
            <>
              <button className="bg-blue-500  px-4 py-1 rounded" onClick={addTodo}>Add</button>
              {/* deleteAllTodo removed unless supported in API */}
            </>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center gap-4 my-4">
        <button className="bg-blue-600 px-4 py-1 rounded" onClick={getAll}>All</button>
        <button className="bg-blue-600 px-4 py-1 rounded" onClick={getPending}>Pending</button>
        <button className="bg-blue-600 px-4 py-1 rounded" onClick={getCompleted}>Completed</button>
      </div>

      <div>
        {filterTodo.length ? (
          filterTodo.map((val) => (
            <TodoList
              key={val._id}
              index={todos.findIndex((t) => t._id === val._id)}
              val={val}
              deleteTodo={() => deleteTodo(val._id)}
              editTodo={() => editTodo(val._id)}
              handleComplete={(i, completed, finishTime) => handleComplete(val._id, completed, finishTime)}
              duration={val.duration}
            />
          ))
        ) : (
          <p className="text-center mt-10">No todos yet. Add some tasks.</p>
        )}
      </div>
    </div>
  );
};

export default UITodo;
