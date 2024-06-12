## Memory Mate

Memory Mate is an web application. It's a flashcard application designed to supercharge your memorisation skills.
Memory Mate is built using [Next.js](https://nextjs.org/) for both the frontend and backend, all written in TypeScript for type safety and scalability. For our database, we chose PostgreSQL, a powerful and reliable option, and Prisma as our ORM to seamlessly manage database operations. To ensure data validation, we used the Zod library, keeping our application robust and error-free. For a sleek and intuitive user interface.

## Getting Started

First, add a .env file in the root of project and add `DATABASE_URL` key with prober information of your database.

Then run the development server:

```bash
npm i
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can find all backend logic in `src/app/api`.

## App structure

.
├── prisma # database relatet files
├── src # Source files ( back / front )
├── app # application
├── api # backend  
 ├── component # front component
├── constances
├── controllers
├── lib
├── services # front api call

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
