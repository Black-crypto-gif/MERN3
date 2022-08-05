import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

function WorkoutForm() {
    const {dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!user){
          setError('You must be logged in')
          return
        }
        const workout = {title, load, reps};
        const response = await fetch('http://localhost:4000/api/workouts/',{
            method : 'POST',
            body : JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: `${title} ${user} Has been added to the database`
          })
          setTitle('')
          setLoad('')
          setReps('')
          setEmptyFields([])
          setError(null);
          dispatch({type: 'CREATE_WORKOUT', payload: json})
            
        }
    }
  return (
    <form onSubmit={handleSubmit} className="create">
        <h3>
            Add a new workout
        </h3>
        <label htmlFor="">Excersize Title</label>
        <input type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error':''}
         />
        <label htmlFor="">Load (in Kg) :</label>
        <input type='number'
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error':''}
         />
        <label htmlFor="">Reps</label>
        <input type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error':''}
         />
         <button type="submit">Add Workout</button>
         {error && <div className="error">{error}</div> }
    </form>
  )
}

export default WorkoutForm