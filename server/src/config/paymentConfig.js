const paymentConfig = {
  paymentMethods: {
    ZALOPAY: {
      code: "ZALOPAY",
      name: "ZaloPay",
      displayName: "Ví điện tử ZaloPay",
      accountInfo: {
        phone: "0901234567", // Example ZaloPay phone/account
        owner: "TRUNG TAM THI CHUNG CHI QUOC TE",
      },
    },
    MB_BANK: {
      code: "MB_BANK",
      name: "MB Bank",
      displayName: "Ngân hàng Quân đội (MB Bank)",
      accountInfo: {
        bankCode: "MB",
        accountNumber: "0123456789012",
        accountName: "TRUNG TAM THI CHUNG CHI QUOC TE",
      },
    },
    AGRIBANK: {
      code: "AGRIBANK",
      name: "Agribank",
      displayName: "Ngân hàng Nông nghiệp và Phát triển Nông thôn",
      accountInfo: {
        bankCode: "AGRIBANK",
        accountNumber: "9876543210987",
        accountName: "TRUNG TAM THI CHUNG CHI QUOC TE",
      },
    },
  },
  defaultPaymentMethod: "ZALOPAY",
  getPaymentMethod: (code) => paymentConfig.paymentMethods[code] || null,
};

module.exports = paymentConfig;
