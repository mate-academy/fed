# Rules description

## closing-and-opening-on-seme-level
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
