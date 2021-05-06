import cli from 'cli-ux'
import { login } from './queries'
import { CLIError } from '@oclif/errors'
import { clearTokens, setToken } from './utils'

const loginAgain = async () => {
    await clearTokens()
    const email = await cli.prompt(`
    Sorry, you need to login again!

    Email`)
    const password = await cli.prompt('Password', {
        type: 'hide',
    })
    const { data, error } = await login(email, password)
    if (error || !data) {
        throw new CLIError('Unable to login!')
    }
    console.log('Success')

    await setToken(data.accessToken)
}

export default loginAgain
