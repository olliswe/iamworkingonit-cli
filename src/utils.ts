import axios from 'axios'
import {
    DEFAULT_USER,
    ID_TOKEN_PATH,
    REFRESH_TOKEN_PATH,
    STD_ERRORS,
    STORAGE_FILE,
} from './config'
import * as fs from 'fs'
import * as path from 'path'
import * as keytar from 'keytar'

export const login = async (
    email: string,
    password: string
): Promise<{ data?: any; error?: any }> => {
    try {
        const data = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBi4-TRGR1HzgjG5kEj0SQRB30mpz0Z8iw`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        )
        return { data, error: '' }
    } catch (e) {
        return { error: e }
    }
}

export const writeToStorage = (content: { [key: string]: string }) => {
    if (!fs.existsSync(path.dirname(STORAGE_FILE))) {
        fs.mkdirSync(path.dirname(STORAGE_FILE))
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(content), {
        encoding: 'utf-8',
    })
}

export const readFromStorage = () => {
    try {
        const json = fs.readFileSync(STORAGE_FILE, {
            encoding: 'utf-8',
        })
        const data = JSON.parse(json)
        return { data }
    } catch (e) {
        return { error: e }
    }
}

export const setTokens = async ({
    refreshToken,
    idToken,
}: {
    refreshToken: string
    idToken: string
}) => {
    await keytar.setPassword(REFRESH_TOKEN_PATH, DEFAULT_USER, refreshToken)
    await keytar.setPassword(ID_TOKEN_PATH, DEFAULT_USER, idToken)
}

export const getTokens = async () => {
    const idToken = await keytar.getPassword(ID_TOKEN_PATH, DEFAULT_USER)
    const refreshToken = await keytar.getPassword(
        REFRESH_TOKEN_PATH,
        DEFAULT_USER
    )
    if (!idToken || !refreshToken) {
        return { error: STD_ERRORS.AUTH_ERROR }
    }
    return { idToken, refreshToken }
}

export const handleError = (error: any) => {
    switch (error) {
        case STD_ERRORS.AUTH_ERROR:
            return `Unable to authenticate you!
Please login with:
$ workingon login`
        case STD_ERRORS.HELP_ERROR:
            return `You can view the list of commands with
$ workingon --help`
        default:
            return error.toString()
    }
}

export const clearTokens = async () => {
    const idFound = await keytar.deletePassword(ID_TOKEN_PATH, DEFAULT_USER)
    const refreshFound = await keytar.deletePassword(
        REFRESH_TOKEN_PATH,
        DEFAULT_USER
    )
    if (idFound && refreshFound) {
        return { success: true }
    }
    return { success: false }
}
