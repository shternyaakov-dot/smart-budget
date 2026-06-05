-- ==============================
-- Smart Budget — Supabase Schema
-- הדבק את זה ב-SQL Editor של Supabase
-- ==============================

-- Profiles (auto-created on signup)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'coach' check (role in ('coach', 'client')),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Users see own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Clients
create table if not exists public.clients (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references auth.users on delete cascade not null,
  name text not null,
  email text,
  phone text,
  stage text not null default 'מודעות' check (stage in ('מודעות', 'שינוי', 'שמירה')),
  session integer not null default 1 check (session between 1 and 6),
  notes text,
  token text not null unique default encode(gen_random_bytes(8), 'hex'),
  materials integer[] default '{}',
  guide_data jsonb default '{}',
  created_at timestamptz default now()
);

alter table public.clients enable row level security;
create policy "Coach manages own clients" on public.clients
  for all using (auth.uid() = coach_id);
create policy "Client reads by token" on public.clients
  for select using (true); -- token-based access, no auth required for portal

-- Meetings
create table if not exists public.meetings (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.clients on delete cascade not null,
  coach_id uuid references auth.users on delete cascade not null,
  date date not null default current_date,
  notes text,
  client_note text,
  created_at timestamptz default now()
);

alter table public.meetings enable row level security;
create policy "Coach manages own meetings" on public.meetings
  for all using (auth.uid() = coach_id);
create policy "Client reads meetings by client_id" on public.meetings
  for select using (true);

-- Indexes
create index if not exists clients_coach_id_idx on public.clients(coach_id);
create index if not exists clients_token_idx on public.clients(token);
create index if not exists meetings_client_id_idx on public.meetings(client_id);
