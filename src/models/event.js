import {Subscription} from './subscription.js';

class Event {
	/**
	 * @type {Map<string, Subscription[]>}
	 */
	#eventNameMapToSubscription = new Map();

	/**
	 * イベントの送信
	 * - unsubscribe()されたサブスクリプションはpush()時に全て削除されます。
	 * @param {string} eventName
	 * @param {any} payload
	 * @returns {Promise<void>}
	 */
	async push(eventName, payload) {
		if (!this.#eventNameMapToSubscription.has(eventName)) {
			return;
		}

		// unsubscribe()されたものは削除
		for (const subscription of this.#eventNameMapToSubscription.get(eventName)) {
			if (!subscription.isUnsubscribed()) {
				continue;
			}

			const index = this.#eventNameMapToSubscription.get(eventName).indexOf(subscription);
			this.#eventNameMapToSubscription.get(eventName).splice(index, 1);
		}

		await Promise.all(
			this.#eventNameMapToSubscription.get(eventName).map(subscription => subscription._execute(payload)),
		);
	}

	/**
	 * イベントの購読
	 * @param {string} eventName
	 * @param {function} callback
	 * @returns {Subscription}
	 */
	subscribe(eventName, callback) {
		if (!this.#eventNameMapToSubscription.has(eventName)) {
			this.#eventNameMapToSubscription.set(eventName, []);
		}

		const subscription = new Subscription(callback);
		this.#eventNameMapToSubscription.get(eventName).push(subscription);

		return subscription;
	}

	/**
	 * イベントの削除
	 * - イベントが削除できたら true を返し、イベントが存在しなかったら false を返します。
	 * @param {string} eventName
	 * @returns {boolean}
	 */
	remove(eventName) {
		return this.#eventNameMapToSubscription.delete(eventName);
	}
}

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
export const event = new Event();
export default event;
