const defaultSetting = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 * 30,
    path: '/'
}

const JWT_COOKIE_NAME = 'token';

const setCookie = (res:any, name:string, value:any, options = {}) => {
    res.cookie(name, value, {
        ...defaultSetting,
        ...options
    });
};

const clearCookie = (res:any, name:string, options = {}) => {
    res.clearCookie(name, {
        ...defaultSetting,
        ...options
    });
};

export {clearCookie, setCookie, JWT_COOKIE_NAME,defaultSetting}