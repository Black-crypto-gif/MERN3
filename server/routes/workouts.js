const express = require('express');
const  {
    GetWorkouts,
    GetSingleWorkout,
    CreateWorkout,
    DeleteWorkout,
    UpdateWorkout
} = require('../controllers/workoutControllers')
const router = express.Router();


// GET all workoutes
router.get('/', GetWorkouts);
// GET single workoutes:
router.get('/:id', GetSingleWorkout)
// POST to workout:
router.post('/', CreateWorkout);
// DELETE workout :
router.delete('/:id', DeleteWorkout)
// UPDATE workout :
router.patch('/:id', UpdateWorkout)



module.exports = router;