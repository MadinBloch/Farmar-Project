create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('farmer', 'buyer')),
  phone text,
  location text,
  created_at timestamptz not null default now()
);

create table if not exists public.lots (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.profiles(id) on delete cascade,
  crop text not null,
  quantity numeric not null check (quantity > 0),
  unit text not null default 'quintals',
  grade text not null,
  quality_source text,
  location text not null,
  ready_date date not null,
  status text not null default 'Listed',
  created_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  lot_id uuid not null references public.lots(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  price numeric not null check (price > 0),
  transport numeric not null default 0,
  storage numeric not null default 0,
  payment_terms text not null,
  notes text,
  status text not null default 'Pending',
  created_at timestamptz not null default now()
);

create table if not exists public.market_prices (
  id uuid primary key default gen_random_uuid(),
  market text not null,
  crop text not null,
  price numeric not null,
  change_percent numeric,
  volume text,
  captured_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.lots enable row level security;
alter table public.offers enable row level security;
alter table public.market_prices enable row level security;

create policy "profiles are readable by signed in users" on public.profiles for select to authenticated using (true);
create policy "users can create their profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "users can update their profile" on public.profiles for update to authenticated using (auth.uid() = id);

create policy "lots are readable by signed in users" on public.lots for select to authenticated using (true);
create policy "farmers can create lots" on public.lots for insert to authenticated with check (auth.uid() = farmer_id);
create policy "farmers can update their lots" on public.lots for update to authenticated using (auth.uid() = farmer_id);
create policy "farmers can delete their lots" on public.lots for delete to authenticated using (auth.uid() = farmer_id);

create policy "offers are readable by signed in users" on public.offers for select to authenticated using (true);
create policy "buyers can create offers" on public.offers for insert to authenticated with check (auth.uid() = buyer_id);
create policy "buyers can update their offers" on public.offers for update to authenticated using (auth.uid() = buyer_id);

create policy "market prices are readable by everyone" on public.market_prices for select to anon, authenticated using (true);
