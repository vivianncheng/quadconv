# QuadConv
Make quick and easy conversions between Decimal, ASCII, Binary, and Hexadecimal!

## Install
Install QuadConv via [NPM](https://www.npmjs.com)
```bash
$ npm i quadconv
```
or
```bash
$ npm install quadconv
```

## Use
```javascript
const QuadConv = require("quadconv");

// returns converted string
// returns "null", "NaN", or "" if there's an issue with conversion
QuadConv.convert(conversion, input);
```
or
```javascript
const QuadConv = require("quadconv");

// returns converted string
// throws an error if there's an issue with conversion
QuadConv.convert(conversion, input, true);
```

## Key
```javascript
QuadConv.convert('[input type]-[output type]', '[input]', boolean);
```
**Input/Output Types** \
dec - Decimal \
asc - ASCII \
bin - Binary \
hex - Hexadecimal

**Boolean (true/false)** \
true - throw an Error if there's an issue with conversion \
false - return null/NaN/empty string if there's an issue with conversion


## Examples
```javascript
// converts ASCII to Decimal
// returns '104 101 108 108 111 32 119 111 114 108 100'
QuadConv.convert('asc-dec', 'hello world');

// converts Binary to Hexadecimal
// returns '68 69 21'
QuadConv.convert('bin-hex', '1101000 1101001 100001');

// converts Decimal to Binary
// returns '111000'
QuadConv.convert('dec-bin', '56');

```

## Contact
Find my links [here!](https://links.viviancheng.com)

Thanks for checking out QuadConv! This was a quick project that I made and also my first project deployed onto NPM, first published in 2022. -Vi
