import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Boshlang'ich qiymat sifatida rasmda bor mevalarni beramiz
  const [todos, setTodos] = useState([
    { id: 1, text: 'Олма', completed: false },
    { id: 2, text: 'Нок', completed: false },
    { id: 3, text: 'Ольча', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  // Yangi meva qo'shish funksiyasi
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(), // Har biriga unikal ID beriladi
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // Aynan bosilgan mevani id orqali bittadan o'chirish funksiyasi
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Checkbox holatini o'zgartirish
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        {/* Sarlavha va elementlar soni */}
        <div className="todo-header">
          <h2>Список дел</h2>
          <span className="todo-count">{todos.length}</span>
        </div>

        {/* Input va Qo'shish tugmasi */}
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            placeholder="Что нужно сделать?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="todo-input"
          />
          <button type="submit" className="todo-btn">
            Добавить
          </button>
        </form>

        {/* Mevalar ro'yxati */}
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  {todo.text}
                </span>
              </label>
              {/* O'chirish tugmasi */}
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="delete-btn"
                title="O'chirish"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="trash-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;