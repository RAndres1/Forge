alter table users enable row level security;
create policy users_select_self on users
for select using (auth.uid() = id);
