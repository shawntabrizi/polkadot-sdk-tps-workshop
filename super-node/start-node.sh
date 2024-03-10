cargo run --release -- purge-chain --database=paritydb --dev -d ./tmp/my-dev -y
cargo run --release -- --dev -d ./tmp/my-dev --database=paritydb --pool-limit=1000000 --pool-kbytes=1000000 --tx-ban-seconds=0
# cargo run --release -- benchmark block --database=paritydb --from 1 --to 10 --dev -d ./tmp/my-dev
