type userInfo = {
    fullName: string,
    email: string,
    roleName: string
}

type userDetail = userInfo & {
    id: string,
    createdAt: string,
    updatedAt: string,
    gender: 'male' | 'female',
    dateOfBirth: string
}

export type { userInfo, userDetail }