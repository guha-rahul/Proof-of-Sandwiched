//@ts-ignore
import { BigInt, Bytes, Block, Event } from "@hyperoracle/zkgraph-lib";

export function handleBlocks(blocks: Block[]): Bytes {
  let events: Event[] = blocks[0].events;
  let reserve0_mev: BigInt = BigInt.fromBytesBigEndian(
    events[0].data.slice(0, 32)
  ); // reserve of arbitrary token for mev bot
  let reserve1_mev: BigInt = BigInt.fromBytesBigEndian(
    events[0].data.slice(32, 64)
  ); // reserve of eth token for mev bot

  let reserve0_victim: BigInt = BigInt.fromBytesBigEndian(
    events[1].data.slice(0, 32)
  ); // reserve of arbitrary token for victim
  let reserve1_victim: BigInt = BigInt.fromBytesBigEndian(
    events[1].data.slice(32, 64)
  ); // reserve of eth token for victim

  let scaleFactor: BigInt = BigInt.fromI32(100);

  // Scale reserves for calculation
  reserve0_mev = reserve0_mev.times(scaleFactor);
  reserve1_mev = reserve1_mev.times(scaleFactor);
  reserve0_victim = reserve0_victim.times(scaleFactor);
  reserve1_victim = reserve1_victim.times(scaleFactor);

  let price_before_mev: BigInt = reserve0_mev.div(reserve1_mev);
  let price_after_mev: BigInt = reserve0_victim.div(reserve1_victim);

  let price_diff: BigInt = price_after_mev.minus(price_before_mev);

  // Calculate percentage difference and adjust it back to correct scale
  let percentage_diff: BigInt = price_diff
    .times(scaleFactor)
    .div(price_before_mev);

  // Define a threshold for MEV detection
  let mev_threshold: BigInt = BigInt.fromI32(10); // Representing 0.1 in scaled value

  // Compare the percentage difference with the threshold
  let is_mev_detected: boolean = percentage_diff.gte(mev_threshold);

  // Return a value based on the result

  return Bytes.fromI32(is_mev_detected ? 1 : 0);
}
