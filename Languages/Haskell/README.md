# Haskell Learning Path - Beginner to Advanced

Welcome to your comprehensive Haskell learning journey! This curriculum is structured to take you from complete beginner to advanced functional programmer.

## 📚 How to Use This Guide

1. **Follow the order**: Topics build on each other
2. **Complete all tasks**: Practice is key to mastery
3. **Code everything**: Don't just read - write the code yourself
4. **Experiment**: Modify code and see what happens
5. **Take your time**: Understanding > speed

## 🎯 Course Structure

### 01-Basics (Foundation)
Start here if you're new to Haskell or functional programming.

1. **Hello World & Setup** - Installing GHC and first program
2. **Basic Syntax** - Functions, expressions, and types
3. **Types & Type Classes** - Type system fundamentals
4. **Lists** - Working with lists and ranges
5. **Tuples** - Multiple values together
6. **Pattern Matching** - Destructuring data
7. **Guards & Where** - Conditional logic
8. **Recursion** - The functional loop
9. **Higher-Order Functions** - Functions as values
10. **List Comprehensions** - Elegant list creation

**Time estimate**: 3-4 weeks
**Goal**: Understand functional programming basics

---

### 02-Intermediate (Building Blocks)
Core Haskell concepts and practical programming.

1. **Custom Types** - data, type, and newtype
2. **Type Classes** - Creating and implementing
3. **Functors** - Mappable types
4. **Applicative Functors** - Function application in context
5. **Monads** - Sequencing computations
6. **Monads in Practice** - IO, Maybe, Either
7. **Modules** - Code organization
8. **Input/Output** - Reading and writing
9. **Errors & Exceptions** - Error handling
10. **Testing** - QuickCheck and HUnit

**Time estimate**: 4-6 weeks
**Goal**: Write practical Haskell applications

---

### 03-Advanced (Professional Skills)
Advanced features and professional development patterns.

1. **Monad Transformers** - Stacking monads
2. **Lenses** - Composable getters and setters
3. **Parser Combinators** - Building parsers
4. **Concurrency** - Parallel and concurrent programming
5. **STM** - Software Transactional Memory
6. **Performance** - Profiling and optimization
7. **Advanced Type System** - GADTs, Type Families
8. **Template Haskell** - Metaprogramming
9. **FFI** - Foreign Function Interface
10. **Web Development** - Servant and Scotty

**Time estimate**: 6-8 weeks
**Goal**: Write professional, scalable Haskell code

---

## 🚀 Learning Tips

### For Beginners
- Functional programming is different - embrace it
- Don't try to think imperatively
- Recursion becomes natural with practice
- Use GHCi (interactive mode) extensively
- Type signatures are your friends

### For Intermediate Learners
- Understand type classes deeply
- Practice with real-world problems
- Read others' Haskell code
- Learn common libraries (containers, text, bytestring)
- Start building small projects

### For Advanced Learners
- Study category theory (optional but helpful)
- Contribute to open-source Haskell projects
- Explore advanced extensions
- Read research papers
- Build production applications

## 📁 Folder Structure

Each topic folder contains:
- **README.md** - Concept explanation and tasks
- **Your code files** - Create these as you complete tasks

```
Haskell/
├── 01-Basics/
│   ├── 01-HelloWorld-Setup/
│   │   └── README.md
│   ├── 02-Basic-Syntax/
│   │   └── README.md
│   └── ...
├── 02-Intermediate/
│   ├── 01-Custom-Types/
│   │   └── README.md
│   └── ...
└── 03-Advanced/
    ├── 01-Monad-Transformers/
    │   └── README.md
    └── ...
```

## ✅ Completion Checklist

### Basics
- [ ] Hello World & Setup
- [ ] Basic Syntax
- [ ] Types & Type Classes
- [ ] Lists
- [ ] Tuples
- [ ] Pattern Matching
- [ ] Guards & Where
- [ ] Recursion
- [ ] Higher-Order Functions
- [ ] List Comprehensions

### Intermediate
- [ ] Custom Types
- [ ] Type Classes
- [ ] Functors
- [ ] Applicative Functors
- [ ] Monads
- [ ] Monads in Practice
- [ ] Modules
- [ ] Input/Output
- [ ] Errors & Exceptions
- [ ] Testing

### Advanced
- [ ] Monad Transformers
- [ ] Lenses
- [ ] Parser Combinators
- [ ] Concurrency
- [ ] STM
- [ ] Performance
- [ ] Advanced Type System
- [ ] Template Haskell
- [ ] FFI
- [ ] Web Development

## 🎓 After Completing This Course

You'll be ready to:
- Build command-line tools in Haskell
- Develop web applications with Servant or Yesod
- Write parsers and compilers
- Create concurrent and parallel programs
- Contribute to Haskell open-source projects
- Apply functional programming principles

