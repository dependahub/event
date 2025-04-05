/**
 * イベントモジュール
 * @example
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