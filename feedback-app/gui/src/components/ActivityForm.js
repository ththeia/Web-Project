import { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router";

function ActivityForm () {
    const [content, setContent] = useState('')
    const [inputs, setInputs] = useState({});
  
    const navigate = useNavigate();
    const dispatch = useDispatch()
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs);
      
    }

    return (
      <>
      {/*<button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>*/}
      <form onSubmit={handleSubmit}>
      <label>Activity Code:
      <input 
        type="text" 
        name="code" 
        value={inputs.code || ""} 
        onChange={handleChange}
      />
      </label>
        <br></br>
      <label>Description:
        <input 
          type="text" 
          name="description" 
          value={inputs.description || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>
        <label>Activity Date:
        <input 
          type="date" 
          name="date" 
          value={inputs.date || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>
        <label>Start Time:
        <input 
          type="time" 
          name="startTime" 
          value={inputs.startTime || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>
        <label>End Time:
        <input 
          type="time" 
          name="endTime" 
          value={inputs.endTime || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>
        <input type="submit" />
    </form>
    </>
    )
  }
  
  export default ActivityForm