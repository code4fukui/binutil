import * as t from "https://deno.land/std/testing/asserts.ts";
import { BinWriter } from "./BinWriter.js";
import { IEEE32 } from "https://code4fukui.github.io/IEEE754/IEEE32.js";

Deno.test("simple", () => {
  const w = new BinWriter();
  w.writeUint32(1);
  t.assertEquals(w.toBytes(), new Uint8Array([1, 0, 0, 0]));
});
Deno.test("2 values", () => {
  const bin = new Uint8Array([1, 0, 0, 0, 2, 0xff, 0x12, 0x44]);
  const w = new BinWriter();
  w.writeUint32(1);
  w.writeUint32(0x4412ff02);
  t.assertEquals(w.toBytes(), bin);
});
Deno.test("2 values big endian", () => {
  const bin = new Uint8Array([1, 0, 0, 0, 2, 0xff, 0x12, 0x44]);
  const w = new BinWriter(4, false);
  w.writeUint32(0x01000000);
  w.writeUint32(0x02ff1244);
  t.assertEquals(w.toBytes(), bin);
});
Deno.test("writeUint16", () => {
  const w = new BinWriter();
  w.writeUint16(0x0102);
  t.assertEquals(w.toBytes(), new Uint8Array([2, 1]));
});
Deno.test("writeUint16 bigendian", () => {
  const w = new BinWriter(1024, false);
  w.writeUint16(0x0102);
  t.assertEquals(w.toBytes(), new Uint8Array([1, 2]));
});
Deno.test("writeBytes with len", () => {
  const w = new BinWriter();
  const bin = new Uint8Array([1, 2]);
  w.writeBytes(bin, 5);
  t.assertEquals(w.toBytes(), new Uint8Array([1, 2, 0, 0, 0]));
});
Deno.test("writeBytes with len 2", () => {
  const w = new BinWriter();
  const bin = new Uint8Array([1, 2]);
  w.writeBytes(bin, 1);
  t.assertEquals(w.toBytes(), new Uint8Array([1]));
});
Deno.test("writeString with len", () => {
  const w = new BinWriter();
  w.writeString("abc", 5);
  t.assertEquals(w.toBytes(), new Uint8Array([97, 98, 99, 0, 0]));
});
Deno.test("writeString with len2", () => {
  const w = new BinWriter();
  w.writeString("abc", 2);
  t.assertEquals(w.toBytes(), new Uint8Array([97, 98]));
});
Deno.test("writeString without len", () => {
  const w = new BinWriter();
  w.writeString("abc");
  t.assertEquals(w.toBytes(), new Uint8Array([97, 98, 99]));
});
/*

Deno.test("EOF", () => {
  const bin = new Uint8Array([1, 0, 0, 0, 2, 0xff, 0x12, 0x44, 1, 2, 3]);
  const r = new BinReader(bin);
  t.assertEquals(r.readUint32(), 1);
  t.assertEquals(r.readUint32(), 0x4412ff02);
  t.assertThrows(() => r.readUint32());
});
Deno.test("readBytes", () => {
  const bin = new Uint8Array([1, 0, 0, 0, 2, 0xff, 0x12, 0x44, 1, 2, 3]);
  const r = new BinReader(bin);
  t.assertEquals(r.readBytes(2), new Uint8Array([1, 0]));
  t.assertEquals(r.readBytes(4), new Uint8Array([0, 0, 2, 0xff]));
});
Deno.test("readString", () => {
  const bin = new Uint8Array([80, 88]);
  const r = new BinReader(bin);
  t.assertEquals(r.readString(2), "PX");
});
Deno.test("readFloat32", () => {
  const bin = IEEE32.encode([1, .5, .25]);
  const r = new BinReader(bin);
  t.assertEquals(r.readFloat32(), 1);
  t.assertEquals(r.readFloat32(), .5);
  t.assertEquals(r.readFloat32(), .25);
});
Deno.test("seek", () => {
  const bin = IEEE32.encode([1, .5, .25]);
  const r = new BinReader(bin);
  t.assertEquals(r.readFloat32(), 1);
  r.seek(-4);
  t.assertEquals(r.readFloat32(), 1);
  r.seek(4);
  //t.assertEquals(r.readFloat32(), .5);
  t.assertEquals(r.readFloat32(), .25);
  r.seekTo(4);
  t.assertEquals(r.readFloat32(), .5);
  t.assertEquals(r.readFloat32(), .25);
});
*/
