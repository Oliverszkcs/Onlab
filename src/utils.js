const formatCurrency = (currency) => {
	return "$ " + Number(currency.toFixed(2)).toLocaleString() + " ";
};

export default formatCurrency;
