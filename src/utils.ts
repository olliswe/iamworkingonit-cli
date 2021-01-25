import {
    ACCESS_TOKEN_PATH,
    DEFAULT_USER,
    GRAPHQL_URL,
    STD_ERRORS,
    STORAGE_FILE,
} from './config'
import * as fs from 'fs'
import * as path from 'path'
import * as keytar from 'keytar'
import { getSdk } from './generated/graphql'
import { GraphQLClient } from 'graphql-request'

const GqlSdk = () => {
    const client = new GraphQLClient(GRAPHQL_URL)
    const sdk = getSdk(client)
    return sdk
}

export const login = async (email: string, password: string) => {
    try {
        const { login } = await GqlSdk().Login({ email, password })
        return { data: login }
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

export const setToken = async (accessToken: string) => {
    await keytar.setPassword(ACCESS_TOKEN_PATH, DEFAULT_USER, accessToken)
}

export const getToken = async () => {
    const accessToken = await keytar.getPassword(
        ACCESS_TOKEN_PATH,
        DEFAULT_USER
    )
    if (!accessToken) {
        return { error: STD_ERRORS.AUTH_ERROR }
    }
    return { accessToken }
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
    const accessFound = await keytar.deletePassword(
        ACCESS_TOKEN_PATH,
        DEFAULT_USER
    )
    if (accessFound) {
        return { success: true }
    }
    return { success: false }
}
