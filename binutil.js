export const bin2s = (bin, n, len) => {
  const b = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    b[i] = bin[i + n];
  }
  return new TextDecoder().decode(b);
};
export const bin2i = (bin, n, littleendian) => { // default bigendian
  if (littleendian) {
    return ((bin[n + 3] & 0xff) << 24) | ((bin[n + 2] & 0xff) << 16) | ((bin[n + 1] & 0xff) << 8) | (bin[n] & 0xff);
  } else {
    return ((bin[n] & 0xff) << 24) | ((bin[n + 1] & 0xff) << 16) | ((bin[n + 2] & 0xff) << 8) | (bin[n + 3] & 0xff);
  }
};
export const bin2short = (bin, n, littleendian) => { // bigendian
  if (littleendian) {
    return ((bin[n + 1] & 0xff) << 8) | (bin[n] & 0xff);
  } else {
    return ((bin[n] & 0xff) << 8) | (bin[n + 1] & 0xff);
  }
};
export const subbin = (bin, n, len) => { // use Uint8Array#subarray
  if (len === undefined) {
    len = bin.length - n;
  }
  return bin.subarray(n, n + len);
};
export const setbin = (bin, off, b) => { // use Uint8Array#set
  bin.set(b, off);
  return bin;
};
export const i2bin = (b, off, n, littleendian) => { // big endian
  if (littleendian) {
    b[off + 3] = (n >> 24) & 0xff;
    b[off + 2] = (n >> 16) & 0xff;
    b[off + 1] = (n >> 8) & 0xff;
    b[off] = n & 0xff;
  } else {
    b[off] = (n >> 24) & 0xff;
    b[off + 1] = (n >> 16) & 0xff;
    b[off + 2] = (n >> 8) & 0xff;
    b[off + 3] = n & 0xff;
  }
};
export const short2bin = (b, off, n, littleendian) => { // big endian
  if (littleendian) {
    b[off + 1] = (n >> 8) & 0xff;
    b[off] = n & 0xff;
  } else {
    b[off] = (n >> 8) & 0xff;
    b[off + 1] = n & 0xff;
  }
};
export const s2bin = (bin, off, s) => {
  setbin(bin, off, new TextEncoder().encode(s));
};
export const bincat = (...bins) => {
  const len = bins.reduce((pre, cur) => pre + cur.length, 0);
  const bin = new Uint8Array(len);
  let idx = 0;
  bins.forEach(b => {
    bin.set(b, idx);
    idx += b.length;
  });
  return bin;
};
export const eqbin = (bin1, bin2) => {
  if (bin1 == bin2) {
    return true;
  }
  if (!bin1 || !bin2) {
    return false;
  }
  if (bin1.length != bin2.length) {
    return false;
  }
  for (let i = 0; i < bin1.length; i++) {
    if (bin1[i] != bin2[i]) {
      return false;
    }
  }
  return true;
};
export const findbin = (bin, chk, offset = 0) => {
  if (typeof chk == "string") chk = new TextEncoder().encode(chk);
  A: for (let i = offset; i <= bin.length; i++) {
    for (let j = 0; j < chk.length; j++) {
      if (bin[i + j] != chk[j]) continue A;
    }
    return i;
  }
  return -1;
};
