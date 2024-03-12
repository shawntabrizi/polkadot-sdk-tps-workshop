var { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
var { cryptoWaitReady } = require('@polkadot/util-crypto');

const LIMIT = 1_000;

// Main function which needs to run at start
async function main() {
	await cryptoWaitReady();
	const keyring = new Keyring({ type: 'sr25519' });
	const wsProvider = new WsProvider('ws://127.0.0.1:9944');
	const api = await ApiPromise.create({ provider: wsProvider });

	// Get general information about the node we are connected to
	const [chain, nodeName, nodeVersion] = await Promise.all([
		api.rpc.system.chain(),
		api.rpc.system.name(),
		api.rpc.system.version()
	]);
	console.log(
		`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
	);

	// Add account with URI
	let alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

	let { nonce: startingAccountNonce } = await api.query.system.account(
		alice.address
	);

	let batch = [];
	let batch_num = 1000;

	for (let i = 0; i < batch_num; i += 1) {
		batch.push(api.tx.system.remark(i))
	}

	let txs = [];

	// Create and sign transaction ahead of time
	for (let i = 0; i < LIMIT; i += 1) {
		if ((10 * i) % LIMIT == 0) {
			console.log((100 * i) / LIMIT, '%');
		}
		let txNonce = startingAccountNonce.toNumber() + i;
		txs.push(
			await api.tx.utility.batch(batch)
				.signAsync(alice, { nonce: txNonce })
		);
	}

	for (let i = 0; i < LIMIT; i++) {
		await api.rpc.author.submitExtrinsic(txs[i]);
	}

	console.log('Done.');
	process.exit();
}

main().catch(console.error);
