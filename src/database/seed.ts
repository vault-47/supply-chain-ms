import * as schema from './schema';
import { seed } from 'drizzle-seed';
import { db } from './connect';

async function main() {
  await seed(db, schema).refine((f) => ({
    users: {
      columns: {
        email: f.email(),
      },
    },
  }));
}

main()
  .then((res) => console.log(res))
  .catch((err) => console.log({ err }));
