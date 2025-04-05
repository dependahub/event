import test from 'ava';
import {event} from './index.js';

test('event:allExecute', async t => {
	const eventName = 'event:allExecute';
	const testObject = {
		a: null,
		b: null,
	};

	// eslint-disable-next-line no-unused-vars
	const subscriptionA = event.subscribe(eventName, async payload => {
		testObject.a = payload;
		t.log(`${eventName}:A - COMPLETED!`);
	});
	// eslint-disable-next-line no-unused-vars
	const subscriptionB = event.subscribe(eventName, async payload => {
		testObject.b = payload;
		t.log(`${eventName}:B - COMPLETED!`);
	});

	await event.push(eventName, 'payload1');

	t.is(testObject.a, 'payload1');
	t.is(testObject.b, 'payload1');
});

test('event:OnlyExecuteA', async t => {
	const eventName = 'event:OnlyExecuteA';
	const testObject = {
		a: null,
		b: null,
	};

	// eslint-disable-next-line no-unused-vars
	const subscriptionA = event.subscribe(eventName, async payload => {
		testObject.a = payload;
		t.log(`${eventName}:A - COMPLETED!`);
	});
	const subscriptionB = event.subscribe(eventName, async payload => {
		testObject.b = payload;
		t.log(`${eventName}:B - COMPLETED!`);
	});

	subscriptionB.unsubscribe();

	await event.push(eventName, 'payload1');

	t.is(testObject.a, 'payload1');
	t.is(testObject.b, null);
});

test('event:OnlyExecuteB', async t => {
	const eventName = 'event:OnlyExecuteB';
	const testObject = {
		a: null,
		b: null,
	};

	const subscriptionA = event.subscribe(eventName, async payload => {
		testObject.a = payload;
		t.log(`${eventName}:A - COMPLETED!`);
	});
	// eslint-disable-next-line no-unused-vars
	const subscriptionB = event.subscribe(eventName, async payload => {
		testObject.b = payload;
		t.log(`${eventName}:B - COMPLETED!`);
	});

	subscriptionA.unsubscribe();

	await event.push(eventName, 'payload1');

	t.is(testObject.a, null);
	t.is(testObject.b, 'payload1');
});

test('event:remove', async t => {
	const eventName = 'event:remove';
	const testObject = {
		a: null,
		b: null,
	};

	// eslint-disable-next-line no-unused-vars
	const subscriptionA = event.subscribe(eventName, async payload => {
		testObject.a = payload;
		t.log(`${eventName}:A - COMPLETED!`);
	});
	// eslint-disable-next-line no-unused-vars
	const subscriptionB = event.subscribe(eventName, async payload => {
		testObject.b = payload;
		t.log(`${eventName}:B - COMPLETED!`);
	});

	event.remove(eventName);

	await event.push(eventName, 'payload1');

	t.is(testObject.a, null);
	t.is(testObject.b, null);
});
