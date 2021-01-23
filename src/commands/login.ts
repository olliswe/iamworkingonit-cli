import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import { login, writeToStorage } from '../utils'

export default class Login extends Command {
    static description = 'Login to your account'

    static examples = ['$ workingon login', '$ workingon login --signup']

    static flags = {
        signup: flags.boolean({ description: 'Sign up as new user' }),
    }

    static args = []

    async run() {
        // TODO: Check if user is already authenticated

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

        writeToStorage({ idToken, refreshToken })

        cli.action.stop('Success!')
    }
}
