import { useNavigate } from "react-router";
import {useLocation} from 'react-router-dom';
//import { getUser } from '../actions/actions'
import ActivityForm from "./ActivityForm";
import LoginForm from "./LoginForm";
import { getAvailableActivities, getProfessors, submitFeedback, getFeedback } from "../actions/actions"
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as moment from 'moment'

const ActivityAccessForm = () => {

    const dispatch = useDispatch()
    const [activities, setActivities] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [selectedReaction, setSelectedReaction] = useState(null);

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

    const checkForReaction = (activityCode, userId)=>{
        dispatch(getFeedback(activityCode, userId)).then((r)=>{
            let responseBody = r.value;
            console.log(responseBody);
            if(responseBody != null && responseBody.length > 0){
                setSelectedReaction(responseBody[0]);
            }else{
                setSelectedReaction(null);
            }
        });
    };

    const selectActivity = (activity) => {
        setSelectedActivity(activity);
        checkForReaction(activity.accessCode, selectedProfessor);
    }

    const handleProfessorSelect = (e)=>{
        setSelectedProfessor(e.target.value);
        checkForReaction(selectedActivity.accessCode, e.target.value);
    };

    const react = (reaction) => {
        //dispatch(submitFeedback({userId: user.id, reaction: 'smile', activityId: selectActivity.id}));
        dispatch(submitFeedback({userId: selectedProfessor, reaction: reaction, activityId: selectedActivity.id}))
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
                                <select className="form-control" id="professor" onChange={handleProfessorSelect} value={selectedProfessor}>
                                    {professors.map(professor => (
                                        <option key={professor.id} value={professor.id}>{professor.firstName} {professor.lastName}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedReaction && 
                                <h4>You already reacted to this teacher, to this activity 
                                    <i className={'fa-regular ' + emotionToIcon(selectedReaction.reaction)}></i>
                                </h4>
                            }

                            {!selectedReaction &&
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
                            }
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