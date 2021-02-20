import * as path from 'path'
import * as os from 'os'

export const STORAGE_FILE = path.join(os.homedir(), '.workingon')

export const API_URL =
    process.env.API_URL || 'https://iamworkingonit.herokuapp.com'
export const GRAPHQL_URL = API_URL + '/graphql'

export const STD_ERRORS = {
    AUTH_ERROR: new Error(`Unable to authenticate you!
Please login with:
$ workingon login`),
    HELP_ERROR: new Error(`You can view the list of commands with
$ workingon --help`),
    OOPS_ERROR: new Error(`Oops something went wrong, please try again!`),
}

export const ACCESS_TOKEN_PATH = 'workingonAccessToken'
export const DEFAULT_USER = 'default'

export enum UPDATE_TYPES {
    CLEAR = 'CLEAR',
    GIT = 'GIT',
    DEFAULT = 'DEFAULT',
}
