import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import { getToken, login, setToken } from '../utils'

export default class Login extends Command {
    static description = 'Login to your account'

    static examples = ['$ workingon login', '$ workingon login --signup']

    static flags = {
        signup: flags.boolean({ description: 'Sign up as new user' }),
    }

    static args = []

    async run() {
        const currentToken = await getToken()
        if (currentToken.accessToken) {
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

        if (error || !data) {
            cli.action.stop('Error')
            console.log(error.toString() || 'Unable to login!')
            return
        }

        await setToken(data.accessToken)

        cli.action.stop('Success!')
    }
}
