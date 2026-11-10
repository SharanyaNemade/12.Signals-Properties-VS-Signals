# Angular21

# Angular Signals in Angular 21 – Complete Guide with Examples

Angular Signals are one of the most important features of modern Angular. They provide a simple and efficient way to manage reactive state, track changes, and automatically update the UI when data changes.

In Angular 21, Signals are an important part of building reactive applications and reducing unnecessary change detection work.

Let's understand Signals from beginner to practical level with TypeScript examples and a complete counter application.

## 1. What are Angular Signals?

A Signal is a reactive wrapper around a value that allows Angular to track when that value changes and which parts of the application depend on it.

In simple words:

- A normal property stores a value.
- A Signal stores a value and notifies Angular when that value changes.
- Angular automatically updates dependent UI when the Signal changes.

### Normal property example

typescript

```typescript
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
```

### Signal example

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h2>Count: {{ count() }}</h2>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update(value => value + 1);
  }
}
```

Notice the difference:

typescript

```typescript
// Normal property
count = 0;

// Signal
count = signal(0);

// Read Signal
count();

// Update Signal
count.set(10);

// Update based on previous value
count.update(value => value + 1);
```

Important: You read a Signal by calling it like a function: `count()`.

## 2. Why are Signals better than normal properties?

Signals provide explicit reactivity. Angular knows which components, computed values, and effects depend on a particular Signal.

Consider these differences:

| Feature | Normal property | Signal |
| --- | --- | --- |
| Stores data | Yes | Yes |
| Tracks dependencies | No | Yes |
| Reactive updates | Not inherently | Yes |
| Automatic dependency tracking | No | Yes |
| Computed values | Manual | `computed()` |
| Side-effect tracking | Manual | `effect()` |
| Update API | Assignment | `set()` / `update()` |

### Example: Normal property

typescript

```typescript
export class UserComponent {
  firstName = 'John';
  lastName = 'Smith';

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
```

Here, Angular does not track the dependencies of `fullName` as Signals.

### Example: Using Signals

typescript

```typescript
import { signal, computed } from '@angular/core';

export class UserComponent {
  firstName = signal('John');
  lastName = signal('Smith');

  fullName = computed(() =>
    this.firstName() + ' ' + this.lastName()
  );
}
```

Now Angular tracks both dependencies automatically.

Whenever `firstName` or `lastName` changes, `fullName` is recalculated when next read.

Main advantage: Signals make data dependencies explicit and allow Angular to perform more targeted reactive updates.

## 3. How to define and update Signals

Angular provides three basic operations for working with writable Signals.

### A. Define a Signal

Use `signal()` from `@angular/core`.

typescript

```typescript
import { signal } from '@angular/core';

export class StudentComponent {
  name = signal('Rahul');
  age = signal(25);
  isActive = signal(true);
}
```

Signals support different data types:

typescript

```typescript
count = signal<number>(10);

username = signal<string>('John');

isLoggedIn = signal<boolean>(false);

users = signal<string[]>(['John', 'David', 'Alex']);
```

### B. Update using set()

`set()` replaces the existing value.

typescript

```typescript
count = signal(10);

changeCount() {
  this.count.set(50);
}
```

### C. Update using update()

`update()` modifies a value based on its previous value.

typescript

```typescript
count = signal(10);

increment() {
  this.count.update(value => value + 1);
}

decrement() {
  this.count.update(value => value - 1);
}
```

### D. Update object Signals

For objects, create a new object rather than mutating the existing object.

typescript

```typescript
user = signal({
  name: 'Rahul',
  age: 25
});

updateUser() {
  this.user.update(current => ({
    ...current,
    age: 26
  }));
}
```

### E. Make a Signal read-only

Sometimes you want to allow other components to read a Signal but not update it.

typescript

```typescript
private _count = signal(0);

count = this._count.asReadonly();

increment() {
  this._count.update(value => value + 1);
}
```

Consumers can call `count()` but cannot call `count.set()`.

## 4. What are the types of Signals in Angular?

For learning purposes, we can divide the main Signal concepts into three categories:

1. Writable Signal

Mutable

Stores values and allows updates using `set()` and `update()`.

typescript

```typescript
count = signal(10);
count.set(20);
```

2. Computed Signal

Read-only

Calculates a value from other Signals.

typescript

```typescript
double = computed(() => this.count() * 2);
```

3. Effect

Side effect

Executes code when the Signals it reads change.

typescript

```typescript
effect(() => {
  console.log(this.count());
});
```

Technically, `effect()` is not a Signal. It is a reactive API that observes Signals.

### 4.1 Writable Signals

A Writable Signal allows you to read and modify values.

typescript

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <h2>{{ count() }}</h2>
    <button (click)="changeValue()">Change</button>
  `
})
export class DemoComponent {
  count = signal(10);

