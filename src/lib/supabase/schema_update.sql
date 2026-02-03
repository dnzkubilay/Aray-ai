-- Create licenses table
CREATE TABLE IF NOT EXISTS licenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  license_key TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('active', 'revoked', 'expired')) DEFAULT 'active',
  device_fingerprint TEXT,
  activated_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- RLS Policies
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;

-- Creators can view licenses for their products
CREATE POLICY "Creators can view licenses for their products" 
ON licenses FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM products 
    WHERE products.id = licenses.product_id 
    AND products.creator_id = auth.uid()
  )
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS licenses_license_key_idx ON licenses(license_key);
CREATE INDEX IF NOT EXISTS licenses_order_id_idx ON licenses(order_id);
