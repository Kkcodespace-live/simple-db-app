// File: app/api/setup-db/route.ts
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS visitors ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP );`;
    return Response.json({ message: 'Table "visitors" created!' });
  } catch (error) {
    return Response.json({ error: 'Failed to create table' }, { status: 500 });
  }
}
