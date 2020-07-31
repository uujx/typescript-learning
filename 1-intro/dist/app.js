"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var registeredValidators = {};
function Required(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = ['required'], _a));
}
function PositiveNumber(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = ['positive'], _a));
}
function validate(obj) {
    var objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    var isValid = true;
    for (var prop in objValidatorConfig) {
        for (var _i = 0, _a = objValidatorConfig[prop]; _i < _a.length; _i++) {
            var validator = _a[_i];
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
            }
        }
    }
    return isValid;
}
var Course = /** @class */ (function () {
    function Course(t, p) {
        this.title = t;
        this.price = p;
    }
    __decorate([
        Required
    ], Course.prototype, "title", void 0);
    __decorate([
        PositiveNumber
    ], Course.prototype, "price", void 0);
    return Course;
}());
var courseForm = document.querySelector('form');
courseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var titleEl = document.getElementById('title');
    var priceEl = document.getElementById('price');
    // without validation
    var title = titleEl.value; // also works for ''
    var price = +priceEl.value; // also works for '', which is converted to 0
    var createdCourse = new Course(title, price);
    // with validation
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
});
