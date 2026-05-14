# binutil

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A set of utility functions for handling binary data in JavaScript.

## Features

- `bin2short`, `short2bin`: Convert between 16-bit short integers and binary data
- `bin2i`, `i2bin`: Convert between 32-bit integers and binary data
- `subbin`: Extract a subset of binary data
- `setbin`: Set a portion of binary data
- `bincat`: Concatenate multiple binary data
- `eqbin`: Compare binary data for equality

## Usage

The `binutil` library is available as a set of standalone functions that can be imported and used in your JavaScript project.

```javascript
import { bin2short, short2bin, i2bin, bin2i, bincat, eqbin, setbin, subbin } from 'binutil';
```

## BinWriter and BinReader

The library also includes `BinWriter` and `BinReader` classes, which provide a more object-oriented interface for working with binary data.

```javascript
import { BinWriter, BinReader } from 'binutil';

const writer = new BinWriter();
writer.writeUint32(123456);
writer.writeBytes(new Uint8Array([1, 2, 3]));
const data = writer.toBytes();

const reader = new BinReader(data);
const num = reader.readUint32();
const bytes = reader.readBytes(3);
```

## License

MIT License — see [LICENSE](LICENSE).