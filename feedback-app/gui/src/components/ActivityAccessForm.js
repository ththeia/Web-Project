import { useNavigate } from "react-router";
import {useLocation} from 'react-router-dom';
//import { getUser } from '../actions/actions'
import ActivityForm from "./ActivityForm";
import LoginForm from "./LoginForm";
import { getAvailableActivities, getActivityByAccessCode, getProfessors, submitFeedback, getFeedback } from "../actions/actions"
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as moment from 'moment';

const ActivityAccessForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const [inputs, setInputs] = useState({});
    const [activities, setActivities] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [selectedReaction, setSelectedReaction] = useState(null);

    const state = location.state || null;
    const auth = state.user;

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
            if(responseBody.length > 0){
                setSelectedProfessor(responseBody[0].id);
            }
        });
    }, []);

    const doNothing = (e) => {
        e.preventDefault();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const checkForReaction = (activityCode, userId)=>{
        console.log(activityCode);
        dispatch(getFeedback(activityCode, userId, auth.username)).then((r)=>{
            let responseBody = r.value;
            if(responseBody != null && responseBody.length > 0){
                setSelectedReaction(responseBody[0]);
            }else{
                setSelectedReaction(null);
            }
        });
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const selectActivity = (activity) => {
        setSelectedActivity(activity);
        checkForReaction(activity.accessCode, selectedProfessor);
    }

    const selectActivityAccessCode = (e) => {
        console.log(inputs.code);
        dispatch(getActivityByAccessCode(inputs.code)).then((r)=>{
            if(!r.message || r.message != 'not found'){
                setSelectedActivity(r.value);
                checkForReaction(r.value, selectedProfessor);
            }
        });
    }

    const handleProfessorSelect = (e)=>{
        setSelectedProfessor(e.target.value);
        checkForReaction(selectedActivity.accessCode, e.target.value);
    };

    const react = (reaction) => {
        //dispatch(submitFeedback({userId: user.id, reaction: 'smile', activityId: selectActivity.id}));
        dispatch(submitFeedback({userId: selectedProfessor, authorId: auth.username, reaction: reaction, activityId: selectedActivity.id})).then(()=>{
            //refreshPage();
        });
    }

    const emotionToIcon = (emotion) => {
        switch (emotion) {
          case 'smile':
            return 'fa-face-smile';
          case 'frown':
            return 'fa-face-frown';
          case 'surprised':
            return 'fa-face-surprise';
          case 'confused':
            return 'fa-face-grin-beam-sweat';
          default:
            return null;
        }
      };

    return (
        <>
            <div className="row">
                <div className="col-12 mb-2">
                    {/*<div id="activities">
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
                                </div>*/}
                            
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <input type="text" placeholder="Access Code" name="code" value={inputs.code || ""} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="col-12 col-md-3">
                            <button className="btn btn-success w-100" onClick={selectActivityAccessCode}>Select</button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
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
                                <select className="form-control" id="professor" onChange={handleProfessorSelect} value={selectedProfessor}>
                                    {professors.map(professor => (
                                        <option key={professor.id} value={professor.id}>{professor.firstName} {professor.lastName}</option>
                                    ))}
                                </select>
                            </div>



                      
                            <div className="form-group">
                                <div className="row w-100 px-0 mx-0">

                                    <div className="col-3 px-1">
                                        <button className="w-100 btn btn-success py-3" onClick={(e)=>{
                                            e.preventDefault();
                                            react('smile');
                                        }}>
                                            <i className="fa-regular fa-face-smile reaction-button"></i>
                                        </button>
                                    </div>

                                    <div className="col-3 px-1">
                                        <button className="w-100 btn btn-success py-3" onClick={(e)=>{
                                            e.preventDefault();
                                            react('frown');
                                        }}>
                                            <i className="fa-regular fa-face-frown reaction-button"></i>
                                        </button>
                                    </div>

                                    <div className="col-3 px-1">
                                        <button className="w-100 btn btn-success py-3" onClick={(e)=>{
                                            e.preventDefault();
                                            react('surprised');
                                        }}>
                                            <i className="fa-regular fa-face-surprise reaction-button"></i>
                                        </button>
                                    </div>

                                    <div className="col-3 px-1">
                                        <button className="w-100 btn btn-success py-3" onClick={(e)=>{
                                            e.preventDefault();
                                            react('confused');
                                        }}>
                                            <i className="fa-regular fa-face-grin-beam-sweat reaction-button"></i>
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