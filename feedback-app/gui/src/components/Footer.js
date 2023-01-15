import { useNavigate } from "react-router";
import {useLocation} from 'react-router-dom';
//import { getUser } from '../actions/actions'
import ActivityForm from "./ActivityForm";
import LoginForm from "./LoginForm";

const Footer = () => {

        return (
            <>
                <div className="row bg-dark py-2 mt-2 text-light">
                    <p className="text-center w-100 p-0 m-0">&#169; Copyright; Feedback App</p>
                </div>
            </>
        );
}

export default Footer;