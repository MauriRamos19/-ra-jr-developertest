import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async() => {
  await prisma.user.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      password: 'adminpass',
    },
  })

  const allUsers = await prisma.user.findMany()
  console.dir(allUsers, { depth: null })
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