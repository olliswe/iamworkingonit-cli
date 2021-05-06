import { Command } from '@oclif/command'
import cli from 'cli-ux'
import queries from '../helpers/queries'
import { STD_ERRORS } from '../config'
import { getTimeSince } from '../helpers/utils'

export default class Show extends Command {
    static description = 'Show your status'

    static examples = [
        `$ workingon show
"Refactoring tests"   15hrs ago
    `,
    ]

    async run() {
        cli.action.start('Fetching your latest status...')

        const { data, error } = await queries.getLatestStatusUpdate()

        if (error) {
            this.error(error || STD_ERRORS.OOPS_ERROR)
        }
        if (!data || data.length === 0) {
            this.error(`You don't have any status updates yet!
You can add a new one like this:
$ workingon "GraphQL queries"
          `)
        }
        const statusUpdate = data[0]

        cli.action.stop('Done!')

        this.log(
            `
  ${statusUpdate.updatetype?.type || '-'}        "${
                statusUpdate.status
            }"        ${getTimeSince(statusUpdate.createdAt)}`
        )
    }
}
