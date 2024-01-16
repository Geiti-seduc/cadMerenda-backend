const isValidCPF = (cpf) => {
    const cleanedCPF = cpf.replace(/\D/g, '');
  
    if (cleanedCPF.length !== 11 || /^(\d)\1+$/.test(cleanedCPF)) {
        return false;
    }

    const digits = cleanedCPF.split('').map(Number);

    const calculateVerifierDigit = (slice) =>
        slice.reduce((acc, digit, index) => acc + digit * (slice.length + 1 - index), 0) % 11;

    const calculateDigit = (index) => {
        const verifierDigit = calculateVerifierDigit(digits.slice(0, index));
        const calculatedDigit = verifierDigit < 2 ? 0 : 11 - verifierDigit;
        return digits[index] === calculatedDigit;
    };
  
    return calculateDigit(9) && calculateDigit(10);
  };

module.exports = {
    isValidCPF,
};