standard node
	- real time generation of transfer_keep_alive
		- fully saturated at 75%
		- 6561 extrinsics, ~1094 TPS
	- real time generation of remark
		- not fully saturated, ~60%
		- 9702 extrinsics, ~1600 TPS
	- pre-signed remarks
		- fully saturated at 75%
		- 11855 extrinsics, ~1976 TPS

full block node
	- real time generation of transfer keep alive
		- fully saturated at 100%
		- 6762 extrinsics, 1127 TPS
	- pre-signed remarks
		- not fully saturated, ~80%
		- 13018 extrinsics, ~2170 tps
	- multi-user transfer keep alive
		- fully saturated at 100%
		- 6762 extrinsics, 1127 TPS
	- remarks from multiple accounts (10,000)
		- almost fully saturated at 95%
		- 15004 extrinsics, 2500 tps
	- pre-signed feeless txs
		- full saturation at 100%
		- 16069 extrinsics, 2678 TPS

super node (3 sec block time, 2 sec execution, half transfer weight)
	- real time generation of transfer keep alive
		- not saturated at 35%
		- 4197 extrinsics, 1399 TPS
	- pre-signed transfer keep alive
		- not saturated 50%
		- 5793 extrinsics at 1931 TPS
