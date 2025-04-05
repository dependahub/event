
export class Subscription {
	#callback;

	constructor(callback) {
		this.#callback = callback;
	}

	/**
	 * コールバックの実行
	 * - Eventクラスのpushメソッドから自動的に呼び出されます。
	 * @param {any} payload
	 * @returns {Promise<void>}
	 */
	async _execute(payload) {
		if (!this.#callback) {
			return;
		}

		await this.#callback(payload);
	}

	/**
	 * 購読の解除
	 * @returns {void}
	 */
	unsubscribe() {
		this.#callback = null;
	}

	/**
	 * 購読が解除されている場合は true を返します。
	 * @returns {boolean}
	 */
	isUnsubscribed() {
		return this.#callback === null;
	}
}
