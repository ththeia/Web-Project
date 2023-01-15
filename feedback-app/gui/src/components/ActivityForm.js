import { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import ActivityList from './ActivityList'
import { submitActivity } from "../actions/actions"

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

    function refreshPage() {
      window.location.reload(false);
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      document.getElementById("create-activity-form").reset();

      dispatch(submitActivity(inputs))
      .then((r) => {
        let responseBody = r.value;
        let statusCode = responseBody.status;
        let data = responseBody.data;
        refreshPage();
      });
    }

    return (
      <>
        <div className="row">

          <div className="col-12 col-md-6">
            <ActivityList/>
          </div>

          <div className="col-12 col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Add Activity</h3>
              </div>

              <div className="card-body">
                <form className="row" id="create-activity-form" onSubmit={handleSubmit}>

                  <div className="form-group col-12 col-md-6">
                    <label>Activity Code:</label>
                    <input 
                      placeholder="Activity Code"
                      className="form-control"
                      type="text" 
                      name="accessCode" 
                      value={inputs.accessCode || ""} 
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-12 col-md-6">
                    <label>Description:</label>
                    <input 
                      placeholder="Description"
                      className="form-control"
                      type="text" 
                      name="description" 
                      value={inputs.description || ""} 
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-12 col-md-6">
                    <label>Start Time:</label>
                    <input className="form-control"
                      type="datetime-local" 
                      name="date" 
                      value={inputs.date || ""} 
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-12 col-md-6">
                    <label>End Time:</label>
                    <input className="form-control"
                      type="datetime-local" 
                      name="validUntil" 
                      value={inputs.validUntil || ""} 
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="col-12 text-center">
                    <input className="btn btn-success" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default ActivityForm