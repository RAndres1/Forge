create table if not exists workouts(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  started_at timestamptz not null,
  completed_at timestamptz,
  status text not null check (status in ('draft','active','completed'))
);
create index if not exists idx_workouts_user on workouts(user_id);
