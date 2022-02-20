const FNV_PRIMES: { [size: number]: bigint } = {
  32: 16_777_619n,
  64: 1_099_511_628_211n,
  128: 309_485_009_821_345_068_724_781_371n,
  256: 374_144_419_156_711_147_060_143_317_175_368_453_031_918_731_002_211n
};

const FNV_OFFSETS: { [size: number]: bigint } = {
  32: 2_166_136_261n,
  64: 14_695_981_039_346_656_037n,
  128: 144_066_263_297_769_815_596_495_629_667_062_367_629n,
  256: 100_029_257_958_052_580_907_070_968_620_625_704_837_092_796_014_241_193_945_225_284_501_741_471_925_557n
};

/**
 * A simple fnv1a hashing utility - to help with community dragon data parsing.
 * @param str The string that needs to be hashed.
 * @param size The offset/primes size - defaults to 32.
 */
export function hash(str: string, { size = 32 } = {}) {
  if (!FNV_PRIMES[size]) throw new Error('The `size` option must be one of 32, 64, 128 or 256.');

  let hash = FNV_OFFSETS[size];
  const fnvPrime = FNV_PRIMES[size];

  let isUnicoded = false;
  for (let index = 0; index < str.length; index++) {
    let characterCode = str.charCodeAt(index);

    if (characterCode > 0x7f && !isUnicoded) {
      str = unescape(encodeURIComponent(str));
      characterCode = str.charCodeAt(index);
      isUnicoded = true;
    }

    hash ^= BigInt(characterCode);
    hash = BigInt.asUintN(size, hash * fnvPrime);
  }

  return hash.toString(16).padStart(8, '0');
}
