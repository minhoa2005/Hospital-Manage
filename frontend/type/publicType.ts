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

type verifyOtpData = {
    otp: number,
    token: string
}

type resetPasswordData = {
    password: string,
    token: string
}

export type { registerData, loginData, recoverPassword, verifyOtpData, resetPasswordData };