  changeValue() {
    this.count.set(100);
  }
}
```

### 4.2 Computed Signals

A Computed Signal derives its value from one or more Signals.

Example:

typescript

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <h2>Price: {{ price() }}</h2>
    <h2>Quantity: {{ quantity() }}</h2>
    <h2>Total: {{ total() }}</h2>

    <button (click)="increaseQuantity()">
      Add Quantity
    </button>
  `
})
export class DemoComponent {

  price = signal(100);
  quantity = signal(2);

  total = computed(() =>
    this.price() * this.quantity()
  );

  increaseQuantity() {
    this.quantity.update(value => value + 1);
  }
}
```

Initially:

- Price = 100
- Quantity = 2
- Total = 200

After clicking the button:

- Price = 100
- Quantity = 3
- Total = 300

You don't need to manually update `total`.

Important properties of computed Signals:

- They are read-only.
- They automatically track dependencies.
- They are lazily evaluated.
- Their results are memoized (cached until invalidated).

### 4.3 Effect Signals (effect())

An effect executes code whenever the Signals it reads change.

Example:

typescript

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <h2>{{ count() }}</h2>
    <button (click)="increment()">Increment</button>
  `
})
export class DemoComponent {

  count = signal(0);

  constructor() {
    effect(() => {
      console.log('Count changed:', this.count());
    });
  }

  increment() {
    this.count.update(value => value + 1);
  }
}
```

How does effect() work?

1. Angular creates the effect.
2. It executes the callback at least once.
3. It detects which Signals are accessed inside the callback.
4. When one of those Signals changes, Angular schedules the effect to execute again.
5. Angular tracks dependencies again during each execution.

For example:

typescript

```typescript
effect(() => {
  console.log(this.count());
});
```

If `count` changes from 0 to 1 to 2, the effect runs initially and then again for the changes.

Effects execute asynchronously as part of Angular's scheduling and synchronization process; do not assume they run immediately inside set() or update().

### When should you use effect()?

Good use cases:

- Logging values for debugging.
- Saving Signal values to localStorage.
- Integrating with third-party JavaScript libraries.
- Synchronizing with APIs that aren't Signal-aware.

Example: Save a value to localStorage.

typescript

```typescript
count = signal(0);

constructor() {
  effect(() => {
    localStorage.setItem(
      'count',
      this.count().toString()
    );
  });
}
```

Important: Avoid using effects to copy values from one Signal into another. Prefer `computed()` for derived state. Angular recommends effects primarily for synchronizing with non-reactive APIs.

Angular

+1

## 5. How to detect value changes inside TypeScript?

There are different approaches depending on whether you use normal properties or Signals.

### Method 1: Using a setter

For normal TypeScript properties, you can use getters and setters.

typescript

```typescript
export class UserComponent {

  private _name = '';

  set name(value: string) {
    this._name = value;
    console.log('Name changed:', value);
  }

  get name() {
    return this._name;
  }
}
```

Whenever you assign a new value to `name`, the setter executes.

typescript

```typescript
this.name = 'Rahul';
```

### Method 2: Using effect() with Signals

typescript

```typescript
export class DemoComponent {

  username = signal('John');

  constructor() {
    effect(() => {
      console.log(
        'Username changed:',
        this.username()
      );
    });
  }

  updateName() {
    this.username.set('David');
  }
}
```

The effect runs initially and whenever the tracked Signal changes.

### Method 3: Using Angular ngOnChanges()

If you want to detect changes to component inputs, Angular provides `ngOnChanges()`.

typescript

```typescript
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-user',
  template: `{{ name }}`
})
export class UserComponent implements OnChanges {

  @Input() name = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name']) {
      console.log(
        'Previous:',
        changes['name'].previousValue
      );

