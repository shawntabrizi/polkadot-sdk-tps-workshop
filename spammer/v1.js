var { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
var { cryptoWaitReady } = require('@polkadot/util-crypto');

const LIMIT = 20_000;

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
	let bob = keyring.addFromUri('//Bob', { name: 'Bob default' });
	let charlie = keyring.addFromUri('//Charlie', { name: 'Charlie default' });

	let oneUnit = 1_000_000_000_000;

	let { nonce: startingAccountNonce }  = await api.query.system.account(
		alice.address
	);

	for (let i = 0; i < LIMIT; i ++) {
		let txNonce = startingAccountNonce.toNumber() + i;

		await api.tx.balances.transferKeepAlive(charlie.address, oneUnit)
		.signAndSend(alice, { nonce: txNonce });
	}

	console.log('Done.');
	process.exit();
}

main().catch(console.error);
