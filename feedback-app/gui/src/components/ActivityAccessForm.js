import { useNavigate } from "react-router";
import {useLocation} from 'react-router-dom';
//import { getUser } from '../actions/actions'
import ActivityForm from "./ActivityForm";
import LoginForm from "./LoginForm";
import { getAvailableActivities, getProfessors } from "../actions/actions"
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as moment from 'moment'

const ActivityAccessForm = () => {

    const dispatch = useDispatch()
    const [activities, setActivities] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const refreshActivities = ()=>{
        dispatch(getAvailableActivities())
        .then((r)=>{
            let responseBody = r.value;
            setActivities(responseBody)
        });
    }

    useEffect(()=>{
        refreshActivities();

        dispatch(getProfessors())
        .then((r)=>{
            let responseBody = r.value;
            setProfessors(responseBody)
        });
    }, []);

    const doNothing = (e) => {
        e.preventDefault();
    }

    const selectActivity = (activity) => {
        setSelectedActivity(activity);
    }

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6">
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

                                    <button className="btn btn-primary" onClick={()=>{
                                        selectActivity(activity);
                                    }}>Select</button>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    {selectedActivity && 
                        <form>
                            <div className="card mb-2" key={selectedActivity.id}>
                            <div className="card-header">
                                <a className="card-link" onClick={doNothing} href={'#activity-'+selectedActivity.id}>
                                {selectedActivity.accessCode} - {selectedActivity.description}
                                </a>
                            </div>
                            <div id={'activity-'+selectedActivity.id} className="collapse show" data-parent="#accordion">
                                <div className="card-body">
                                    <p>Start date: {moment(selectedActivity.date).format('DD/MM/YYYY hh:mm')}</p>
                                    <p>Expiry date: {moment(selectedActivity.validUntil).format('DD/MM/YYYY hh:mm')}</p>
                                </div>
                            </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="professor">Professor:</label>
                                <select className="form-control" id="professor">
                                    {professors.map(professor => (
                                        <option value={professor}>{professor.firstName} {professor.lastName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <div className="row w-100 px-0 mx-0">

                                    <div className="col-3 px-1">
                                        <button className="w-100 btn btn-success py-3">
                                            <i class="fa-regular fa-face-smile reaction-button"></i>
                                        </button>
                                    </div>

                                    <div className="col-3 px-1">
                                        <button className="w-100 btn btn-success py-3">
                                            <i class="fa-regular fa-face-frown reaction-button"></i>
                                        </button>
                                    </div>

                                    <div className="col-3 px-1">
                                        <button className="w-100 btn btn-success py-3">
                                            <i class="fa-regular fa-face-surprise reaction-button"></i>
                                        </button>
                                    </div>

                                    <div className="col-3 px-1">
                                        <button className="w-100 btn btn-success py-3">
                                            <i class="fa-regular fa-face-grin-beam-sweat reaction-button"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    }
                    {!selectedActivity && 
                    <p>No activity selected</p>}
                </div>
            </div>
        </>
    );
}

export default ActivityAccessForm;