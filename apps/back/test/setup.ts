process.env.NODE_ENV = 'test';
process.env.DATABASE_URL =
  process.env.DATABASE_URL ??
  'postgresql://root:rootpassword@localhost:5432/conectaunb_test?schema=public';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRATION = '3600s';
process.env.R2_ACCESS_KEY_ID = 'test-key';
process.env.R2_SECRET_ACCESS_KEY = 'test-secret';
process.env.R2_BUCKET_NAME = 'test-bucket';
process.env.R2_ENDPOINT = 'https://test.r2.cloudflarestorage.com';
process.env.R2_REGION = 'auto';
process.env.R2_PUBLIC_URL = 'https://test-public.example.com';
