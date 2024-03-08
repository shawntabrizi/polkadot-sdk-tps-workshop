var { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
var { cryptoWaitReady } = require('@polkadot/util-crypto');

const LIMIT = 10_000;

function totalRefTime(weightUsed) {
	return weightUsed.normal.refTime.toNumber() + weightUsed.operational.refTime.toNumber() + weightUsed.mandatory.refTime.toNumber();
}

// Main function which needs to run at start
async function main() {
	const wsProvider = new WsProvider('ws://127.0.0.1:9944');
	try {
		const api = await ApiPromise.create({ provider: wsProvider });

		let lastTime = null;

		// Subscribe to new blocks being produced, not necessarily finalized ones.
		await api.rpc.chain.subscribeNewHeads(async header => {
			await api.rpc.chain.getBlock(header.hash, async block => {
				// The block number
				let blockNumber = block.block.header.number.toNumber();
				// Extrinsics in the block
				let extrinsics = await block.block.extrinsics;
				// Current block time
				let time = await api.query.timestamp.now();
				// Block Weight
				let weightUsed = await api.query.system.blockWeight();
				let refTimeUsed = totalRefTime(weightUsed);
				let weightLimit = await api.consts.system.blockWeights;
				let refTimeLimit = weightLimit.maxBlock.refTime.toNumber();
				let refTimePercent = refTimeUsed / refTimeLimit * 100;

				// Pending
				let pending = await api.rpc.author.pendingExtrinsics();
				let pendingCount = pending.length;

				let blockTime = lastTime ? Math.round((time - lastTime) / 1000) : 6;

				console.log(`Block ${blockNumber} had ${extrinsics.length} extrinsics. (${pendingCount}) pending`);
				if (extrinsics.length > 1) {
					console.log(`Time: ${blockTime} -> ${extrinsics.length / blockTime} TPS`);
					console.log(`Full: ${refTimePercent}%`);
				}

				lastTime = time;

			});
		});

	} catch (error) {
		console.error("Error occurred, restarting the application...");
		// Restart the application by calling main function again
		main().catch(console.error);
	}
}

main().catch(console.error);
