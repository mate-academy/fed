# Rules description

### Rules:
- [closing-bracket-location](https://mate-academy.github.io/fed/html-lint/rules-description.html#closing-bracket-location)
- [max-attrs-count-in-line](https://mate-academy.github.io/fed/html-lint/rules-description.html#max-attrs-count-in-line)

## closing-bracket-location

#### Description:
Tag’s closing bracket should be on the same level as opening one.

#### Usage:
```js
  "closing-bracket-location": <boolean>
```

- bad example
```html
<input type="text" name="surname"
       id="surname" required>
```
```html
<input type="text"
       name="surname"
       id="surname"
       required>
```
- good example
```html
<input
  type="text"
  name="surname"
  id="surname"
  required
>
```

## max-attrs-count-in-line

#### Description:
If the HTML-element has long attribute values or number of attributes is more than N - start each one, including the first, on the new line.

#### Usage:
```js
  "max-attrs-count-in-line": <number>
```

- bad example
```html
<input type="text" name="surname" id="surname" required>
```
```html
<input type="text" name="surname"
       id="surname" required
>
```
```html
<input type="text"
       name="surname"
       id="surname"
       required
>
```
- good example
```html
<input
  type="text"
  name="surname"
  id="surname"
  required
>
```
