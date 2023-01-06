import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";


function App() {
  const [counts, setCounts] = useState([]);
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:4000/getCounts").then((res) => {
      setCounts(res.data)
    }) 
  // eslint-disable-next-line
  }, []);

  const addCount = () => {
    Axios.post("http://localhost:4000/addCount", { 
      currentCount
    }).then((res) => {
      setCounts([
        ...counts,
        {
          currentCount
        }
      ])
    });
  };

  const increment = (id, currentCount) => {
    console.log(id, currentCount)
    const newCount = Number(currentCount + 1);
    Axios.put("http://localhost:4000/updateCount", { 
      id: id,
      newCount: newCount,
    });
  };

  const decrement = (id, currentCount) => {
    console.log(id, currentCount)
    const newCount = Number(currentCount - 1);
    Axios.put("http://localhost:4000/updateCount", { 
      id: id,
      newCount: newCount,
    });
  };

  const reset = (id) => {
    console.log(id, currentCount)
    const newCount = Number(0);
    Axios.put("http://localhost:4000/updateCount", { 
      id: id,
      newCount: newCount,
    });
  };

  return (
    <div className="App">
      <h1>Challenge 1</h1>
      <h1>Counts</h1>
      <div className="countsDisplay">
        {counts.map((count) => {
          return (
            <>
              <h3>{count.currentCount}</h3>
              <button onClick={() => increment(count._id, count.currentCount)}>Increase</button>
              <button onClick={() => decrement(count._id, count.currentCount)}>Decrease</button>
              <button onClick={() => reset(count._id)}>Reset</button>
            </>
          );
        })}
      </div>
      <br></br>
      <div>
        <input type="number" 
          placeholder="Counter"
          onChange={(event) => {
            setCurrentCount(event.target.value);
          }}
        />
        <button onClick={addCount}>Add Count</button>
      </div>
    </div>
  );
}

export default App;
