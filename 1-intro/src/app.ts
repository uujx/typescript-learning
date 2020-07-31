// function Autobind(_: any, _2:string, descriptor: PropertyDescriptor) {
//   console.log('[Autobind]')
//   const originalMethod = descriptor.value
//   const adjDescriptor: PropertyDescriptor = {
//     configurable: true,
//     enumerable: false,
//     get() {
//       // add extra logic before original method
//       const boundFn = originalMethod.bind(this) // this = the one that triggers the getter method = getter method will be triggered by the concrete object it belongs
//       return boundFn
//     }
//   }
//   return adjDescriptor
// }

// class Printer {
//   message = "This works"

//   @Autobind
//   showMessage() {
//     console.log(this.message)
//   }
// }

// const p = new Printer()
// const button = document.querySelector('button')!

// button.addEventListener('click', p.showMessage)

interface Function {
  name: string
}

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
