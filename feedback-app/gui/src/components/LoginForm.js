import { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router";

import { login } from "../actions/actions"

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
  
    const handleSubmit = (event) => {
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

            //console.log(JSON.stringify(userRole));
            // ...
        } else {
            let errorMessage = data.message;
            //console.log(JSON.stringify(errorMessage));
            // ...
        }

      });
    }

    return (
      <>
      <form onSubmit={handleSubmit}>
      <label>Username:
      <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
      />
      </label>
        <br></br>
      <label>Password:
        <input 
          type="password" 
          name="password" 
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>
        <input type="submit" />
    </form>
    </>
    )
  }
  
  export default LoginForm