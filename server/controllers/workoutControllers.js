const Workout = require('../models/Workoutmodel');
const colors = require('colors');


// Get all workouts :
const GetWorkouts = async (req, res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1});
    console.log('SUCCESS'.bgYellow);
    console.table(workouts);
    res.status(200).json(workouts);
}

// Get A Single workout:
const GetSingleWorkout = async (req, res) =>{
    const {id} = req.params;
    const workout = await Workout.findOne({ _id: id });
    console.log('SUCCESS'.bgYellow);
    if(!workout){
        return res.status(404).json({error: "Workout not found"});
    }

    res.status(200).json(workout);
}

//create new workout :
const CreateWorkout = async (req, res) =>{
    const { title, load, reps} = req.body;

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

    // add doc to db
    try {
        const workoutes = await Workout.create(req.body);
        console.log(workoutes.createdAt);
        console.log('SUCCESS'.bgYellow);
        res.status(200).json(workoutes);
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// delete a workouts :
const DeleteWorkout = async (req, res) =>{
    const { id } = req.params;
    try {
        const workoutes = await Workout.findOneAndDelete({ _id: id });
        console.log('SUCCESS'.bgYellow);
        res.status(200).json(workoutes)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// update a workout :
const UpdateWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findOneAndUpdate({ _id: id },req.body, { upsert: true });
        console.log('SUCCESS'.bgYellow);
        res.status(200).json(workout)
       
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}



module.exports = {
    GetWorkouts,
    GetSingleWorkout,
    CreateWorkout,
    DeleteWorkout,
    UpdateWorkout
}