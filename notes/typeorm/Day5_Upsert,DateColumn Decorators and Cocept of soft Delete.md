---
title: Upsert,DateColumn Decorators and Concept of soft Delete
---

Upsert:

- It is a combination of insert and update.
- If the record is not present, it will insert the record.
- If the record is present, it will update the record.

Usescases of upsert in web development:

- user profile update.
- Cart update in e-commerce.
- Token expire.

```typescript
// lets make a token entity.

@Entity()
export class Token extends CommonEntity {
  @Column()
  value: string;

  @Column()
  username: string;
}

//also lets create a /user/misc/token route to work with our examples.
// in service

return await Token.upsert(
  // or pass array in first argument, for multiple upsert.
  {
    id: "711dbc74-ed11-4835-ac72-473733c8ce1c",
    username: "ramesh",
    value: "ok",
  },

  ["id"]
);
```

```
@CreateDateColumn

@Entity()
export class Token extends CommonEntity {
  @Column()
  value: string;

  @Column()
  username: string;

  @CreateDateColumn()
  @CreateDateColumn({
    type: "timestamp",
  })
   @CreateDateColumn({
    type: "timestamp with time zone",
  })
  createdAt: Date;
}


```

Lets implement updatedAt and createAt for User entity.
and DeletedAt for User entity. and understand soft remove and remove.

<!--  -->

```typescript
// to get the deleted records, we can use the following query.

User.find({
  withDeleted: true,
});
```
