
export class RegexChecking {
  public static verifyEmailSyntax = (email: string): boolean => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    return emailRegex.test(email)
  }
  
  public static verifyPasswordSyntax = (password: string) => {
    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&-_]{8,}$/)
    return passwordRegex.test(password)
  }
}