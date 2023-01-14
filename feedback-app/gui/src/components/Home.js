import { useNavigate } from "react-router";
import {useLocation} from 'react-router-dom';
//import { getUser } from '../actions/actions'
import ActivityForm from "./ActivityForm";
import LoginForm from "./LoginForm";
import ActivityAccessForm from "./ActivityAccessForm";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let element;

  const state = location.state || null;

  let user;

  if (state == null) {
    user = null;
  }
  else {
    user = state.user || null;
  }

  let isLoggedIn = user !== null

  if (isLoggedIn) {
    const fullName = user.name;
    const role = user.role;
    const isProfessor = role === "professor"

    if (isProfessor) {
      // display activity list
      element = <ActivityForm/>
    }
    else {
      // display activity access form with the code
      element = <ActivityAccessForm/>
    }

  }
  else {
    element = <LoginForm />
  }


  return (
    <>
      <p></p>
      <br /> 
      <div>
        {element}
      </div>
      
      {/* // test
      <button
        onClick={() => {
          navigate("/activity");
        }}
      >
        Go to activity form
      </button>
      <input 
        type="text" 
        name="username"
        onChange={ (evt) => getUser(evt.target.value)}
      />    */}
      {/* <button
        onClick={() => {
          navigate("/about");
        }}
      >
        Go to about
      </button> */}
    </>
  );
};

export default Home;