standard node
	- real time generation of transfer_keep_alive
		- fully saturated at 75%
		- 6561 extrinsics, ~1094 TPS
	- real time generation of remark
		- not fully saturated, ~60%
		- 9662 extrinsics, ~1610 TPS
	- pre-signed remarks
		- fully saturated at 75%
		- 11855 extrinsics, ~1976 TPS

full block node
	- real time generation of transfer keep alive
		- fully saturated at 100%
		- 8744 extrinsics, 1457 TPS
	- pre-signed remarks
		- not fully saturated, ~80%
		- 13018 extrinsics, ~2170 tps
	- remarks from multiple accounts (10,000)
		- almost fully saturated at 95%
		- 15004 extrinsics, 2500 tps
	- pre-signed feeless txs
		- full saturation at 100%
		- 16069 extrinsics, 2678 TPS
	- pre-signed batch (100 tx each)
		- full saturation 100%
		- 182 extrinsics, 30.33 TPS

super node (6 sec block time, 4 sec execution)
	- real time generation of transfer keep alive
		- not saturated at 17%
		- 3975 extrinsics, 1325 TPS
	- pre-signed transfer keep alive
		- not saturated 50%
		- 5793 extrinsics at 1931 TPS
	- pre-signed batch (100 tx each)
		- not fully saturated at 60%
		- 221 extrinsics, 36.33 TPS

fast node (3 sec block time, 2 sec execution)
