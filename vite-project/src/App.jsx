import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Sahifa yuklanganda localStorage'dan ma'lumotni o'qiydi, agar u bo'sh bo'lsa, mutlaqo bo'sh massiv [] qaytaradi
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('my-fruits-list');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [inputValue, setInputValue] = useState('');

  // Har safar meva qo'shilganda yoki o'chirilganda ro'yxatni localStorage'ga saqlab boradi
  useEffect(() => {
    localStorage.setItem('my-fruits-list', JSON.stringify(todos));
  }, [todos]);

  // Yangi meva qo'shish
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // Bittadan o'chirish
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Checkbox holati
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <div className="bg-blur-circle circle-1"></div>
      <div className="bg-blur-circle circle-2"></div>

      <div className="todo-card">
        <div className="todo-header">
          <h2>Список дел</h2>
          <span className="todo-count">{todos.length} ta meva</span>
        </div>

        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            placeholder="Meva nomini kiriting..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="todo-input"
          />
          <button 
            type="submit" 
            className="todo-btn"
            disabled={!inputValue.trim()}
          >
            <span>Qo'shish</span>
          </button>
        </form>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-msg">Hozircha mevalar yo'q 🍉</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
                <label className="todo-label">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                      className="todo-checkbox"
                    />
                    <div className="custom-checkmark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <span className="todo-text">{todo.text}</span>
                </label>
                
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="delete-btn"
                  title="O'chirish"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;