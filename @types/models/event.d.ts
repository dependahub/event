/**
 * イベントモジュール
 * @example
 * import {event} from '@dependahub/event';
 *
 * // イベントの登録 A
 * const subscriptionA = event.subscribe('eventName', async payload => {
 *   // 何らかの処理 A
 * });
 *
 * // イベントの登録 B
 * const subscriptionB = event.subscribe('eventName', async payload => {
 *   // 何らかの処理 B
 * });
 *
 * // イベントの購読解除
 * subscriptionA.unsubscribe();
 *
 * // イベントの発火
 * await event.push('eventName', payload); // subscriptionB のみ発火
 *
 * // イベントの削除
 * event.remove('eventName');
 * await event.push('eventName', payload); // 何も発火しません
 */
export const event: Event;
export default event;
declare class Event {
    /**
     * イベントの送信
     * - unsubscribe()されたサブスクリプションはpush()時に全て削除されます。
     * @param {string} eventName
     * @param {any} payload
     * @returns {Promise<void>}
     */
    push(eventName: string, payload: any): Promise<void>;
    /**
     * イベントの購読
     * @param {string} eventName
     * @param {function} callback
     * @returns {Subscription}
     */
    subscribe(eventName: string, callback: Function): Subscription;
    /**
     * イベントの削除
     * - イベントが削除できたら true を返し、イベントが存在しなかったら false を返します。
     * @param {string} eventName
     * @returns {boolean}
     */
    remove(eventName: string): boolean;
    #private;
}
import { Subscription } from './subscription.js';
//# sourceMappingURL=event.d.ts.map