import prisma from '../lib/prisma';

export type PersonCreateInput = {
  name: string;
  email: string;
  bloodGrp: string;
  phone?: string;
  idNumber?: string;
  department?: string;
  age?: number;
};

export async function createPerson(data: PersonCreateInput) {
  const person = await prisma.person.create({
    data: {
      name: data.name,
      email: data.email,
      bloodGrp: data.bloodGrp,
      phone: data.phone,
      idNumber: data.idNumber,
      department: data.department,
      age: data.age,
    },
  });
  return person;
}

export async function getAllPersons() {
  const persons = await prisma.person.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return persons;
}
