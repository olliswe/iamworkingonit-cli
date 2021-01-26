import * as Dom from 'graphql-request/dist/types.dom'
import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_URL, STD_ERRORS } from '../config'
import { getSdk } from '../generated/graphql'
import { getToken } from './utils'

const GqlSdk = async (withAuth = true) => {
    let options: Dom.RequestInit | undefined
    if (withAuth) {
        const { accessToken } = await getToken()
        if (!accessToken) {
            throw STD_ERRORS.AUTH_ERROR
        }
        options = { headers: { Authorization: `Bearer ${accessToken}` } }
    }
    const client = new GraphQLClient(GRAPHQL_URL, options)
    const sdk = getSdk(client)
    return sdk
}

export const login = async (email: string, password: string) => {
    try {
        const gql = await GqlSdk(false)
        const { login } = await gql.Login({ email, password })
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
        const gql = await GqlSdk(false)
        const { signup } = await gql.Signup(input)
        return { data: signup }
    } catch (e) {
        return { error: e }
    }
}

export const addStatusUpdate = async (status: string) => {
    try {
        const gql = await GqlSdk()
        const { createStatusupdate } = await gql.CreateStatusupdate({ status })
        return { data: createStatusupdate }
    } catch (e) {
        return { error: e }
    }
}
