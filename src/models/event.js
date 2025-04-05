import {Subscription} from './subscription.js';

class Event {
	#eventNameMapToSubscription = new Map();

	/**
	 * イベントの送信
	 * @param {string} eventName
	 * @param {any} payload
	 * @returns {Promise<void>}
	 */
	async push(eventName, payload) {
		if (!this.#eventNameMapToSubscription.has(eventName)) {
			return;
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
 */
export const event = new Event();
export default event;
