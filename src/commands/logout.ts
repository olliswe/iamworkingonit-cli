import { Command } from '@oclif/command'
import cli from 'cli-ux'
import { clearTokens } from '../helpers/utils'

export default class Logout extends Command {
    static description = 'Logout of your account'

    static examples = [`$ workingon logout`]

    async run() {
        cli.action.start('Logging you out')
        const { success } = await clearTokens()
        if (success) {
            cli.action.stop('Done')
            return
        }
        cli.action.stop('Sorry, no account was found!')
    }
}
