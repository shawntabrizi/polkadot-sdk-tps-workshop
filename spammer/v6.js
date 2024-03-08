var { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
var { cryptoWaitReady } = require('@polkadot/util-crypto');

const LIMIT = 50_000;

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

	let accounts = [];
	let num_accounts = 1000;

	for (let i = 0; i < num_accounts; i += 1) {
		let account = keyring.addFromUri(`//Alice//${i % num_accounts}`, { name: `${i} Account` });
		let { nonce } = await api.query.system.account(
			account.address
		);

		accounts.push({ account, nonce: nonce.toNumber() })
	}

	let txs = [];

	// Create and sign transaction ahead of time
	for (let i = 0; i < LIMIT; i += 1) {

		let { account, nonce } = accounts[i % num_accounts];


		if ((10 * i) % LIMIT == 0) {
			console.log((100 * i) / LIMIT, '%');
		}

		txs.push(
			await api.tx.templateModule.noFee().signAsync(account, nonce)
		);

		accounts[i % num_accounts].nonce += 1;
	}

	for (let i = 0; i < LIMIT; i++) {
		await api.rpc.author.submitExtrinsic(txs[i]);
	}

	console.log('Done.');
	process.exit();
}

main().catch(console.error);
