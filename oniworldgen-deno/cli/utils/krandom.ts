export default class KRandom {
  // Not used
  // static MZ = 0;
  // Max 32 bit integer
  static MBIG = 2147483647;
  // Base value for starting seed
  static MSEED = 161803398;

  // Store random number
  private seedArray: number[];
  // Seed index 1 (for shuffling)
  private inext: number
  // Seed index 2 (for shuffling)
  private inextp: number

  /**
   * Initialize seed array with given seed. Initialize inext, inextp
   * @param seed 
   */
  constructor(seed = Date.now()) {
      this.seedArray = new Array(56).fill(0);
      let num = KRandom.MSEED - Math.abs(seed === -2147483648 ? KRandom.MBIG : seed);

      this.seedArray[55] = num;
      let num2 = 1;

      for (let i = 1; i < 55; i++) {
          const num3 = (21 * i) % 55;
          this.seedArray[num3] = num2;
          num2 = num - num2;
          if (num2 < 0) {
              num2 += KRandom.MBIG;
          }
          num = this.seedArray[num3];
      }

      for (let j = 1; j < 5; j++) {
          for (let k = 1; k < 56; k++) {
              this.seedArray[k] -= this.seedArray[1 + (k + 30) % 55];
              if (this.seedArray[k] < 0) {
                  this.seedArray[k] += KRandom.MBIG;
              }
          }
      }

      this.inext = 0;
      this.inextp = 21;
  }

  /**
   * Shuffle number in seedArray to generate a pseudo-random value
   * @returns A pseudo-random number between 0 and KRandom.MBIG
   */
  shuffle() {
    this.inext = (this.inext + 1) % 56;
    this.inextp = (this.inextp + 1) % 56;

    let num3 = this.seedArray[this.inext] - this.seedArray[this.inextp];
    if (num3 < 0) {
        num3 += KRandom.MBIG;
    }

    this.seedArray[this.inext] = num3;

    return num3;
  }

  /**
   * Uses the shuffle method and normalize it to generate a number between 0 and 1
   * @returns normalized number between 0 and 1
   */
  normalize() {
      return this.shuffle() * (1 / KRandom.MBIG);
  }

  /**
   * Uses the shuffle method and normalize it to generate a number between -1 and 1
   * @returns normalized number between -1 and 1
   */
  signedNormalize() {
      let num = this.shuffle();
      if (this.shuffle() % 2 === 0) {
          num = -num;
      }
      return (num + 2147483646) / 4294967293.0;
  }

  /**
   * Generate a random integer in a specified range.
   * 
   * - If no arguments: returns a random integer from shuffle().
   * - If one argument: treats it as the max value, returning an integer within [0, maxValue).
   * - If two arguments: returns an integer within [minValue, maxValue).
   * 
   * @param {number} [minValue] - The lower bound of the range (inclusive).
   * @param {number} [maxValue] - The upper bound of the range (exclusive).
   * @returns {number} A random integer within the specified range.
   */
  next(minValue: number, maxValue: number) {
      // If no arguments, return a raw integer from shuffle
      if (arguments.length === 0) {
          return this.shuffle();
      }
      // If only minValue is provided, treat it as maxValue (0 to maxValue range)
      if (arguments.length === 1) {
          return Math.floor(this.normalize() * minValue);
      }

      // Calculate the range between minValue and maxValue
      const range = maxValue - minValue;

      if (range <= KRandom.MBIG) {
          // If range is small, use the normalized value to return within range
          return Math.floor(this.normalize() * range) + minValue;
      } else {
          // For a larger range, use signedNormalize to ensure the result fits properly
          return Math.floor(this.signedNormalize() * range) + minValue;
      }
  }

  // Not Used
  // nextDouble() {
  //     return this.sample();
  // }

  // Not Used
  // nextBytes(buffer) {
  //     if (!buffer || !Array.isArray(buffer)) {
  //         throw new Error('Invalid buffer provided.');
  //     }
  //     for (let i = 0; i < buffer.length; i++) {
  //         buffer[i] = this.shuffle() % 256;
  //     }
  // }
}
