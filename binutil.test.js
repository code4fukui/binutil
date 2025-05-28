import * as t from "https://deno.land/std/testing/asserts.ts";
import { bin2short, short2bin } from "./binutil.js";

Deno.test("short", () => {
  const b = new Uint8Array(10);
  short2bin(b, 2, 1024);
  t.assertEquals(bin2short(b, 2), 1024);
  t.assertEquals(bin2short(b, 0), 0);
  t.assertEquals(bin2short(b, 1), 1024 >> 8);
  t.assertEquals(bin2short(b, 3), 1024 & 0xff);
});
