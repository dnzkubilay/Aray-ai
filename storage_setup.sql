-- Enable Storage
insert into storage.buckets (id, name, public) 
values ('products', 'products', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Security Policies for Storage
create policy "Authenticated users can upload products" 
  on storage.objects for insert 
  to authenticated 
  with check (bucket_id = 'products');

create policy "Creators can update own products" 
  on storage.objects for update
  to authenticated 
  using (bucket_id = 'products' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Creators can delete own products" 
  on storage.objects for delete
  to authenticated 
  using (bucket_id = 'products' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Creators can view own products" 
  on storage.objects for select 
  to authenticated 
  using (bucket_id = 'products' and auth.uid()::text = (storage.foldername(name))[1]);
