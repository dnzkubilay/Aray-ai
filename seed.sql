-- ============================================
-- ARAY AI - Seed Data Script
-- ============================================
-- This script finds the most recently registered user and:
-- 1. Updates their profile with a demo username ('demo_creator')
-- 2. Adds sample products to their account

DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- 1. Get the last created user
  SELECT id INTO target_user_id FROM auth.users ORDER BY created_at DESC LIMIT 1;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'No users found in auth.users. Please sign up in the app first!';
  END IF;

  -- 2. Update Profile
  -- We use ON CONFLICT do nothing just in case, but usually update is enough given the trigger exists.
  UPDATE public.profiles
  SET 
      username = 'demo_creator',
      display_name = 'Demo Creator',
      bio = 'Building the future of commerce with ARAY AI. Premium digital assets.',
      avatar_url = 'https://api.dicebear.com/9.x/avataaars/svg?seed=Aray'
  WHERE id = target_user_id;

  -- 3. Insert Sample Products
  INSERT INTO public.products (creator_id, title, slug, type, description, price_amount, status, cover_image_url)
  VALUES 
  (
      target_user_id,
      'Cyberpunk Icon Pack 2077',
      'cyberpunk-icons',
      'digital_asset',
      'Neon-soaked, futuristic vector icons for your next sci-fi project. Includes 500+ SVG and PNG files.',
      2900, -- $29.00
      'published',
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop'
  ),
  (
      target_user_id,
      'Ultimate SaaS Boilerplate',
      'saas-starter-pro',
      'software',
      'Ship your startup in days, not months. Includes Auth, Database, Stripe, and Landing Page components.',
      14900, -- $149.00
      'published',
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop'
  ),
  (
      target_user_id,
      'Minimalist Portfolio Theme',
      'minimal-theme',
      'software',
      'A clean, typography-focused portfolio template for designers and architects.',
      4900, -- $49.00
      'published',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop'
  )
  ON CONFLICT (creator_id, slug) DO NOTHING;
    
  RAISE NOTICE 'Seeding completed for User ID: %', target_user_id;
END $$;
