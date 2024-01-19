# MEV Detection Using zkGraphs

A POC on Proving that a user's behavior such as Swap was potentially harmed by an MEV bot

### Analysis Process

1. **Extraction of Reserve Values:**

   - We extracted reserve values of specific tokens before and after the suspected transactions.

2. **Price Calculation:**

   - Prices were computed based on the token reserves.

3. **Comparison and MEV Detection:**

   - A significant price difference between pre- and post-transaction states was used as an indicator of MEV.

4. **Threshold Application:**
   - We set a threshold to distinguish normal fluctuations from potential MEV activities.

## Conclusion

Using zkGraphs, we have demonstrated a robust method to detect and prove MEV in blockchain transactions. This approach enhances transparency and security in blockchain networks by identifying potentially exploitative behaviors.
