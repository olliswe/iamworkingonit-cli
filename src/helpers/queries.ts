import * as Dom from 'graphql-request/dist/types.dom'
import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_URL, STD_ERRORS, UPDATE_TYPES } from '../config'
import { getSdk } from '../generated/graphql'
import { getToken } from './utils'
import jwt_decode from 'jwt-decode'
import { get } from 'lodash'
import loginAgain from './loginAgain'
import { cli } from 'cli-ux'

const GqlSdk = async (withAuth = true, headers = {}) => {
    let options: Dom.RequestInit = { headers }
    let userId: string | undefined
    if (withAuth) {
        const { accessToken } = await getToken()
        if (!accessToken) {
            throw STD_ERRORS.AUTH_ERROR
        }
        options = {
            headers: { Authorization: `Bearer ${accessToken}s`, ...headers },
        }
        const jwt = jwt_decode(accessToken)
        userId = get(jwt, 'id', '')
    }
    const client = new GraphQLClient(GRAPHQL_URL, options)
    const sdk = getSdk(client)
    return { sdk, userId }
}

export const login = async (email: string, password: string) => {
    try {
        const { sdk } = await GqlSdk(false)
        const { login } = await sdk.Login({ email, password })
        return { data: login }
    } catch (e) {
        return { error: e }
    }
}

export const signup = async (input: {
    email: string
    password: string
    firstName: string
    lastName: string
    signupToken: string
}) => {
    try {
        const { sdk } = await GqlSdk(false, {
            'x-signup-token': input.signupToken,
        })
        const { signup } = await sdk.Signup(input)
        return { data: signup }
    } catch (e) {
        return { error: e }
    }
}

export const addStatusUpdate = async (status: string) => {
    try {
        const { sdk } = await GqlSdk()
        const { createStatusupdate } = await sdk.CreateStatusupdate({
            status,
        })
        return { data: createStatusupdate }
    } catch (e) {
        return { error: e }
    }
}

export const clearStatus = async () => {
    try {
        const { sdk } = await GqlSdk()
        const { createStatusupdate } = await sdk.CreateStatusupdate({
            status: '',
            updatetype: UPDATE_TYPES.CLEAR,
        })
        return { data: createStatusupdate }
    } catch (e) {
        return { error: e }
    }
}

export const getLatestStatusUpdate = async () => {
    try {
        const { sdk } = await GqlSdk()
        const { user } = await sdk.User()
        return { data: user.statusupdates }
    } catch (e) {
        return { error: e }
    }
}

export const getTeam = async () => {
    try {
        const { sdk } = await GqlSdk()
        const { team } = await sdk.Team()
        return { data: team }
    } catch (e) {
        return { error: e }
    }
}

export const getMe = async () => {
    try {
        const { sdk } = await GqlSdk()
        const { user } = await sdk.User()
        return { data: user }
    } catch (error) {
        return { error }
    }
}

export const createTeam = async (teamName: string) => {
    try {
        const { sdk } = await GqlSdk()
        const { createTeam } = await sdk.createTeam({ teamName })
        return { data: createTeam }
    } catch (e) {
        return { error: e }
    }
}

export const generateSecret = async (email: string) => {
    try {
        const { sdk } = await GqlSdk()
        const { generateSecret } = await sdk.GenerateSecret({ email })
        return { data: generateSecret }
    } catch (e) {
        return { error: e }
    }
}

export const joinTeam = async (secret: string) => {
    try {
        const { sdk } = await GqlSdk()
        const { joinTeam } = await sdk.JoinTeam({ secret })
        return { data: joinTeam }
    } catch (e) {
        return { error: e }
    }
}

const withErrorCheck = <TArgs extends Array<any>, TData>(
    fn: (...args: TArgs) => Promise<{ data?: TData; error?: any }>
) => {
    return async (...args: TArgs): Promise<{ data?: TData; error?: any }> => {
        const res = await fn(...args)
        if (!res.error) {
            return res
        }
        const errors = get(res.error, 'response.errors')
        if (!Array.isArray(errors) || errors.length !== 1) {
            return res
        }
        const statusCode = get(errors[0], 'extensions.exception.status', '')
        if (statusCode !== 401) {
            return res
        }
        await loginAgain()
        return await fn(...args)
    }
}

const queries = {
    addStatusUpdate: withErrorCheck(addStatusUpdate),
    clearStatus: withErrorCheck(clearStatus),
    getLatestStatusUpdate: withErrorCheck(getLatestStatusUpdate),
    getTeam: withErrorCheck(getTeam),
    getMe: withErrorCheck(getMe),
    createTeam: withErrorCheck(createTeam),
    generateSecret: withErrorCheck(generateSecret),
    joinTeam: withErrorCheck(joinTeam),
}

export default queries
