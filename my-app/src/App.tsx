import React from 'react';
import { useState } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import BlogsPage from './components/BlogsPage';

function App() {
  const [csrfToken, setcsrfToken] = useState('');

  return (
    <main>
      {csrfToken ? (
        <BlogsPage csrfToken={csrfToken}/>
      ) : (
        <Welcome setcsrfToken={setcsrfToken}/>
      )}
    </main>
  );
}

export default App;
