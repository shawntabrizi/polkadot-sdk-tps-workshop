var { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
var { cryptoWaitReady } = require('@polkadot/util-crypto');

const LIMIT = 25000;

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

	let alice_accounts = [];
	let bob_accounts = [];

	let num_accounts = 10_000;

	for (let i = 0; i < num_accounts; i += 1) {

		if ((10 * i) % num_accounts == 0) {
			console.log("Accounts: ", (100 * i) / num_accounts, '%');
		}

		let alice_account = keyring.addFromUri(`//Alice//${i % num_accounts}`, { name: `Alice ${i} Account` });
		let { nonce: alice_nonce } = await api.query.system.account(
			alice_account.address
		);

		alice_accounts.push({ account: alice_account, nonce: alice_nonce.toNumber() })

		let bob_account = keyring.addFromUri(`//Bob//${i % num_accounts}`, { name: `Bob ${i} Account` });
		bob_accounts.push(bob_account)
	}

	let txs = [];
	let oneUnit = 1_000_000_000_000;

	// Create and sign transaction ahead of time
	for (let i = 0; i < LIMIT; i += 1) {

		let { account, nonce } = alice_accounts[i % num_accounts];


		if ((10 * i) % LIMIT == 0) {
			console.log("Transaction: ", (100 * i) / LIMIT, '%');
		}

		txs.push(
			await api.tx.balances.transferKeepAlive(bob_accounts[i % num_accounts].address, oneUnit)
				.signAsync(account, nonce)
		);

		alice_accounts[i % num_accounts].nonce += 1;
	}

	for (let i = 0; i < LIMIT; i++) {
		await api.rpc.author.submitExtrinsic(txs[i]);
	}

	console.log('Done.');
	process.exit();
}

main().catch(console.error);
