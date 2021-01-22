import axios from 'axios'
import { ENCRYPTION_KEY, FIREBASE_API_KEY, STORAGE_FILE } from './config'
import * as fs from 'fs'
import * as path from 'path'
import SimpleCrypto from 'simple-crypto-js'

const simpleCrypto = new SimpleCrypto(ENCRYPTION_KEY)

export const loginWithFirebase = async (
    email: string,
    password: string
): Promise<{ data?: any; error?: any }> => {
    try {
        const data = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
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

    const encrypted = simpleCrypto.encrypt(content)

    fs.writeFileSync(STORAGE_FILE, encrypted, { encoding: 'utf-8' })
}

export const readFromStorage = () => {
    try {
        const encryptedData = fs.readFileSync(STORAGE_FILE, {
            encoding: 'utf-8',
        })
        const decryptedData = simpleCrypto.decrypt(encryptedData)
        return { data: decryptedData }
    } catch (e) {
        return { error: e }
    }
}
