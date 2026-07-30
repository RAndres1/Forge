create table if not exists sets(
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references workouts(id) on delete cascade,
  exercise_id uuid,
  weight numeric(6,2),
  reps integer,
  created_at timestamptz default now()
);
create index if not exists idx_sets_workout on sets(workout_id);
