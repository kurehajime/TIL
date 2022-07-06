import { Counter } from './features/counter/Counter';
import './App.css';
import { useEffect, useState } from 'react';
import { CleanUp } from './CleanUp';

const App:React.FC = ()=> {
  const [status,setStatus] = useState('text');
  const [input,setInput] = useState('');
  const [counter,setCounter] = useState(0);
  const [display,setDisplay] = useState(true);

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  useEffect(()=>{
    console.log('useEffect');
    document.title = `It's ${counter}`;
  },[counter]);

  return (
    <div className="App">
      <header className="App-header">
        <h4>{status}</h4>
        <h4>{input}</h4>
        <input type='text' onChange={onChangeHandler}></input>
        <button onClick={()=>setStatus('new text')}>button</button>
        <h4>{counter}</h4>
        <button onClick={()=>setCounter(counter+1)}>increment</button>
        {display && <CleanUp></CleanUp>}
        <button onClick={()=>setDisplay(!display)}>toggle</button>
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