## 💡 Project Ideas

**After Basics:**
- Calculator (expression evaluator)
- Number guessing game
- List manipulation utilities
- Simple text processor
- Fibonacci and factorial variations

**After Intermediate:**
- JSON parser
- Todo list CLI application
- File organizer
- Custom DSL (Domain Specific Language)
- Conway's Game of Life

**After Advanced:**
- Web server with REST API
- Concurrent web scraper
- Programming language interpreter
- Database library
- Chat server

## 🛠️ Required Tools

### Installation
- **GHC** (Glasgow Haskell Compiler) - Latest stable version
- **GHCi** (Interactive REPL) - Comes with GHC
- **Stack** or **Cabal** - Build tools and package managers
- **HLS** (Haskell Language Server) - Optional but recommended

### Installation Options

**Using GHCup (Recommended):**
```bash
# Install GHCup
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh

# Install GHC, Cabal, and Stack
ghcup install ghc
ghcup install cabal
ghcup install stack
ghcup install hls
```

**Using Stack:**
```bash
# Install Stack
curl -sSL https://get.haskellstack.org/ | sh

# Create new project
stack new myproject
cd myproject
stack build
stack exec myproject-exe
```

### Code Editors
- **VS Code** with Haskell extension
- **Vim/Neovim** with haskell-vim
- **Emacs** with haskell-mode
- **IntelliJ IDEA** with IntelliJ-Haskell plugin

### Verification
```bash
# Check GHC version
ghc --version

# Check GHCi
ghci
> :quit

# Check Stack
stack --version

# Check Cabal
cabal --version
```

## 📖 Additional Resources

### Documentation
- [Haskell.org](https://www.haskell.org/)
- [Hoogle](https://hoogle.haskell.org/) - Function search
- [Hackage](https://hackage.haskell.org/) - Package repository
- [GHC User Guide](https://downloads.haskell.org/ghc/latest/docs/html/users_guide/)

### Books (Free Online)
- "Learn You a Haskell" (LYAH)
- "Real World Haskell"
- "Haskell Programming from First Principles"

### Practice Platforms
- Exercism (Haskell track)
- HackerRank (Functional Programming)
- Project Euler (math problems)
- Codewars (Haskell katas)

### Communities
- r/haskell on Reddit
- Haskell Discourse
- #haskell on IRC/Discord
- Stack Overflow

## 🤔 Getting Help

When stuck:
1. Use GHCi to test small expressions
2. Read type signatures carefully
3. Check Hoogle for function documentation
4. Read compiler error messages (they're helpful!)
5. Ask in Haskell communities
6. Review previous topics

## 🎯 Your Goal

By the end of this course, you should be able to:
- ✅ Think functionally and immutably
- ✅ Understand and use the type system
- ✅ Work with monads and functors
- ✅ Write pure and side-effectful code
- ✅ Build real-world applications
- ✅ Read and contribute to Haskell codebases

## 🌟 Why Learn Haskell?

**Benefits:**
- **Pure functions**: Easier to reason about and test
- **Strong typing**: Catch errors at compile time
- **Immutability**: No unexpected state changes
- **Lazy evaluation**: Efficient with infinite data
- **Concurrency**: Safe and elegant concurrent code
- **Abstraction**: Powerful abstraction capabilities

**Used By:**
- Facebook (Sigma anti-spam)
- Standard Chartered Bank (finance)
- GitHub (Semantic code analysis)
- Microsoft (Bond serialization)
- Meta (multiple projects)

**Transferable Skills:**
- Better understanding of JavaScript, Scala, F#
- Functional programming patterns
- Type system design
- Advanced problem-solving

---

**Ready to start?** Begin with `01-Basics/01-HelloWorld-Setup/README.md`

**Remember**: Haskell has a steep learning curve, but the rewards are worth it. Take your time, practice daily, and don't get discouraged. The "aha!" moments will come! 🚀

## 📅 Sample 3-Month Schedule

### Month 1: Foundations
- **Week 1-2**: Basics 1-5 (Hello World through Tuples)
- **Week 3**: Basics 6-7 (Pattern Matching, Guards)
- **Week 4**: Basics 8-10 (Recursion, Higher-Order, Comprehensions)

### Month 2: Core Concepts
- **Week 5-6**: Intermediate 1-4 (Types through Applicative)
- **Week 7**: Intermediate 5-6 (Monads)
- **Week 8**: Intermediate 7-10 (Modules, IO, Testing)

### Month 3: Advanced Topics
- **Week 9-10**: Advanced 1-5 (Transformers through STM)
- **Week 11**: Advanced 6-8 (Performance, Types, Template)
- **Week 12**: Advanced 9-10 + Final Project

---

**Good luck on your Haskell journey!** 🎓
