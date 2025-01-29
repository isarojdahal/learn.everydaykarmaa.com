---
title: Exploring TypeORM Plugins; Exploring Inbuilt Functions (Update, Delete, Find); with Rest API setup
---

Today we will cover followings things:

- TypeORM Plugins.

## TypeORM Plugins

There are lots of libraries which can be used as plugins in TypeORM. Some of them are:

- typeorm-seeding
- typeorm-encrypted
- typeorm-naming-startegies
- etc.

Lets explore `typeorm-naming-startegies`

## Doing insertion without extending BaseEntity.

```typescript
const userRepostiory = AppDataSource.getRepository(User);
const user = new User();
user.username = "john.doe";
await userRepostiory.save(user);
console.log(await userRepostiory.find());
```

### Inbuilt Methods.

```typescript
// find() : finds all the records.
// findOne() : finds one record. (must supply where condition)
// save(): saves the record. (also returns the saved value.) whereas, insert() just inserts the record.

// update()  : updates the record. (must supply where condition)

//Way 1
const user = await User.findOne({
  where: { id: "6835c88e-fa65-4903-9c3a-7c5fdb8f589b" },
});

if (!user) {
  return;
}

user.username = "newusername";

await user.save();

// Way 2
console.log(
  // if found updates the data.
  await User.update(
    {
      id: "6835c88e-fa65-4903-9c3a-7c5fdb8f589b",
    },
    {
      username: "newusername2",
    }
  )
);

// remove() : deletes the record. (must supply where condition)
const user = await User.findOne({
  where: {
    id: "edc3f0b3-bff4-4172-ab28-356777f0a37c",
  },
});

if (user) {
  const removedUser = await user.remove();
  console.log("removedUser", removedUser);
}
```

Let's do the same thing with the help of Rest API.

```
pnpm add express
```

```typescript
import "dotenv/config";
import { AppDataSource } from "./config/database.config";
import express from "express";
import { EnvConfig } from "./config/env.config";

const app = express();

// settingup database first.
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected !");
    app.listen(EnvConfig.PORT, () => {
      console.log(`Server is running on port ${EnvConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
```

Also, lets create, controller,services and routes.
