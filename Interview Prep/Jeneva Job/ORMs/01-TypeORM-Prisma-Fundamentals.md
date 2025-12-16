# ORMs: TypeORM & Prisma - Interview Questions & Answers

## Table of Contents
1. [What are ORMs?](#what-are-orms)
2. [TypeORM Fundamentals](#typeorm-fundamentals)
3. [Prisma Fundamentals](#prisma-fundamentals)
4. [Relationships](#relationships)
5. [Queries](#queries)
6. [Migrations](#migrations)
7. [TypeORM vs Prisma](#typeorm-vs-prisma)

---

## What are ORMs?

### Question
**What is an ORM and why use one?**

### Answer
ORM (Object-Relational Mapping) is a technique that lets you query and manipulate data using an object-oriented paradigm instead of writing raw SQL.

**Benefits:**
- **Type safety**: Catch errors at compile time
- **Productivity**: Less boilerplate code
- **Database agnostic**: Switch databases easily
- **Query building**: Programmatic, composable queries
- **Migrations**: Version control for database schema

**Drawbacks:**
- **Learning curve**: Another abstraction to learn
- **Performance**: Sometimes less efficient than raw SQL
- **Complexity**: Can be overkill for simple apps
- **Limited control**: Complex queries may still need raw SQL

### Better Explanation

**Without ORM (Raw SQL):**
```javascript
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);
const user = result.rows[0]; // Not type-safe
```

**With ORM (TypeORM/Prisma):**
```typescript
const user = await userRepository.findOne({
  where: { email }
}); // Type-safe, autocomplete
```

---

## TypeORM Fundamentals

### Question
**How do you use TypeORM?**

### Answer

**Setup:**
```typescript
// ormconfig.json or ormconfig.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'mydb',
  entities: ['src/entities/*.ts'],
  synchronize: true, // Development only!
  logging: true
});

// Initialize
await AppDataSource.initialize();
```

**Entity Definition:**
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

**Repository Pattern:**
```typescript
import { AppDataSource } from './data-source';
import { User } from './entities/User';

// Get repository
const userRepository = AppDataSource.getRepository(User);

// Create
const user = userRepository.create({
  email: 'john@example.com',
  name: 'John Doe'
});
await userRepository.save(user);

// Find one
const foundUser = await userRepository.findOne({
  where: { email: 'john@example.com' }
});

// Find many
const users = await userRepository.find({
  where: { isActive: true }
});

// Update
await userRepository.update({ id: 1 }, { name: 'Jane Doe' });

// Delete
await userRepository.delete({ id: 1 });

// Soft delete (if using @DeleteDateColumn)
await userRepository.softDelete({ id: 1 });
```

**Custom Repository:**
```typescript
import { Repository } from 'typeorm';
import { User } from './User';

export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findActiveUsers(): Promise<User[]> {
    return this.find({ where: { isActive: true } });
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.createQueryBuilder('user')
      .where('user.name LIKE :query OR user.email LIKE :query', {
        query: `%${query}%`
      })
      .getMany();
  }
}

// Register custom repository
const dataSource = new DataSource({
  // ... config
  repositories: [UserRepository]
});
```

---

## Prisma Fundamentals

### Question
**How do you use Prisma?**

### Answer

**Setup:**
```bash
npm install prisma @prisma/client
npx prisma init
```

**Schema Definition (schema.prisma):**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  bio       String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  author    User     @relation(fields: [authorId], references: [id])

  @@map("posts")
}
```

**Generate Client:**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

**CRUD Operations:**
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe',
    bio: 'Developer'
  }
});

// Find one
const foundUser = await prisma.user.findUnique({
  where: { email: 'john@example.com' }
});

// Find many
const users = await prisma.user.findMany({
  where: { isActive: true },
  orderBy: { createdAt: 'desc' },
  take: 10,
  skip: 0
});

// Update
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane Doe' }
});

// Delete
await prisma.user.delete({
  where: { id: 1 }
});

// Upsert (update or create)
const upserted = await prisma.user.upsert({
  where: { email: 'john@example.com' },
  update: { name: 'John Updated' },
  create: { email: 'john@example.com', name: 'John Doe' }
});
```

---

## Relationships

### Question
**How do you define and work with relationships?**

### Answer

**TypeORM Relationships:**
```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

// One-to-Many / Many-to-One
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.posts)
  author: User;

  @Column()
  authorId: number;
}

// Many-to-Many
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Course, course => course.students)
  @JoinTable()
  courses: Course[];
}

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Student, student => student.courses)
  students: Student[];
}

// Querying with relations
const user = await userRepository.findOne({
  where: { id: 1 },
  relations: ['posts']
});

// Eager loading (always load relations)
@Entity()
export class User {
  @OneToMany(() => Post, post => post.author, { eager: true })
  posts: Post[];
}
```

**Prisma Relationships:**
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  posts     Post[]
  profile   Profile?

  authoredPosts Post[] @relation("PostAuthor")
  likedPosts    Post[] @relation("PostLikes")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  authorId  Int
  author    User     @relation("PostAuthor", fields: [authorId], references: [id])

  likedBy   User[]   @relation("PostLikes")
  tags      Tag[]
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  userId Int    @unique
  user   User   @relation(fields: [userId], references: [id])
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}
```

**Prisma Relationship Queries:**
```typescript
// Include relations
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true,
    profile: true
  }
});

// Select specific fields
const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: {
    id: true,
    name: true,
    posts: {
      select: {
        id: true,
        title: true
      }
    }
  }
});

