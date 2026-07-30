# Training Data Model

Workout
id
user_id
status
started_at
finished_at
duration
location
notes

---

WorkoutExercise
id
workout_id
exercise_id
order_index

---

WorkoutSet
id
exercise_id
set_number
weight
repetitions
rpe
rest_seconds
completed_at

---

Exercise
id
name
category
muscle_group
equipment
movement_pattern

---

Relationships
Workout
↓
WorkoutExercise
↓
WorkoutSet
↓
Exercise
