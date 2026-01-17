




### Prisma Setup (first time)

1. npm install

2. Create or update .env file with the correct DATABASE_URL of the form:
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"

3. `npx prisma migrate dev --name init`

4. `npx prisma generate`

### Prisma Setup (new schema)

TODO