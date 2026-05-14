# binutil

JavaScriptでバイナリデータを扱うためのユーティリティ関数群です。

## 機能

- `bin2short`, `short2bin`: 16ビット整数（short）とバイナリデータの相互変換
- `bin2i`, `i2bin`: 32ビット整数とバイナリデータの相互変換
- `subbin`: バイナリデータの一部を抽出
- `setbin`: バイナリデータの一部を設定
- `bincat`: 複数のバイナリデータを結合
- `eqbin`: バイナリデータの等価性を比較

## 使い方

`binutil`ライブラリは、JavaScriptプロジェクトにインポートして使用できるスタンドアロンの関数群として提供されています。

```javascript
import { bin2short, short2bin, i2bin, bin2i, bincat, eqbin, setbin, subbin } from 'binutil';
```

## BinWriter と BinReader

本ライブラリには `BinWriter` および `BinReader` クラスも含まれており、バイナリデータを操作するためのよりオブジェクト指向なインターフェースを提供します。

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

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
