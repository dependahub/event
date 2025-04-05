
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
}
