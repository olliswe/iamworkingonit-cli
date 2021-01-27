import {
    ACCESS_TOKEN_PATH,
    DEFAULT_USER,
    STD_ERRORS,
    STORAGE_FILE,
} from '../config'
import * as fs from 'fs'
import * as path from 'path'
import * as keytar from 'keytar'
import { formatDistanceToNow, parseISO } from 'date-fns'

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

export const getTimeSince = (iso: string) => {
    return formatDistanceToNow(parseISO(iso)) + ' ago'
}
