import { Command } from '@oclif/command'
import cli from 'cli-ux'
import { getMe, joinTeam } from '../helpers/queries'
import { STD_ERRORS } from '../config'

export default class Join extends Command {
    static description = 'Join a team using an invite token'

    static examples = [
        `$ workingon join

Congratulations! You've joined team "Gryffindor"

Here's what you can do next:
- $ workingon list
- $ workingon "Refactoring dashboard"

    `,
    ]

    async run() {
        const me = await getMe()
        if (me.error || !me.data) {
            this.error(me.error || STD_ERRORS.OOPS_ERROR)
        }
        if (me.data.team?.teamName) {
            this.error(
                `Sorry, you are already part of the team ${me.data.team.teamName}!`
            )
        }

        const secret = await cli.prompt('Please enter the secret token')
        cli.action.start('Attempting to join team...')
        const { data, error } = await joinTeam(secret)

        if (error || !data) {
            this.error(error || STD_ERRORS.OOPS_ERROR)
        }
        cli.action.stop('Done!')
        this.log(`You successfully joined the team:
     ${data.team?.teamName}
      `)
    }
}
