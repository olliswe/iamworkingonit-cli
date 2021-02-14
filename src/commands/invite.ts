import { Command } from '@oclif/command'
import { generateSecret, getMe } from '../helpers/queries'
import { STD_ERRORS } from '../config'
import cli from 'cli-ux'

export default class Invite extends Command {
    static description = `Invite a user to your team`

    static examples = [`$ workingon invite`]

    async run() {
        const { data, error } = await getMe()
        if (error || !data) {
            this.error(error || STD_ERRORS.OOPS_ERROR)
        }
        if (!data.team?.teamName) {
            this.error(
                `Sorry, you need to be part of a team to invite a member!`
            )
        }

        const email = await cli.prompt('What is the email of the user?')

        cli.action.start('Sending invite email...')

        const { data: genData, error: genError } = await generateSecret(email)
        if (genError || !genData) {
            this.error(genError || STD_ERRORS.OOPS_ERROR)
        }

        cli.action.stop('Done!')

        this.log(`Email sent to ${email}.
You can also manually share the invite code "${genData.secret}" with them.
      `)
    }
}