// Nested create
const user = await prisma.user.create({
  data: {
    name: 'John',
    email: 'john@example.com',
    posts: {
      create: [
        { title: 'Post 1', content: 'Content 1' },
        { title: 'Post 2', content: 'Content 2' }
      ]
    },
    profile: {
      create: { bio: 'Developer' }
    }
  }
});

// Nested update
const updated = await prisma.user.update({
  where: { id: 1 },
  data: {
    name: 'Jane',
    posts: {
      updateMany: {
        where: { published: false },
        data: { published: true }
      }
    }
  }
});
```

---

## Queries

### Question
**How do you write complex queries?**

### Answer

**TypeORM Query Builder:**
```typescript
// Basic query
const users = await userRepository
  .createQueryBuilder('user')
  .where('user.isActive = :isActive', { isActive: true })
  .andWhere('user.age > :age', { age: 18 })
  .orderBy('user.createdAt', 'DESC')
  .take(10)
  .skip(0)
  .getMany();

// Joins
const users = await userRepository
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.posts', 'post')
  .where('post.published = :published', { published: true })
  .getMany();

// Aggregations
const result = await userRepository
  .createQueryBuilder('user')
  .select('COUNT(user.id)', 'count')
  .addSelect('AVG(user.age)', 'averageAge')
  .getRawOne();

// Subqueries
const posts = await postRepository
  .createQueryBuilder('post')
  .where(qb => {
    const subQuery = qb
      .subQuery()
      .select('user.id')
      .from(User, 'user')
      .where('user.isActive = :isActive', { isActive: true })
      .getQuery();
    return 'post.authorId IN ' + subQuery;
  })
  .getMany();
```

**Prisma Advanced Queries:**
```typescript
// Complex filtering
const users = await prisma.user.findMany({
  where: {
    AND: [
      { isActive: true },
      { age: { gte: 18 } },
      {
        OR: [
          { name: { contains: 'John' } },
          { email: { contains: 'john' } }
        ]
      }
    ]
  },
  orderBy: [
    { createdAt: 'desc' },
    { name: 'asc' }
  ],
  take: 10,
  skip: 0
});

// Relation filters
const users = await prisma.user.findMany({
  where: {
    posts: {
      some: {
        published: true,
        title: { contains: 'TypeScript' }
      }
    }
  },
  include: {
    posts: {
      where: { published: true }
    }
  }
});

// Aggregations
const result = await prisma.user.aggregate({
  _count: true,
  _avg: { age: true },
  _max: { age: true },
  _min: { age: true },
  where: { isActive: true }
});

// Group by
const grouped = await prisma.user.groupBy({
  by: ['country'],
  _count: { id: true },
  _avg: { age: true },
  having: {
    age: { _avg: { gte: 25 } }
  }
});

// Raw queries (when you need full SQL)
const users = await prisma.$queryRaw`
  SELECT * FROM users
  WHERE age > ${18}
  AND is_active = true
`;
```

---

## Migrations

### Question
**How do you handle database migrations?**

### Answer

**TypeORM Migrations:**
```bash
# Generate migration from entity changes
npx typeorm migration:generate -n CreateUserTable

# Create empty migration
npx typeorm migration:create -n AddEmailToUser

# Run migrations
npx typeorm migration:run

# Revert last migration
npx typeorm migration:revert
```

**Migration File:**
```typescript
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
```

**Prisma Migrations:**
```bash
# Create and apply migration
npx prisma migrate dev --name add_user_table

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# View migration status
npx prisma migrate status
```

**Prisma generates SQL automatically from schema changes:**
```sql
-- Migration created from schema.prisma changes
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## TypeORM vs Prisma

### Question
**What are the differences between TypeORM and Prisma?**

### Answer

**Comparison:**

| Feature | TypeORM | Prisma |
|---------|---------|--------|
| **Approach** | Active Record & Data Mapper | Query Builder |
| **Schema** | TypeScript decorators | Prisma schema language |
| **Type Safety** | Good | Excellent |
| **Learning Curve** | Steeper | Easier |
| **Performance** | Good | Excellent |
| **Migrations** | Manual | Auto-generated |
| **Raw SQL** | Yes | Yes |
| **Database Support** | Many | Many |
| **Community** | Large | Growing |

**When to Use TypeORM:**
- Need Active Record pattern
- Complex inheritance hierarchies
- Mature ecosystem preference
- More control over queries

**When to Use Prisma:**
- Want best type safety
- Prefer schema-first approach
- Need great developer experience
- Want auto-generated migrations

**Code Comparison:**

**TypeORM:**
```typescript
// Define entity with decorators
@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}

// Query
const user = await userRepository.findOne({
  where: { id: 1 },
  relations: ['posts']
});
```

**Prisma:**
```prisma
// Define model in schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}
```

```typescript
// Query (fully type-safe)
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
});
```

---

## Key Takeaways for Jeneva Interview

### ORM Priorities:
1. **Basic CRUD**: Create, read, update, delete operations
2. **Relationships**: One-to-many, many-to-many
3. **Queries**: Filtering, sorting, pagination
4. **Migrations**: Schema versioning
5. **Type safety**: TypeScript integration

### Common Questions:
- What is an ORM and why use it?
- How do you define relationships?
- How do you write complex queries?
- What are migrations?
- TypeORM vs Prisma trade-offs?

### Demonstrate:
- Experience with at least one ORM
- Understanding of relational databases
- Ability to write efficient queries
- Knowledge of migrations
- Type-safe database access
