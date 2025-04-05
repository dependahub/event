# event

軽量イベントシステム

## example

```javascript
import {event} from '@dependahub/event';

// イベントの登録 A
const subscriptionA = event.subscribe('eventName', async payload => {
  // 何らかの処理A
});

// イベントの登録 B
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
