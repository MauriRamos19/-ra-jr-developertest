import { PrismaClient } from '@prisma/client'
import { genSalt, hash } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const salt = await genSalt(10)
  await prisma.user.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      password: await hash('adminpass', salt),
    },
  })

  await prisma.vehicle.upsert({
    where: { plate_number: 'asd 123' },
    update: {},
    create: {
      plate_number: 'asd 123',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
