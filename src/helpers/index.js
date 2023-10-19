const totalPay = (cant, term) => {
  let total;
  if (cant < 5000) {
    total = cant * 1.5;
  } else if (cant >= 5000 && cant < 10000) {
    total = cant * 1.4;
  } else if (cant >= 10000 && cant < 15000) {
    total = cant * 1.3;
  } else {
    total = cant * 1.2;
  }

  if (term === 6) {
    total *= 1.1;
  } else if (term === 12) {
    total *= 1.2;
  } else {
    total *= 1.3;
  }
  return total;
};

export { totalPay };
