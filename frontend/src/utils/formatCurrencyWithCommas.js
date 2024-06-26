export const formatCurrencyWithCommas = (amount) => {
  if (amount == null) {
    return "₱ 0.00";
  }
  // Ensure the input is a number
  const number = Number(amount);
  if (isNaN(number)) {
    return "₱ 0.00";
  }
  // Format the number with commas
  return `₱ ${number.toLocaleString()}.00`;
};
export default formatCurrencyWithCommas;
