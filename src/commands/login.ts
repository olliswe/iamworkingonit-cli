import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import { getTokens, login, setTokens, writeToStorage } from '../utils'
import * as keytar from 'keytar'

export default class Login extends Command {
    static description = 'Login to your account'

    static examples = ['$ workingon login', '$ workingon login --signup']

    static flags = {
        signup: flags.boolean({ description: 'Sign up as new user' }),
    }

    static args = []

    async run() {
        const currentTokens = await getTokens()
        if (currentTokens.refreshToken && currentTokens.idToken) {
            this.error(`You're already logged in!
If you wish to login with a new account, please logout first with:
$ workingon logout
           `)
            return
        }

        const { flags } = this.parse(Login)

        const email = await cli.prompt('What is your email')
        const password = await cli.prompt('What is your password?', {
            type: 'hide',
        })

        if (flags.signup) {
            //TODO: handle signup
        }

        cli.action.start('Signing you in to your account')

        const { data, error } = await login(email, password)

        if (error) {
            cli.action.stop('Error')
            console.log(error.toString())
            return
        }

        const refreshToken = data.data.refreshToken
        const idToken = data.data.idToken

        await setTokens({ refreshToken, idToken })

        cli.action.stop('Success!')
    }
}
