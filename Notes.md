# TypeScript Notes

- [TypeScript Notes](#typescript-notes)
  - [Basics and Types](#basics-and-types)
    - [Core Types](#core-types)
    - [Enum](#enum)
    - [Custom Type](#custom-type)
    - [Function return type](#function-return-type)
    - [Function type](#function-type)
    - [Unknown type](#unknown-type)
    - [never type](#never-type)
  - [TypeSript Compiler and Configuration](#typesript-compiler-and-configuration)
    - [Watch Mode](#watch-mode)
    - [Compiling the Entire Project / Multiple Files](#compiling-the-entire-project--multiple-files)
    - [Including & Excluding Files](#including--excluding-files)
    - [Setting a Compilation Target](#setting-a-compilation-target)
    - [TS Core Libs](#ts-core-libs)
    - [Other Compilation Options](#other-compilation-options)
    - [rootDir & outDir](#rootdir--outdir)
    - [Stop Emitting Files on Compilation Errors](#stop-emitting-files-on-compilation-errors)
    - [Strict Compilation](#strict-compilation)
    - [Code Quality Options](#code-quality-options)
  - [Classes](#classes)
  - [Interfaces](#interfaces)
    - [Interface Basics](#interface-basics)
    - [type vs. interface](#type-vs-interface)
    - [Interfaces with Classes](#interfaces-with-classes)
    - [Interfaces as Function Types](#interfaces-as-function-types)
    - [Optional Parameters & Properties](#optional-parameters--properties)
    - [Compiling Interfaces to JS](#compiling-interfaces-to-js)
  - [Advanced Types](#advanced-types)
    - [Intersection Types](#intersection-types)
    - [Type Guards](#type-guards)
    - [Discriminated Unions](#discriminated-unions)
    - [Type Casting](#type-casting)
    - [Index Properties](#index-properties)
    - [Function Overloads](#function-overloads)
    - [Optional Chaining](#optional-chaining)
    - [Nullish Coalescing](#nullish-coalescing)
  - [Generics](#generics)
    - [Generic Basics](#generic-basics)
    - [Creating a Generic Function](#creating-a-generic-function)
    - [Generic Constraints](#generic-constraints)
    - [Another Generic Function](#another-generic-function)
    - [The 'keyof' Constraint](#the-keyof-constraint)
    - [Generic Classes](#generic-classes)
    - [Utility Types](#utility-types)
  - [Decorators - Meta-Programming](#decorators---meta-programming)
    - [Decarator Basics](#decarator-basics)
    - [Decorator Factory](#decorator-factory)
    - [Useful Decorators](#useful-decorators)
    - [Property Decorators](#property-decorators)
    - [Accessor & Parameter Decorators](#accessor--parameter-decorators)
    - [Decorator Execution Order](#decorator-execution-order)
    - [Returning a Class in a Class Decorator](#returning-a-class-in-a-class-decorator)
    - [Other Decorator Return Types](#other-decorator-return-types)
    - [Creating an 'Autobind' Decorator](#creating-an-autobind-decorator)
    - [Validation with Decorators](#validation-with-decorators)
  - [Modules and Namespaces](#modules-and-namespaces)
    - [Splitting Code Into Multiple Files](#splitting-code-into-multiple-files)

## Basics and Types

### Core Types

- number
- string
- boolean
- object
- Array
  - string[]
- Tuple
  - [string, number]
  - push 不能被检测
- Enum
  - enum { NEW, OLD }
  - enum { NEW = 5, OLD }
- Any

### Enum

```javascript
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
}
```

### Custom Type

```javascript
type Combinable = number | string
```

### Function return type

void vs. undefined

- void: no return statement
- undefined: has a return statement but no return value

### Function type

Describe a function

- syntax: () =>

```javascript
// just a function without any description or restriction
let combineValue: Function
combineValue = add

// function type - function description
// receive two number parameters and return a number
let combineValue: (a: number, b: number) => number

// fucntion type with callback function
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const res = n1 + n2
  cb(res)
}
```

### Unknown type

unknown vs. any

- any disables all type checking; should avoid
- with unknown, we need to check the type first with extra if check; unknown is better than any

```javascript
let userInput: unknown
let userName: string

userInput = '123'
userName = userInput // error
```

### never type

return never:

1. error
2. infinite loop

```javascript
// throw error crash our script
// so it returns never in practice
function generateError(msg: string, code: number): never {
  throw { message: msg, errorCode: code }
}

const result = generateError('An error occured', 500)
console.log(result) // no undefined log
```

---

## TypeSript Compiler and Configuration

```javascript
tsc app.ts
```

### Watch Mode

can only target one specific file to compile

```javascript
tsc app.ts -w // or --watch
```

### Compiling the Entire Project / Multiple Files

1. init this project in current folder as a typescript project
2. auto create tsconfig.config

```javascript
// 1. only once
tsc --init

// 2. just tsc without file
tsc

// 2. or combine with watch Mode
tsc -w
```

### Including & Excluding Files

> node_modules is automatically excluded

```javascript
// in tsconfig.json

"exclude": ["node_modules", "**/*.dev.ts"]

// if use include, need to include all the files
// otherwise, it will only include the listed files
"include": ["app.ts"]

// for small project like only three files
"files": ['app.ts']
```

### Setting a Compilation Target

```javascript
"compilerOptions": {
  "target": "es5", // compile down to which version of js
  "module": "commonjs"
}
```

### TS Core Libs

how does TS know we have document and document has a querySelector function

```javascript
"compilerOptions": {
  "lib": ["dom", "es6", "dom.iterable", "scripthost"] // which default object to use
}
```

> if "lib" is not set (commented out): default -> go with target such as all "es5" object plus all DOM API
>
> - target: 'es6' with lib commented out  
>   equals  
>   "lib": ["dom", "es6", "dom.iterable", "scripthost"]

### Other Compilation Options

```javascript
"compilerOptions": {
  "allowJs": false, // compile js files
  "checkJs": false, // check js files

  "jsx": "preserve", // JSX related

  "declaration": true, // generate '.d.ts'
  "declarationMap": true, // generates a sourcemap for each corresponding '.d.ts' file.

  "sourceMap": true, // generates '.map' file, help with debugging

  "removeComments": true, // remove comments when compiling

  "noEmit": true // Do not generate js files, just check if .ts files are right without errors

}
```

### rootDir & outDir

```javascript
"compilerOptions": {
  "outDir": "./dist", /* Redirect compiled output to the directory. */
  "rootDir": "./src", /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
}
```

### Stop Emitting Files on Compilation Errors

Default is false

Even if we have an error, TSC still generates .js files

```javascript
"compilerOptions": {
  "noEmitOnError": true // default is false
}
```

### Strict Compilation

```javascript
"compilerOptions": {
  "strict": true, // this one = all below

  "noImplicitAny": true, // ensure no Any type for parameters
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictFunctionTypes": true, /* Enable strict checking of function types. */
  "strictBindCallApply": true, /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
  "strictPropertyInitialization": true, /* Enable strict checking of property initialization in classes. */
  "noImplicitThis": true, /* Raise error on 'this' expressions with an implied 'any' type. */
  "alwaysStrict": true, /* Parse in strict mode and emit "use strict" for each source file. */
}
```

### Code Quality Options

```javascript
"compilerOptions": {
  "noUnusedLocals": true, /* Report errors on unused locals. */
  "noUnusedParameters": true, /* Report errors on unused parameters. */
  "noImplicitReturns": true, /* Report error when not all code paths in function return a value. */
  "noFallthroughCasesInSwitch": true, /* Report errors for fallthrough cases in switch statement. */
}
```

---

## Classes

```javascript
// abstract class can not be instantiated
abstract class Department {
  // private name: string
  protected employees: string[] = []

  // static property
  static foundYear = 2020

  // new syntax - add 'private/public' keyword for parameters in constructor
  constructor(private readonly id: string, private name: string) {
    // this.name = name // don't need to assign anymore
  }

  // static method
  static createEmployee(name: string) {
    return { name }
  }

  // prototype method
  // access static property inside class
  describe() {
    console.log(`Department: ${this.name}, found in ${Department.foundYear}`)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInfo() {
    console.log(this.employees.length)
    console.log(this.employees)
  }

  // abstract method
  // need 'abstract' keyword for class
  abstract testFun(test: string): void
}

// Inheritance
class ITDepartment extends Department {
  // name convention: '_admins'
  constructor(id: string, private _admins: string[]) {
    super(id, 'IT')
  }

  // get method
  get admins() {
    if (this._admins.length !== 0) {
      return this._admins
    }
    throw new Error('No admins')
  }

  // set method
  set admins(newAdmins: string[]) {
    this._admins = newAdmins
  }

  // instantiate abstract method
  testFun(test: string) {
    console.log('This is abstract function')
  }
}

const IT = new ITDepartment('d1', ['admin'])
// use get method - you don't invoke the get method
const admins = IT.admins


/*************************************************/


// Singleton
class Singleton {
  private static instance: Singleton

  private constructor(private property: stirng)

  static getInstance(): Singleton {
    if (this.instance) {
      return this.instance
    }

    this.instance = new Singleton()
    return this.instance
  }
}
```

---

## Interfaces

### Interface Basics

- don't have concrete value
- just exist in TS
- ';'结尾

```javascript
interface Person {
  name: string
  age: number

  greeting(phrase: string): void
}

let user1: Person

user1 = {
  name: 'J',
  age: 24,
  greeting(phrase: string) {
    console.log(phrase + ' ' + this.name)
  }
}
```

### type vs. interface

- **interface is only for object**
- interface can be implemented in class

> Interfaces are often used to share functionalities among classes

### Interfaces with Classes

> one interface can inherit multiple other interfaces, but one class can only inherit one other class

```javascript
interface Named {
  // readonly property
  readonly name: stirng
}

// interface inheritance
interface Greetable extends Named {
  greeting(phrase: string): void
}

class Person implements Greetable {
  constructor(public name: string)

  greet(phrase) {
    console.log(phrase + ' ' + this.name)
  }
}
```

### Interfaces as Function Types

```javascript
// 1. custom type - more common
type AddFn = (n1: number, n2: number) => number

// 2. interface function type
interface AddFn {
  // anonymous function
  (a: number, b: number): number;
}

let add: AddFn

add = (n1: number, n2: number) => {
  return n1 + n2
}
```

### Optional Parameters & Properties

```javascript
interface Named {
  readonly name: string
  outputName?: string // optional property
}
```

### Compiling Interfaces to JS

> Interfaces is just a TS feature that helps with development. When compiling to JS, all interfaces are removed.

---

## Advanced Types

### Intersection Types

```javascript
// 1. Object type - Combination of two types
type Admin = {
  name: string
  privileges: string[]
}

type Employee = {
  name: string
  startDate: Date
}

type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
  name: 'J',
  privileges: ['create_servers'],
  stasrtDate: new Date()
}

// 2. Union type - types in common
type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric // Universal === number
```

### Type Guards

```javascript
// 1. typeof
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

// 2. property in object
type UnknownEmployee = Employee | Admin
function printEmployeeInfo(emp: UnknownEmployee) {
  console.log(emp.name) // no problem

  if ('privileges' in emp) {
    console.log(emp.privileges) // problem - need type guard
  }

  if ('startDate' in emp) {
    console.log(emp.startDate)
  }
}

// 3. instanceof - for classes
class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }

  loadCargo(amount: number) {
    console.log('Loading cargo...', amount)
  }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(v: Vehicle) {
  v.drive()
  // Type Guard
  if (v instanceof Truck) {
    v.loadCargo(100)
  }
}
```

### Discriminated Unions

for objects

```javascript
// one common property in every object to distinguish
interface Bird {
  type: 'bird'
  fluingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
  // can't use animal.speed directly
  // can't use instanceof since we work with interfaces
  // use 'property in object' can work, but not great

  let speed
  // With discriminated unions, you can check types according to this common property 'type'
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed
      break;

    case 'horse':
      speed = animal.runningSpeed

    default:
      break;
  }

  console.log('Moving at speed:', speed)
}
```

### Type Casting

```javascript
// TS cannot figure out what type this element is
// TS knows it is a HTMLElement but does not know what specific type it is and it could possibly be null
const p = document.getElementById('paragraph')

// without '!', need to add if statement for null situation
const input = document.getElementById('user-input')! as HTMLInputElement // Type Casting
input.value = 'Hi there' // if no casting, error
```

### Index Properties

```javascript
interface ErrorContainer {
  [prop: string]: string // don't know the prop name, but know that it must be a string and its value is also a string
  id: string // ok. But can't set id: number
}

const errorBag: ErrorContainer = {
  email: 'not a valid email'  // ok
  1: 'not valid', // ok, 1 can be seen as string
  username: 'Username Error' // ok. can have multiple properties
}
```

### Function Overloads

```javascript
// This function implicitly returns a Combinable value
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

const res = add('max ', 'j')
res.split(' ') // error since res is Combinable type, TS does not know string method for Combinable

// 1. type casting
const res = add('max ', 'j') as string

// 2. function overload
function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: number, b: string): string
function add(a: string, b: number): string
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}
```

### Optional Chaining

```javascript
const fetchedUserData = {
  id: '123',
  name: 'js',
  job: { title: 'CEO', description: 'My own company' }
}

// error
console.log(fetchedUserData.job && fetchedUserData.job.title)

// TS approach: '?' like in Kotlin
console.log(fetchUserData?.job?.title)
```

### Nullish Coalescing

```javascript
const userInput = null

// JS approach
// But if userInput = '' or undefined, 'DEFAULT' will be stored
const storedData = userInput || 'DEFAULT'

// TS approach: '??' - if null or undefined, use 'DEFAULT'
const storedData = userInput ?? 'DEFAULT'
```

---

## Generics

### Generic Basics

```javascript
const names: string[] = []
const names: Array<string> = []

// Promise<unknown> - TS doesn't know what type it will resolve
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('done')
  }, 2000)
})

promise.then((data) => {
  data.split(' ') // if don't give Promise<string>, you can't call string method here
})
```

### Creating a Generic Function

```javascript
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB)
}

const merged = merge({ name: 'J' }, { age: 24 })
merged.name // error, if without generic type

// TS Generic Types
// name convention - T U
// TS implicitly sets the return type - T & U
function merge<T, U>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB)
}

// fill in different concrete types
const merged = merge({ name: 'J' }, { age: 24 })
const merged2 = merge({ name: 'J', job: 'student' }, { age: 24 })
merged.name // ok
merged2.job // ok
```

### Generic Constraints

```javascript
// constraint - we want T and U be object
function merge<T extends object, U extends object>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB)
}

const merged = merge({ name: 'J' }, 24) // error
```

### Another Generic Function

```javascript
// need to let TS know that T must have a length property
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = 'Got no value'
  if (element.length === 1) {
    description = 'Got 1 element'
  } else if (element.length > 1) {
    description = 'Got many element'
  }

  return [element, description]
}
```

### The 'keyof' Constraint

```javascript
// keyof let TS know that key should any key in obj
function extract<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]
}
```

### Generic Classes

```javascript
class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem(10) // error

const numberStorage = new DataStorage<number | string>()

// a small glitch if we don't set T extends string | number | boolean and just use T
// then we can use object as T
const objStorage = new DataStorage<object>()
objStorage.addItem({name: 'Max'})
objStorage.addItem({name: 'Manu'})
//...
objStorage.removeItem({name: 'Max'}) // wrong
// Since JS object are reference type, splice doesn't work with reference unless it was given the same address
// splice will return -1, which means the last item, so the result is wrong
```

### Utility Types

> only exist in TS

- Partial
- Readonly
- ...

```javascript
interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

// Partial type
// tells TS it will in the end be something
// in the process all the properties are optional, so you can assign it {}
function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date
  return courseGoal as CourseGoal
}

// Readonly type
const names: Readonly<string[]> = ['Max', 'Jin']
name.push('John') // error
```

---

## Decorators - Meta-Programming

### Decarator Basics

- Decorator is just a function
- Decorator runs when JS finds your class defination, not when you instantiate the class

```javascript
function Logger(constructor: Function) {
  console.log('Logging')
  console.log(constructor)
}

@Logger
class Person {
  name = 'J'

  constructor() {
    console.log('Creating person object')
  }
}
```

### Decorator Factory

```javascript
function Logger(logString: strings) {
  return funtion(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

@Logger('LOGGING - PERSON')
class Person {
  name = 'J'

  constructor() {
    console.log('Creating person object')
  }
}
```

### Useful Decorators

- '\_' means I know it receives a argument but I don't need it and use it
- Angular uses more advanced Decorator

```javascript
function Logger(logString: strings) {
  console.log('LOGGER FACTORY')
  return funtion(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY')
  // return function(_: Function) {
  return function(constructor: any) {
    console.log('Rendering template...')
    const hookEl = document.getElementById(hookId)
    const person = new constructor()
    if (hookEl) {
      hookEl.innerHTML = template
      hookEl.querySelector('h1')!.textContent = person.name
    }
  }
}

// Adding multiple Decorators
// Order: Bottom out - @WithTemplate first, then @Logger
@Logger('Logging')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'J'

  constructor() {
    console.log('Creating person object')
  }
}

// output
// LOGGER FACTORY
// TEMPLATE FACTORY
// Rendering template...
// Creating person object
// LOGGING
// class Person {
//  ...
// }
// Creating person object
// Person {name: 'J'}
```

### Property Decorators

- Property Decorators receive 2 arguments
- It runs when your class defination registered by JS

```javascript
function Log(target: any, propName: string | Symbol) {
  console.log('[Property Decorator]')
  console.log(target, propName)
}

class Product {
  @Log
  title: string
  _price: number

  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Error')
    }
  }

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax)
  }
}
```

### Accessor & Parameter Decorators

```javascript
// Accessor Decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('[Accessor Decorator]')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// Method Decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('[Method Decorator]')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// Parameter Decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('[Parameter Decorator]')
  console.log(target)
  console.log(name)
  console.log(position)
}

class Product {
  @Log
  title: string
  _price: number

  // Accessor Decorator
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Error')
    }
  }

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  // Method Decorator & Parameter Decorator
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}
```

### Decorator Execution Order

> All decorators run when you define the class, not at runtime when you work with a property or method

### Returning a Class in a Class Decorator

```javascript
function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY')
  // <T extends {new(...args: any[])>
  return function<T extends {new(...args: any[]): {name: string}}>(constructor: any) {
    // This new constructor/class replaces the old constructor/class
    // but we extends originalConstructor to save the old logic
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super() // call originalConstructor, do all old logic

        // and add new logic down below
        console.log('Rendering template...')

        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}

@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'J'

  constructor() {
    console.log('Creating person object')
  }
}

// The decorator only runs when instantiating the class
const person = new Person()
```

### Other Decorator Return Types

Decorators that can return something:

- method
- accessor

Both of them receive _PropertyDescription_ as argument, so you can **return a brand new PropertyDescriptor**

### Creating an 'Autobind' Decorator

```html
<body>
  <div id="app"></div>
  <button>Click me</button>
</body>
```

```javascript
function Autobind(_: any, _2:string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // add extra logic before original method
      const boundFn = originalMethod.bind(this) // this = the one that triggers the getter method = getter method will be triggered by the concrete object it belongs
      return boundFn
    }
  }
  return adjDescriptor
}

class Printer {
  message = "This works"

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer()
const button = document.querySelector('button')!

// output: undefined
// since 'this' is binded to the target of the event
button.addEventListener('click', p.showMessage)

// 1. JS approach - bind
button.addEventListener('click', p.showMessage.bind(p))

// 2. TS approach - Decorator
button.addEventListener('click', p.showMessage)
```

### Validation with Decorators

> Many third party Decorator Validator

```html
<body>
  <form>
    <input type="text" placeholder="Course title" id="title" />
    <input type="text" placeholder="Course price" id="price" />
    <button type="submit">Save</button>
  </form>
</body>
```

```javascript
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]

  if (!objValidatorConfig) {
    return true
  }

  let isValid = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch(validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
        case 'positive':
          isValid = isValid && obj[prop] > 0
      }
    }
  }
  return isValid
}

class Course {
  @Required
  title: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  // without validation
  const title = titleEl.value // also works for ''
  const price = +priceEl.value // also works for '', which is converted to 0

  const createdCourse = new Course(title, price)

  // with validation
  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!')
    return
  }

  console.log(createdCourse)
})
```

---

## Modules and Namespaces

### Splitting Code Into Multiple Files

Namespaces & File Bunding:

- Use "namespace" code syntax to group code
- Per-file or bundled compilation is possible (less imports to manage)

ES6 Imports/Exports:

- Use ES6 import/export syntax
- Per-file compilation but single \<script\> import
- Bundling via third-party tools (e.g. Webpack) is possible
