// File: app/api/visitors/route.ts
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`SELECT name, created_at FROM visitors ORDER BY created_at DESC;`;
    return Response.json({ visitors: result.rows });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch visitors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }
    await sql`INSERT INTO visitors (name) VALUES (${name});`;
    return Response.json({ message: `Visitor ${name} added!` });
  } catch (error) {
    return Response.json({ error: 'Failed to add visitor' }, { status: 500 });
  }
}
