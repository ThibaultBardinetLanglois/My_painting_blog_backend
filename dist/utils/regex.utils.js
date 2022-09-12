"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexChecking = void 0;
class RegexChecking {
}
exports.RegexChecking = RegexChecking;
RegexChecking.verifyEmailSyntax = (email) => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return emailRegex.test(email);
};
RegexChecking.verifyPasswordSyntax = (password) => {
    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&-_]{8,}$/);
    return passwordRegex.test(password);
};
