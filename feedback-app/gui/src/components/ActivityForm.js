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
            
      <form class="row" onSubmit={handleSubmit}>

        <div className="form-group col-12">
          <label>Activity Code:</label>
          <input 
            placeholder="Activity Code"
            class="form-control"
            type="text" 
            name="code" 
            value={inputs.code || ""} 
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-12">
          <label>Description:</label>
          <input 
            placeholder="Description"
            class="form-control"
            type="text" 
            name="description" 
            value={inputs.description || ""} 
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-4">
          <label>Activity Date:</label>
          <input class="form-control"
            type="date" 
            name="date" 
            value={inputs.date || ""} 
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group col-4">
          <label>Start Time:</label>
          <input class="form-control"
            type="time" 
            name="startTime" 
            value={inputs.startTime || ""} 
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group col-4">
          <label>End Time:</label>
          <input class="form-control"
            type="time" 
            name="endTime" 
            value={inputs.endTime || ""} 
            onChange={handleChange}
          />
        </div>
        
        <div class="col-12 text-center">
          <input class="btn btn-success" type="submit" />
        </div>
    </form>
    </>
    )
  }
  
  export default ActivityForm