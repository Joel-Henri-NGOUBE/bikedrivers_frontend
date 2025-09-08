export interface ISignup{
    code: number,
    message: string
}

export interface ILoginSuccess{
    token: string
}

export interface ILoginFailure extends ISignup{
}

export type TLogin = ILoginFailure | ILoginSuccess