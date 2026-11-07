-- Optional persistence layer for BazarSight. Run in Supabase SQL Editor after creating a free project.
create table if not exists datasets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  row_count integer not null,
  uploaded_at timestamptz not null default now()
);

create table if not exists forecasts (
  id uuid primary key default gen_random_uuid(),
  dataset_id uuid references datasets(id) on delete cascade,
  product_name text,
  store_id text,
  horizon integer not null,
  model_name text not null,
  mae numeric,
  rmse numeric,
  created_at timestamptz not null default now()
);

alter table datasets enable row level security;
alter table forecasts enable row level security;

-- Keep these tables private until authentication is enabled.