      console.log(
        'Current:',
        changes['name'].currentValue
      );
    }
  }
}
```

### Comparison

| Approach | Best use case |
| --- | --- |
| Setter | Normal TypeScript property |
| `effect()` | Signal value changes |
| `ngOnChanges()` | Angular component input changes |
| RxJS `subscribe()` | Observable value changes |

## 6. Build a Counter App using Angular Signals

Let's create a complete counter application with:

- Increment
- Decrement
- Reset
- Double count using `computed()`
- Logging using `effect()`

Tauri - Crux: Cross-platform app development in Rust

[redbadger.github.io](<https://redbadger.github.io/crux/latest_master/part-3/platforms/tauri.html?utm_source=chatgpt.com>)

### Step 1: Generate component

bash

```bash
ng generate component counter
```

### Step 2: counter.component.ts

typescript

```typescript

import {
  Component,
  signal,
  computed,
  effect
} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  // Writable Signal
  count = signal<number>(0);

  // Computed Signal
  doubleCount = computed(() => this.count() * 2);

  constructor() {

    // Effect
    effect(() => {
      console.log(
        'Current Count:',
        this.count()
      );
    });

  }

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  reset() {
    this.count.set(0);
  }

}
```

### Step 3: counter.component.html

HTMLWrap linesCopy codePreview

```html

<div class="counter-container">

  <h1>Angular Signals Counter</h1>

  <h2>Count: {{ count() }}</h2>

  <h3>Double Count: {{ doubleCount() }}</h3>

  <button (click)="increment()">
    Increment
  </button>

  <button (click)="decrement()">
    Decrement
  </button>

  <button (click)="reset()">
    Reset
  </button>

</div>
```

### Step 4: Run application

bash

```bash
ng serve
```

Open the application in your browser.

### Try the counter

Angular Signals Counter – Demo

# 0

Double Count: 0

Decrement  Increment

 Reset

Interactive preview of the counter's behavior. The Angular implementation is in the TypeScript and HTML code above.

## 7. Difference between Angular Signals and React State

Angular Signals and React State solve a similar problem: managing reactive application data.

However, their implementation and update mechanisms are different.

| Feature | Angular Signals | React State |
| --- | --- | --- |
| State creation | `signal()` | `useState()` |
| Read value | `count()` | `count` |
| Update value | `count.set(10)` | `setCount(10)` |
| Functional update | `count.update(v => v + 1)` | `setCount(v => v + 1)` |
| Derived state | `computed()` | Usually `useMemo()` |
| Side effects | `effect()` | `useEffect()` |
| Dependency tracking | Automatic | Explicit dependency arrays for hooks |
| UI update | Reactive consumers are notified | State update schedules a render |

### Angular example

typescript

```typescript
count = signal(0);

increment() {
  this.count.update(value => value + 1);
}
```

HTML:

HTMLWrap linesCopy codePreview

```html
<h2>{{ count() }}</h2>
<button (click)="increment()">Add</button>
```

### React example

jsx

```jsx
import { useState } from 'react';

function Counter() {

  const [count, setCount] = useState(0);

  return (
    <>
      <h2>{count}</h2>

      <button onClick={() =>
        setCount(value => value + 1)
      }>
        Add
      </button>
    </>
  );
}
```

### Main difference

In Angular, Signals provide automatic dependency tracking. Angular knows which reactive consumers depend on a Signal.

In React, updating state schedules a component render, and React determines which parts of the UI need updating.

Remember: Angular Signals are conceptually similar to React state, but they are not exactly the same mechanism.

## 8. Common mistakes developers make with Angular Signals

These are some important mistakes to avoid when working with Signals.

### Mistake 1: Reading a Signal without parentheses

Incorrect:

typescript

```typescript
count = signal(10);

console.log(count);
```

Correct:

typescript

```typescript
console.log(count());
```

Why?

A Signal is a getter function. You must call it to access its current value.

### Mistake 2: Updating a Signal using normal assignment

Incorrect:

typescript

```typescript
count = signal(10);

this.count = 20;
```

Correct:

typescript

```typescript
this.count.set(20);
```

### Mistake 3: Trying to update a computed Signal

Incorrect:

typescript

```typescript
count = signal(10);

doubleCount = computed(() => this.count() * 2);

this.doubleCount.set(100);
```

Correct:

typescript

```typescript
this.count.set(50);
```

The computed value automatically becomes 100.

### Mistake 4: Using effect() instead of computed()

Incorrect:

typescript

```typescript
count = signal(10);
doubleCount = signal(0);

constructor() {
  effect(() => {
    this.doubleCount.set(this.count() * 2);
  });
}
```

Better:

typescript

```typescript
count = signal(10);

