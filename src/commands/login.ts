import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import { getToken, setToken } from '../helpers/utils'
import { login, signup } from '../helpers/queries'

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

        if (flags.signup) console.log('Welcome to iamworkingon.it!')

        const email = await cli.prompt('What is your email')
        const password = await cli.prompt('What is your password?', {
            type: 'hide',
        })

        if (flags.signup) {
            const password2 = await cli.prompt('Please repeat the password', {
                type: 'hide',
            })
            if (password !== password2) {
                this.error("Passwords don't match, please try again!")
            }
            console.log('Noice they match!')
            const firstName = await cli.prompt(
                'Almost there... What is your first name?'
            )
            console.log(`Thanks ${firstName}!`)
            const lastName = await cli.prompt(
                `Last but not least, what is your last name ?`
            )

            cli.action.start('Creating your account..')

            const { data, error } = await signup({
                email,
                password,
                firstName,
                lastName,
            })

            if (error || !data) {
                cli.action.stop('Error')
                this.error(error.toString() || 'Unable to login!')
            }
        } else {
            cli.action.start('Signing you in to your account...')
        }

        const { data, error } = await login(email, password)

        if (error || !data) {
            cli.action.stop('Error')
            this.error(error.toString() || 'Unable to login!')
        }

        await setToken(data.accessToken)

        cli.action.stop('Success!')
    }
}
