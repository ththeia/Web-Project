import { useNavigate } from "react-router";
import {useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import ActivityForm from "./ActivityForm";
import LoginForm from "./LoginForm";
import { getActivities, getFeedbackReaction } from "../actions/actions"
import * as moment from 'moment'

const ActivityList = ({user}) => {

    const dispatch = useDispatch()
    var [activities, setActivities] =  useState([]);
    var [reactions, setReactions] = useState([]);

    //const auth = this.props.dataFromParent;
    const [auth, setAuth] = useState(null);

    const refreshActivities = ()=>{
        dispatch(getActivities())
        .then((r)=>{
            let responseBody = r.value;

            setActivities(responseBody);
            console.log(activities);
            let statusCode = responseBody.status;
            let data = responseBody.data;
        });
    }

    const doNothing = (e) => {
        e.preventDefault();
    }

    const revealReaction = (activity) => {
        dispatch(getFeedbackReaction(activity.accessCode, user.username)).then((r)=>{
            let responseBody = r.value;
            console.log(responseBody);
            let tempData = reactions.slice();

            let responseObj = {
                smile: 0,
                frown: 0,
                surprised: 0,
                confused: 0
            }

            for(var i = 0; i < responseBody.length; i++){
                responseObj[responseBody[i].reaction] = responseBody[i].count;
            }

            tempData[activity.id] = responseObj;
            setReactions(tempData);
            console.log(tempData[activity.id]);
        });
    }

    useEffect(() => {
        refreshActivities();
        setAuth(user);
    }, []);

    return (
        <>
            <div id="activities">
                {activities.map(activity => (
                    <div className="card mb-2" key={activity.id}>
                      <div className="card-header">
                        <a className="card-link" onClick={doNothing} href={'#activity-'+activity.id}>
                          {activity.accessCode} - {activity.description}
                        </a>
                      </div>
                      <div id={'activity-'+activity.id} className="collapse show" data-parent="#accordion">
                        <div className="card-body">
                            <p>Start date: {moment(activity.date).format('DD/MM/YYYY hh:mm')}</p>
                            <p>Expiry date: {moment(activity.validUntil).format('DD/MM/YYYY hh:mm')}</p>

                            {
                                reactions[activity.id] &&
                                <div className="row">
                                    <div className="col-3 reaction-button text-center">
                                        <i className="fa-regular fa-face-smile"></i> ({reactions[activity.id].smile})
                                    </div>

                                    <div className="col-3 reaction-button text-center">
                                        <i className="fa-regular fa-face-frown"></i> ({reactions[activity.id].frown})
                                    </div>

                                    <div className="col-3 reaction-button text-center">
                                        <i className="fa-regular fa-face-surprise"></i> ({reactions[activity.id].surprised})
                                    </div>

                                    <div className="col-3 reaction-button text-center">
                                        <i className="fa-regular fa-face-grin-beam-sweat"></i> ({reactions[activity.id].confused})
                                    </div>
                                </div>
                            }

                            {
                                !reactions[activity.id] &&
                                <div className="row">
                                    <button className="btn btn-success col-12 col-md-4 offset-md-4" onClick={()=>{
                                        revealReaction(activity)
                                    }}>Reveal reaction</button>
                                </div>
                            }
                        </div>
                      </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ActivityList;