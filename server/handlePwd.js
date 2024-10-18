function caesarCipher(str, s) {
    const alphabetUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetLowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:",.<>?/`~';

    const shift = s % 26;

    return str.split('').map(char => {
        if (alphabetUppercase.includes(char)) {
            const idx = alphabetUppercase.indexOf(char);
            return alphabetUppercase[(idx + shift + 26) % 26];
        } else if (alphabetLowercase.includes(char)) {
            const idx = alphabetLowercase.indexOf(char);
            return alphabetLowercase[(idx + shift + 26) % 26];
        } else if (numbers.includes(char)) {
            const idx = numbers.indexOf(char);
            return numbers[(idx + (s % 10) + 10) % 10];
        } else if (specialChars.includes(char)) {
            const idx = specialChars.indexOf(char);
            return specialChars[(idx + (s % specialChars.length) + specialChars.length) % specialChars.length];
        } else {
            return char;
        }
    }).join('');
}


module.exports = {
    caesarCipher,
};
