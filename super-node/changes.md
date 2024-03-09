- Custom Pallet Weights
- Custom Block Weights:

	```rust
	pub BlockWeights: frame_system::limits::BlockWeights =
	frame_system::limits::BlockWeights::simple_max(
		Weight::from_parts(EXECUTION_TIME * WEIGHT_REF_TIME_PER_SECOND, u64::MAX),
	);
	```

- Custom Block Length:

	```rust
	pub BlockLength: frame_system::limits::BlockLength = frame_system::limits::BlockLength
	::max_with_normal_ratio(20 * 1024 * 1024, NORMAL_DISPATCH_RATIO);
	```
