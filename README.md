RLS Base de donnée utilisé :

create table public.profiles (
id uuid references auth.users(id) on delete cascade not null primary key,
created_at timestamptz default now(),
pseudo text
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id);

create policy "Users can delete their own profile"
on public.profiles
for delete
using (auth.uid() = id);
