import * as t from "https://deno.land/std/testing/asserts.ts";
import { bin2short, short2bin, i2bin, bin2i } from "./binutil.js";

Deno.test("short bigendian", () => {
  const b = new Uint8Array(10);
  short2bin(b, 2, 1024);
  t.assertEquals(bin2short(b, 2), 1024);
  t.assertEquals(bin2short(b, 0), 0);
  t.assertEquals(bin2short(b, 1), 1024 >> 8);
  t.assertEquals(bin2short(b, 3), 1024 & 0xff);
});
Deno.test("short littleendian", () => {
  const b = new Uint8Array(10);
  short2bin(b, 2, 1024, true);
  t.assertEquals(bin2short(b, 2, true), 1024);
  t.assertEquals(bin2short(b, 0, true), 0);
  t.assertEquals(bin2short(b, 1, true), 1024 & 0xff);
  t.assertEquals(bin2short(b, 3, true), 1024 >> 8);
});
Deno.test("int", () => {
  const b = new Uint8Array(10);
  i2bin(b, 2, 123456);
  t.assertEquals(bin2i(b, 2), 123456);  
  i2bin(b, 6, 123456, true);
  t.assertEquals(bin2i(b, 6, true), 123456);
  t.assert(b[2] != b[6]);
  t.assert(b[2 + 3] == b[6]);
});
