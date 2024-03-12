# Run benchmarks on block import for certain blocks from your blockchain db
cargo run --release -- benchmark block --database=paritydb --from 50 --to 60  --dev -d ./tmp/my-dev

# Run benchmarks on your machine, and compare them to standard hardware
cargo run --release -- benchmark machine

# Build a block internally, benchmark import, and return the time to execute a single extrinsic
cargo run --release -- benchmark extrinsic --pallet=balances --extrinsic=transfer_keep_alive
