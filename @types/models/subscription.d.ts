export class Subscription {
    constructor(callback: any);
    /**
     * コールバックの実行
     * - Eventクラスのpushメソッドから自動的に呼び出されます。
     * @param {any} payload
     * @returns {Promise<void>}
     */
    _execute(payload: any): Promise<void>;
    /**
     * 購読の解除
     * @returns {void}
     */
    unsubscribe(): void;
    #private;
}
//# sourceMappingURL=subscription.d.ts.map