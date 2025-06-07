import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

async function main() {
  console.log(`Start seeding ...`);

  // --- Create Admin Users ---
  const adminPassword = await hashPassword('AdminPassword123!');

  const adminUsersData = [
    {
      email: 'alvisonhunter@gmail.com',
      password: adminPassword,
      firstName: 'Alvison',
      lastName: 'Hunter',
      phone: '123-456-7890',
      address: '123 Admin St',
      city: 'Adminville',
      state: 'AS',
      zip: '12345',
      country: 'Adminland',
      role: Role.ADMIN,
      isActive: true,
      isVerified: true
    },
    {
      email: 'ralexs.acu@gmail.com',
      password: adminPassword,
      firstName: 'Alex',
      lastName: 'Ruiz',
      phone: '987-654-3210',
      address: '456 Admin Ave',
      city: 'Admin City',
      state: 'AC',
      zip: '54321',
      country: 'Adminland',
      role: Role.ADMIN,
      isActive: true,
      isVerified: true
    }
  ];

  for (const u of adminUsersData) {
    const user = await prisma.user.create({
      data: u
    });
    console.log(
      `Created admin user with id: ${user.id} and email: ${user.email}`
    );
  }

  // --- Create Non-Admin Users (Mentees by default) ---
  const commonPassword = await hashPassword('UserPassword123!');

  const nonAdminUsersData = [
    {
      email: 'john.doe@example.com',
      password: commonPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '555-0101',
      address: '101 User Rd',
      city: 'Userburg',
      state: 'US',
      zip: '10101',
      country: 'Userland'
      // role: Role.MENTEE, // Default as per schema
      // isActive: true,    // Default as per schema
      // isVerified: false, // Default as per schema
    },
    {
      email: 'jane.smith@example.com',
      password: commonPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '555-0102',
      address: '102 Mentee Ln',
      city: 'Menteeville',
      state: 'MS',
      zip: '10102',
      country: 'Userland'
    },
    {
      email: 'bob.johnson@example.com',
      password: commonPassword,
      firstName: 'Bob',
      lastName: 'Johnson',
      phone: '555-0103',
      address: '103 Example St',
      city: 'Testville',
      state: 'TS',
      zip: '10103',
      country: 'Userland'
    },
    {
      email: 'alice.williams@example.com',
      password: commonPassword,
      firstName: 'Alice',
      lastName: 'Williams',
      phone: '555-0104',
      address: '104 Sample Ave',
      city: 'Demoburg',
      state: 'DS',
      zip: '10104',
      country: 'Userland',
      role: Role.MENTOR, // Example of a Mentor
      isVerified: true
    },
    {
      email: 'charlie.brown@example.com',
      password: commonPassword,
      firstName: 'Charlie',
      lastName: 'Brown',
      phone: '555-0105',
      address: '105 Peanut Rd',
      city: 'Comicstrip',
      state: 'CS',
      zip: '10105',
      country: 'Userland'
    }
  ];

  for (const u of nonAdminUsersData) {
    const user = await prisma.user.create({
      data: {
        ...u
        // role, isActive, isVerified will use schema defaults if not provided
      }
    });
    console.log(`Created user with id: ${user.id} and email: ${user.email}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma Client connection
    await prisma.$disconnect();
  });
