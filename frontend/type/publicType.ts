type registerData = {
    fullName: string,
    password: string,
    email: string
};

type loginData = {
    email: string,
    password: string
}

type recoverPassword = {
    email: string
}

export type { registerData, loginData, recoverPassword };