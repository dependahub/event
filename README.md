[![Node.js Version](https://img.shields.io/badge/node-20.x-brightgreen.svg)](https://nodejs.org/)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray&logoSize=auto)](https://github.com/xojs/xo)

# event

軽量なイベント管理システム

## Install

```bash
npm i @dependahub/event
```

## Example

```javascript
import {event} from '@dependahub/event';

// イベントの購読 A
const subscriptionA = event.subscribe('eventName', async payload => {
  // 何らかの処理A
});

// イベントの購読 B
const subscriptionB = event.subscribe('eventName', async payload => {
  // 何らかの処理B
});

// イベントの購読解除
subscriptionA.unsubscribe();

// イベントの発火
await event.push('eventName', payload); // subscriptionB のみ発火

// イベントの削除
event.remove('eventName');
await event.push('eventName', payload); // 何も発火しません
```

## Features

### イベントの購読

イベント名を指定して購読登録します。イベント発火時には第2引数のコールバック関数が実行されます。

```javascript
const subscription = event.subscribe('eventName', async payload => {
  // イベント発火時に実行する処理
  console.log('イベントを受信しました:', payload);
});
```

### イベントの購読解除

subscribe()の戻り値から購読を解除できます。

```javascript
// 購読を解除
subscription.unsubscribe();
```

### イベントの送信

指定したイベント名に対して、データ(payload)を送信します。登録されているすべてのコールバック関数が非同期に実行されます。

```javascript
// payloadには任意のデータを渡せます
const payload = { message: 'こんにちは', timestamp: Date.now() };
await event.push('eventName', payload);
```

### イベントの削除

指定したイベント名に関連するすべての購読を削除します。

```javascript
// eventNameに登録されているすべての購読が削除されます
event.remove('eventName');
```

## ライセンス

こちらのリポジトリは [MITライセンス](https://opensource.org/license/MIT) の元にオープンソースで作成されています。
