import * as Dom from 'graphql-request/dist/types.dom'
import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_URL, STD_ERRORS } from '../config'
import { getSdk } from '../generated/graphql'
import { getToken } from './utils'
import jwt_decode from 'jwt-decode'
import { get } from 'lodash'

const GqlSdk = async (withAuth = true) => {
    let options: Dom.RequestInit | undefined
    let userId: string | undefined
    if (withAuth) {
        const { accessToken } = await getToken()
        if (!accessToken) {
            throw STD_ERRORS.AUTH_ERROR
        }
        options = { headers: { Authorization: `Bearer ${accessToken}` } }
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
}) => {
    try {
        const { sdk } = await GqlSdk(false)
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

export const getLatestStatusUpdate = async () => {
    try {
        const { sdk, userId } = await GqlSdk()
        const { statusupdates } = await sdk.Statusupdates({ userId, limit: 1 })
        return { data: statusupdates }
    } catch (e) {
        return { error: e }
    }
}

export const getTeam = async () => {
    try {
        const { sdk, userId } = await GqlSdk()
        const { team } = await sdk.Team()
        return { data: team }
    } catch (e) {
        return { error: e }
    }
}

export const getUser = async () => {
    try {
        const { sdk, userId } = await GqlSdk()
        if (!userId) {
            throw STD_ERRORS.AUTH_ERROR
        }
        const { user } = await sdk.User({ userId })
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

export const joinTeam = async (secret: string) => {
    try {
        const { sdk } = await GqlSdk()
        const { joinTeam } = await sdk.JoinTeam({ secret })
        return { data: joinTeam }
    } catch (e) {
        return { error: e }
    }
}