doubleCount = computed(() => this.count() * 2);
```

Why?

`computed()` is designed for derived values. It avoids maintaining duplicate state.

### Mistake 5: Mutating objects directly

Incorrect:

typescript

```typescript
user = signal({
  name: 'John',
  age: 25
});

updateUser() {
  this.user().age = 30;
}
```

Correct:

typescript

```typescript
updateUser() {
  this.user.update(current => ({
    ...current,
    age: 30
  }));
}
```

Why?

Directly mutating an object does not notify Angular that the Signal has changed. Create a new object and update the Signal instead.

### Mistake 6: Assuming effect() runs immediately

Incorrect assumption:

typescript

```typescript
this.count.set(10);

console.log('Updated');
```

You should not assume an effect observing `count` has already executed at the point where `set()` returns.

Effects are scheduled by Angular.

### Mistake 7: Using Signals everywhere

Not every variable needs to be a Signal.

For example:

typescript

```typescript
export class UserComponent {

  // Normal property
  title = 'User Management';

  // Signal for reactive state
  users = signal<string[]>([]);

}
```

Use Signals when you need reactive state. Normal properties are perfectly fine for static values or ordinary non-reactive data.

### Mistake 8: Expecting asReadonly() to prevent deep mutation

typescript

```typescript
private _user = signal({
  name: 'John'
});

user = this._user.asReadonly();
```

This prevents consumers from calling `set()` or `update()` on the exposed Signal.

However, it does not deeply freeze the object returned by `user()`.

## 9. Additional Signal APIs worth knowing in Angular 21

Beyond the three concepts we covered, Angular provides additional reactive APIs.

| API | Purpose |
| --- | --- |
| `signal()` | Create writable state |
| `computed()` | Derive read-only state |
| `effect()` | Synchronize with non-reactive APIs |
| `linkedSignal()` | Create writable state linked to another reactive value |
| `input()` | Create Signal-based component inputs |
| `model()` | Create a two-way bindable model Signal |
| `resource()` | Manage asynchronous data reactively |

### Example: linkedSignal()

Suppose you have a product quantity that normally follows a default value but can also be manually changed.

typescript

```typescript
import {
  signal,
  linkedSignal
} from '@angular/core';

export class ProductComponent {

  defaultQuantity = signal(5);

  quantity = linkedSignal(
    () => this.defaultQuantity()
  );

  updateQuantity() {
    this.quantity.set(10);
  }
}
```

Unlike `computed()`, `linkedSignal()` is writable.

It is useful when a value should normally derive from another Signal but also needs manual updates.

### Example: input() Signal

typescript

```typescript
import {
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <h2>{{ username() }}</h2>
  `
})
export class UserComponent {

  username = input<string>('Guest');

}
```

The parent component can pass the input value, and the child reads it using `username()`.

Angular 21 supports these modern Signal-based APIs.

Angular

+2

## 10. Quick revision: Angular Signals

| Concept | Meaning | Example |
| --- | --- | --- |
| Signal | Reactive value | `signal(0)` |
| Writable Signal | Mutable reactive state | `count.set(10)` |
| Read Signal | Access current value | `count()` |
| Update Signal | Modify existing value | `count.update(v => v + 1)` |
| Computed | Derived reactive value | `computed(() => count() * 2)` |
| Effect | React to Signal changes | `effect(() => console.log(count()))` |
| Readonly | Expose read-only state | `count.asReadonly()` |
| Linked Signal | Writable derived state | `linkedSignal(() => count())` |

## 11. Interview questions to practice

Here are 10 important Angular Signals interview questions:

1. What are Angular Signals and why were they introduced?
2. What is the difference between `signal()` and `computed()`?
3. What is the difference between `set()` and `update()`?
4. What is `effect()` and when should you use it?
5. Can we update a computed Signal?
6. How does Angular automatically track Signal dependencies?
7. What is the difference between Signals and RxJS Observables?
8. What is `linkedSignal()` and when should we use it?
9. How do Signals work with OnPush change detection?
10. What happens when we directly mutate an object inside a Signal?


## Final takeaway

The most important things to remember:

- `signal()` stores reactive data.
- `set()` replaces the existing value.
- `update()` modifies a value based on its previous value.
- `computed()` derives values automatically.
- `effect()` runs side-effect code when tracked Signals change.
- `linkedSignal()` supports writable state derived from other state.

My recommendation: Start by building small applications using `signal()`, `computed()`, and `effect()`. Then move on to `input()`, `model()`, and `linkedSignal()`.

Once you understand these concepts, managing reactive state in modern Angular becomes much easier.
