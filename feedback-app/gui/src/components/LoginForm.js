import { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import { login, register } from "../actions/actions"

function LoginForm () {
    const [content, setContent] = useState('')
    const [inputs, setInputs] = useState({});
  
    const navigate = useNavigate();
    const dispatch = useDispatch()
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleLoginSubmit = (event) => {
      event.preventDefault();
      //console.log(inputs);
      dispatch(login(inputs))
      .then((r) => {
        let responseBody = r.value;
        let statusCode = responseBody.status;
        let data = responseBody.data;

        if (statusCode === 200) {
            let fullName = data.firstName + " " + data.lastName;
            let userName = data.username;
            let userRole = data.role;

            navigate("/", {state: {user: {
                name: fullName,
                username: userName,
                role: userRole,
            }}})
        } else {
            let errorMessage = data.message;
        }

      });
    }

    function refreshPage() {
      window.location.reload(false);
    }

    const handleRegisterSubmit = (event) => {
      event.preventDefault();
      //console.log(inputs);
      dispatch(register(inputs))
      .then((r) => {
        let responseBody = r.value;
        console.log(responseBody);
        let statusCode = responseBody.status;
        let data = responseBody.data;

        refreshPage();
      });
    };

    return (
      <>
      <div className="row">
        <div className="col-12 col-md-6">
          <form className="card" onSubmit={handleLoginSubmit}>
            <div className="card-header text-center">
              <h3>Login</h3>
            </div>

            <div className="card-body">

              <div className="form-group">
                <label>Username:</label>
                <input className="form-control"
                  type="text" placeholder="username"
                  name="username" 
                  value={inputs.username || ""} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Password:</label>
                <input className="form-control"
                  type="password"  placeholder="password"
                  name="password" 
                  value={inputs.password || ""} 
                  onChange={handleChange}
                />
              </div>

              <input type="submit" value="Login" className="btn btn-success"/>
            </div>

          </form>
        </div>

        <div className="col-12 col-md-6">
          <form className="card" autoComplete="false" onSubmit={handleRegisterSubmit}>
          <div className="card-header text-center">
              <h3>Sign In</h3>
            </div>

            <div className="card-body">

              <div className="form-group">
                <label>First Name:</label>
                <input className="form-control"
                  type="text"  placeholder="first name"
                  name="firstName" 
                  value={inputs.firstName || ""} 
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name:</label>
                <input className="form-control"
                  type="text"  placeholder="last name"
                  name="lastName" 
                  value={inputs.lastName || ""} 
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Username:</label>
                <input className="form-control" autoComplete="false"
                  type="text"  placeholder="username"
                  name="username" 
                  value={inputs.username || ""} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Password:</label>
                <input className="form-control" autoComplete="false"
                  type="password"  placeholder="password"
                  name="password" 
                  value={inputs.password || ""} 
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="role" value="student" onChange={handleChange} checked />Student
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="radio" className="form-check-input" name="role" value="professor" onChange={handleChange} />Professor
                  </label>
                </div>
              </div>

              <input type="submit" value="Sign In" className="btn btn-success"/>
            </div>
          </form>
        </div>
      </div>
    </>
    )
  }
  
  export default LoginForm