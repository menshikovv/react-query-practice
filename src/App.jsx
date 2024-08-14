import './App.css';
import { useState } from 'react';
import Form from './components/Form/Form';
import Post from './components/Post/Post';

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <>
      {isFormSubmitted ? (
        <Post />
      ) : (
        <Form onFormSubmit={() => setIsFormSubmitted(true)} />
      )}
    </>
  );
}

export default App;
