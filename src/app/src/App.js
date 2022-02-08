import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const initFields = {
  task: '',
};

export function App() {
  const [formFields, setFormFields] = useState(initFields);
  const [list, setList] = useState([]);
  const backendURL = 'http://localhost:8000/todos/';

  useEffect(() => {
    const getList = async () => {
      try {
        const result = await axios.get(backendURL);
        console.log(result);
        if (result.status === 200) {
          setList(result.data);
        }
      } catch (err) {
        console.log('Some error occurred!', err);
      }
    };
    getList();
  }, []);

  const handleFormFields = (e) => {
    const { name } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.task.length <= 0) {
      window.alert('Task cannot be empty!');
      return;
    }
    const data = { task: formFields.task };
    axios
      .post(backendURL, data)
      .then((res) => {
        data.date = res.data.date;
        setList((prev) => [...prev, data]);
        setFormFields(initFields);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <img
        id="logo"
        src="https://adbrew.io/assets/images/v2/logo.svg"
        alt="logo"
      />
      <div className="outerBox">
        <div className="todosList">
          <h1>List of TODOs</h1>
          {list.length === 0 && <p>Nothing to do! You can enjoy!</p>}
          <ul>
            {list.map((data, index) => (
              <li key={index}>
                <span>{data.task}</span>
                <span>{data.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <form className="addTask" onSubmit={handleSubmit}>
          {/* <label htmlFor="task">ToDo: </label> */}
          <input
            type="text"
            id="task"
            name="task"
            placeholder="Write a task"
            autoComplete="off"
            onChange={handleFormFields}
            value={formFields.task}
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default App;
