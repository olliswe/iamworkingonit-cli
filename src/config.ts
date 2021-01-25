import * as path from 'path'
import * as os from 'os'

export const STORAGE_FILE = path.join(os.homedir(), '.workingon')

export const API_URL = 'http://localhost:3000'
export const GRAPHQL_URL = API_URL + '/graphql'

export enum STD_ERRORS {
    AUTH_ERROR = 'authError',
    HELP_ERROR = 'helpError',
}

export const ACCESS_TOKEN_PATH = 'workingonAccessToken'
export const DEFAULT_USER = 'default'
