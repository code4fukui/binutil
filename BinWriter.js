import { IEEE32 } from "https://code4fukui.github.io/IEEE754/IEEE32.js";
import { BinReader } from "./BinReader.js";
export class BinWriter extends BinReader {
  p = 0;
  constructor(n_or_bin = 1024, littleendian = true) {
    super(
      typeof n_or_bin == "number" ? new Uint8Array(n_or_bin) : n_or_bin,
      littleendian
    );
  }
  _extends() {
    const bin = new Uint8Array(this.bin.length * 2);
    for (let i = 0; i < this.bin.length; i++) {
      bin[i] = this.bin[i];
    }
    this.bin = bin;
    return this.bin;
  }
  writeUint32(n) {
    const p = this.p;
    let b = this.bin;
    if (p + 4 > b.length) b = this._extends();
    if (this.le) {
      b[p + 3] = n >> 24;
      b[p + 2] = n >> 16;
      b[p + 1] = n >> 8;
      b[p] = n;
      this.p += 4;
    } else {
      b[p] = n >> 24;
      b[p + 1] = n >> 16;
      b[p + 2] = n >> 8;
      b[p + 3] = n;
      this.p += 4;
    }
  }
  writeUint16(n) {
    const p = this.p;
    let b = this.bin;
    if (p + 2 > b.length) b = this._extends();
    if (this.le) {
      b[p + 1] = n >> 8;
      b[p] = n;
      this.p += 2;
    } else {
      b[p] = n >> 8;
      b[p + 1] = n;
      this.p += 2;
    }
  }
  writeBytes(buf, len) {
    const p = this.p;
    let b = this.bin;
    if (len === undefined) {
      len = buf.length;
    }
    while (p + len > b.length) b = this._extends();
    const len2 = Math.min(len, buf.length);
    for (let i = 0; i < len2; i++) {
      b[p + i] = buf[i];
    }
    for (let i = len2; i < len; i++) {
      b[p + i] = 0;
    }
    this.p += len;
  }
  writeString(s, len) {
    const bin = new TextEncoder().encode(s);
    this.writeBytes(bin, len);
  }
  writeFloat32(f) {
    if (!this.le) throw new Error("big endian not spported");
    const bin = IEEE32.encode([f]);
    this.writeBytes(bin);
  }
  toBytes() {
    const res = new Uint8Array(this.p);
    for (let i = 0; i < res.length; i++) {
      res[i] = this.bin[i];
    }
    return res;
  }
}
