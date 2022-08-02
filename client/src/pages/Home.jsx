import React from 'react'
/* import { useState } from 'react' */
import { useEffect } from 'react'
import WorkoutDtails from '../components/WorkoutDtails';
import WorkoutForm from '../components/WorkoutForm';
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

function Home() {
  const {workouts, dispatch} = useWorkoutsContext();
  /* const [workouts, setWorkouts ] = useState(null); */
  useEffect(()=>{
    const fetchWorkouts = async () =>{
      const response = await fetch('http://localhost:4000/api/workouts/');
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_WORKOUTS', payload:json})
      }
    }
    fetchWorkouts()
  },[dispatch])

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