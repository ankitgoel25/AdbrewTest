import './App.css';
import logo from './logo.svg';


export function App() {
  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        <li>Learn Docker</li>
        <li>Learn React</li>
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form>
          <div>
            <label for="todo">ToDo: </label>
            <input type="text" />
          </div>
          <div style={{"marginTop": "5px"}}>
            <button>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
