function checkBalance(amount, balance) {
  if (balance < amount) return false;
  else return true;
}

module.exports = checkBalance;