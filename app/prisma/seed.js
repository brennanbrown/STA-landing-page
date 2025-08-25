/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Seed a few default services the app can integrate with
  const services = [
    { slug: 'github', name: 'GitHub' },
    { slug: 'coursera', name: 'Coursera' },
    { slug: 'udemy', name: 'Udemy' },
    { slug: 'freecodecamp', name: 'freeCodeCamp' },
  ]

  for (const svc of services) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: svc,
    })
  }

  console.log('✅ Seeded services:', services.map(s => s.slug).join(', '))
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
