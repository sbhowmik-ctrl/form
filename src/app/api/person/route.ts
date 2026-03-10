import { NextResponse } from 'next/server';
import { createPerson, getAllPersons } from '../../../controllers/personController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, bloodGrp, phone, idNumber, department, age } = body;

    if (!name || !email || !bloodGrp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const person = await createPerson({
      name,
      email,
      bloodGrp,
      phone,
      idNumber,
      department,
      age,
    });
    return NextResponse.json(person, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const persons = await getAllPersons();
    return NextResponse.json(persons, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
