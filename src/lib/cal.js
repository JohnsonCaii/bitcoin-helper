
// 减
const accSub = (arg1, arg2) => {
  const decimals = 100000000;
  const a = arg1 * decimals;
  const b = arg2 * decimals;
  return Math.round(a - b) / decimals;
}

// 乘
const accMul = (arg1, arg2) => {
  const decimals = 100000000;
  const a = arg1 * decimals;
  const b = arg2 * decimals;
  return Math.round(a * b) / (decimals * decimals);
}

export {
  accSub,
  accMul,
}