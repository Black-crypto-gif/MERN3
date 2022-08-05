import React from 'react'
/* import { useState } from 'react' */
import { useEffect } from 'react'
import WorkoutDtails from '../components/WorkoutDtails';
import WorkoutForm from '../components/WorkoutForm';
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

function Home() {
  const {workouts, dispatch} = useWorkoutsContext();
  /* const [workouts, setWorkouts ] = useState(null); */
  const { user } = useAuthContext()
  useEffect(()=>{
    const fetchWorkouts = async () =>{
      const response = await fetch('http://localhost:4000/api/workouts/',{
        headers:{
          'Authorization' : `Bearer ${user.token}`
        }
      });
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_WORKOUTS', payload:json})
      }
    }
      if(user){
        fetchWorkouts();
      }
  },[dispatch, user])

  return (
    <div className="home">
        <div className="workouts">
          {workouts && workouts.map((workout) =>(
             <WorkoutDtails 
             key={workout._id}
             workout={workout}
            />
          ))}
        </div>
        <WorkoutForm />
    </div>
  )
}

export default Home