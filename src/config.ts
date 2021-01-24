import * as path from 'path'
import * as os from 'os'

export const STORAGE_FILE = path.join(os.homedir(), '.workingon')

export const API_URL = 'https://localhost:3000'

export enum STD_ERRORS {
    AUTH_ERROR = 'authError',
    HELP_ERROR = 'helpError',
}

export const ID_TOKEN_PATH = 'workingonIdToken'
export const REFRESH_TOKEN_PATH = 'workingonRefreshToken'
export const DEFAULT_USER = 'default'
