import "dotenv/config";

const defaultSetting = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/'
}

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME;

const setCookie = (res: any, name: string, value: any, options = {}) => {
    res.cookie(name, value, {
        ...defaultSetting,
        ...options
    });
};

const clearCookie = (res: any, name: string, options = {}) => {
    res.clearCookie(name, {
        ...defaultSetting,
        ...options
    });
};

export { clearCookie, setCookie, JWT_COOKIE_NAME, defaultSetting }