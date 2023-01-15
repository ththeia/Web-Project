import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router";

const Menu = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || null;
    

    let user;
  
    if (state == null) {
      user = null;
    }
    else {
      user = state.user || null;
    }  
    let isLoggedIn = user !== null


    const logout = (event) => {
        event.preventDefault();
  
        navigate("/", {state: null});
      }

    return (
        <>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="/">Feedback App</a>
            
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    {user && <a className="nav-link" onClick={logout}>Logout</a>}
                </li>
            </ul>

        </nav>
        </>
      );
    
}

export default Menu
