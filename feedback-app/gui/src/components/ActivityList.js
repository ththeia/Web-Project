import { useNavigate } from "react-router";
import {useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import ActivityForm from "./ActivityForm";
import LoginForm from "./LoginForm";
import { getActivities } from "../actions/actions"
import * as moment from 'moment'

const ActivityList = () => {

    const dispatch = useDispatch()
    var [activities, setActivities] =  useState([]);

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

    useEffect(() => {
        refreshActivities();
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
                        </div>
                      </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ActivityList;