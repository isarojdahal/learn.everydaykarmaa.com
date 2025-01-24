---
title: Creating First Entity, Decorators.
sidebar: auto
---

## Creating First Entity

```typescript
@Entity("user")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;
}
```

## Decorators (@)

A decorator is a design pattern that allows you to extract,extend or modify the behavior of functions or classes.

A decorator is a function that adds some superpower to an existing method. It allows for the modification of an object’s behavior — without changing its original code, but extending its functionality.

Currently its not available in JavaScript, but TypeScript supports it. (That's why I love TS, as it has various features that JS doesnot support such as decorators, enums,class, private ); When TS featured gets most loved, it gets added to JS.
[(tc39 Proposals)](https://github.com/tc39/proposals)

In other programming languages it is also called as “Annotation”

In frameworks, they are widely used such as in Nest js, Spring boot, Django etc.

JavaScript by default doesn’t support decorator till date; but TypeScript does, so we can write code using Decorators in TypeScript, which hence reduces the complexity of code ; and improves code readability and usability.

<br/>
![Decorator Image](https://github.com/isarojdahal/everydaykarmaa.com-assets/blob/main/learn.everydaykarmaa.com/typeorm/decorators.png?raw=true)

## Understanding Decorator by Example:

tsconfig.json

```json
"outDir":"./dist",
"rootDir":"./src",
"exprimentalDecorators:"true",
```

index.ts

```typescript
// To define a decorator , we must undestand 3 things:  target,key, desription
class User {
  @column
  name: string;
}

// you can write any name for params.
function column(target, key, description) {
  console.log(target); // User {}; in which the decorator is used.
  //   target.constructor // User
  // target.constructor.name // User
  console.log(key); // name of field , or if kept in class, it will be class name.
  console.log(typeof key); // string; type of key
  console.log(description); // {value: undefined, writable: true, enumerable: true, configurable: true}; description of that field. (if function gives the function definition)
}
// strictPropertyIntializtion:true
```

```
import reflect-metadata;

function column(target,key,descriptor){
      const type = Reflect.getMetadata("design:type", target, key);
  console.log("type", type);
}

```

The important thing to note here is, the decorator gets automatically executed, without even calling it. This is done by Internally TypeScript.

Now lets change the code a bit:

```typescript
class User {
  @column
  greet(name: string) {
    //now we have a function with params; else than variable.
    console.log(`Hello ${name}`);
  }
}

// Now the output will be different
function column(target, key, description) {
  console.log(target); // {} (in function or field member, the target value is empty)

  console.log(key); // greet
  console.log(description); // gives the function itself. (it is able to access the function itself; hence we can easily modify the function)

  //
  descriptor.value(); // Hello undefined
  descriptor.value("Saroj"); // Hello Saroj

  // This is similar to:
  /*
    const user = new User();
    user.greet("Saroj 2");
*/
}
```

## Modifying behavior of function.

In Javascript, we have call(), apply(), bind() to modify the behavior of function.

[Article on call(), apply(), bind()](https://dev.to/codecraftjs/understanding-call-apply-and-bind-essential-methods-in-javascript-d62)

<i> Note: In other languages, such as Java, we do have reflection API;</i>

## Decorators Composition

- means applying multiple decorators to a single field or function.

```typescript
// Define functions for column2 and column ;
// both the decorator definition function receives the same value , where the decorator is used.
class User {
  @column2 //executes second.
  @column // executes first
  name: string;
}
```

### Example

Without Decorator

```typescript
class MathOperation {
  multiply(a: number, b: number) {
    if (a < 0 || a > 10) throw new Error("a should be in range 0-10");
    console.log(a * b);
  }

  add(a: number, b: number) {
    if (a < 0 || a > 10) throw new Error("a should be in range 0-10");
    console.log(a + b);
  }
}
```

With Decorator

```typescript
class MathOperation {
  @validateParam(0, 10)
  multiply(a: number, b: number) {
    console.log(a * b);
  }

  @validateParam(0, 10) // parameterized decorator
  add(a: number, b: number) {
    console.log(a + b);
  }
}

function validateParam(min: number, max: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      for (let i of args) {
        if (i < min || i > max) {
          throw new Error(`Parameters must be between ${min} and ${max}`);
        }
      }
      return originalMethod.apply(this, args);
    };
  };
}

const mathOperation = new MathOperation();
mathOperation.multiply(2, 50);
```

## Decorators with Class.

```typescript
function Entity(target) {
  // in class, we have target only; other two are not available. (as they are undefined)
  console.log(target); // User
}

@Entity
class User {}
```

## Decorators with Parameters

```typescript
function Entity(name: string) {
  return function (target) {
    console.log(name); // User
    console.log(target); // User
  };
}

@Entity("User")
class User {}
```
