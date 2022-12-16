export type zeroToOne = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
export type color = `#${string}` | `rgba(${number}, ${number}, ${number}, ${number})` | `var(--${string})`
export type inputTextType = 'text' | 'email' | 'password'
export type arrayOfObjects = object[]
export type IQuery = {
    limit: number;
    order: string;
    page: number;
}

export type validations = 'required' | 'isEmail' | 'minLength' | 'maxLength' | 'isMatch' | 'noSpecialSymbols' | 'isHard'