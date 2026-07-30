create table if not exists users(
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
