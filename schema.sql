-- ============================================
-- ARAY AI - Database Schema (Blueprint v2.0)
-- ============================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";      -- Fuzzy search
create extension if not exists "pg_stat_statements";
-- TimescaleDB usually requires enabling via dashboard in some managed instances, 
-- but we'll try to enable it if available, otherwise ignore.
-- create extension if not exists "timescaledb"; 

-- 2. ENUMS
create type user_role as enum ('creator', 'admin', 'support');
create type product_type as enum ('software', 'digital_asset', 'service', 'subscription');
create type product_status as enum ('draft', 'published', 'archived');
create type order_status as enum ('pending', 'completed', 'failed', 'refunded');
create type license_status as enum ('active', 'suspended', 'revoked', 'expired');
create type webhook_event as enum ('order.created', 'order.completed', 'license.activated', 'subscription.renewed');

-- 3. PROFILES Table (Extends Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null check (username ~ '^[a-z0-9_-]{3,30}$'),
  email text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  
  -- Business Info
  company_name text,
  tax_id text,
  country_code char(2),
  
  -- Stripe Integration
  stripe_account_id text unique,
  stripe_customer_id text,
  stripe_onboarding_complete boolean default false,
  
  -- Settings
  theme_settings jsonb default '{"mode": "dark", "accent": "#6366f1"}',
  notification_settings jsonb default '{"email": true, "push": false}',
  
  -- Metadata
  role user_role default 'creator',
  is_verified boolean default false,
  is_suspended boolean default false,
  last_login_at timestamp with time zone,
  
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Search indexes for Profiles
create index idx_profiles_username_trgm on profiles using gin(username gin_trgm_ops);
create index idx_profiles_display_name_trgm on profiles using gin(display_name gin_trgm_ops);

-- 4. PRODUCTS Table
create table products (
  id uuid default uuid_generate_v4() primary key,
  creator_id uuid references profiles(id) on delete cascade not null,
  
  -- Basic Info
  title text not null check (length(title) >= 3 and length(title) <= 200),
  slug text not null check (slug ~ '^[a-z0-9-]+$'),
  type product_type not null,
  status product_status default 'draft',
  
  -- Content
  description text,
  description_ai text,              -- AI-generated marketing copy
  short_description text,
  
  -- Media
  cover_image_url text,
  gallery_images text[],            -- Array of image URLs
  demo_url text,                    -- Live demo or video
  
  -- Pricing
  price_amount int not null check (price_amount >= 0),  -- in cents
  currency text default 'USD',
  compare_at_price int,             -- Original price (for discounts)
  
  -- Files & Delivery
  file_path text,                   -- Secure S3/R2 path
  file_size_bytes bigint,
  file_type text,                   -- MIME type
  download_limit int,               -- Max downloads per purchase
  
  -- Licensing (for software products)
  license_enabled boolean default false,
  license_template text,            -- License agreement text
  
  -- Technical Metadata (AI-extracted)
  technical_metadata jsonb,         -- {platform, version, requirements, etc}
  
  -- SEO
  meta_title text,
  meta_description text,
  keywords text[],
  
  -- Stats
  view_count int default 0,
  sales_count int default 0,
  revenue_total int default 0,      -- Lifetime revenue in cents
  
  -- Settings
  is_featured boolean default false,
  requires_approval boolean default false,
  max_purchases int,                -- Purchase limit (null = unlimited)
  
  -- Timestamps
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  unique(creator_id, slug)
);

-- Indexes for Products
create index idx_products_creator on products(creator_id);
create index idx_products_status on products(status) where status = 'published';
create index idx_products_type on products(type);
create index idx_products_created on products(created_at desc);
create index idx_products_search on products using gin(to_tsvector('english', title || ' ' || coalesce(description, '')));

-- 5. ORDERS Table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  
  -- Product & Buyer
  product_id uuid references products(id) on delete set null,
  creator_id uuid references profiles(id) on delete set null,
  
  -- Buyer Info (can be guest)
  buyer_id uuid references profiles(id) on delete set null,
  buyer_email text not null,
  buyer_name text,
  buyer_country_code char(2),
  
  -- Payment
  stripe_payment_intent_id text unique,
  stripe_charge_id text,
  
  -- Amounts (all in cents)
  subtotal_amount int not null,
  tax_amount int default 0,
  discount_amount int default 0,
  amount_total int not null,
  
  -- Currency & Tax
  currency text default 'USD',
  tax_rate decimal(5,4),            -- e.g., 0.2000 for 20% VAT
  
  -- Status & Delivery
  status order_status default 'pending',
  download_url text,                -- Secure, time-limited link
  download_count int default 0,
  
  -- Metadata
  ip_address inet,
  
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_orders_creator on orders(creator_id);
create index idx_orders_buyer on orders(buyer_id);

-- 6. LICENSE KEYS Table
create table license_keys (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade not null,
  order_id uuid references orders(id),
  
  key_value text unique not null,
  status license_status default 'active',
  
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 7. RLS POLICIES (Security)
alter table profiles enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table license_keys enable row level security;

-- Profiles
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Products
create policy "Published products are viewable by everyone" on products for select using (status = 'published' OR auth.uid() = creator_id);
create policy "Creators can insert own products" on products for insert with check (auth.uid() = creator_id);
create policy "Creators can update own products" on products for update using (auth.uid() = creator_id);
create policy "Creators can delete own products" on products for delete using (auth.uid() = creator_id);

-- 8. TRIGGERS (Auto-update timestamps)
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles for each row execute function update_updated_at_column();
create trigger update_products_updated_at before update on products for each row execute function update_updated_at_column();

-- 9. USER CREATION TRIGGER (Auto-create profile on auth signup)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username, display_name)
  values (
    new.id, 
    new.email, 
    lower(split_part(new.email, '@', 1) || '_' || substr(md5(random()::text), 1, 4)), -- Generate temp username
    split_part(new.email, '@', 1)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
