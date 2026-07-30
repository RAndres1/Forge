create table if not exists progress_snapshots(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  rank text,
  momentum integer,
  legacy integer,
  calculated_at timestamptz default now()
);
