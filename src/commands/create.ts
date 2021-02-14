import { Command } from '@oclif/command'
import { createTeam, getMe } from '../helpers/queries'
import { STD_ERRORS } from '../config'
import cli from 'cli-ux'

export default class Create extends Command {
    static description = `Create new team (if you're not part of one)`

    static examples = [`$ workingon create`]

    async run() {
        const { data, error } = await getMe()
        if (error || !data) {
            this.error(error || STD_ERRORS.OOPS_ERROR)
        }
        if (data.team?.teamName) {
            this.error(
                `Sorry, you are already part of the team ${data.team.teamName}!`
            )
        }
        const teamName = await cli.prompt('What is the team name?')
        cli.action.start('Creating your new team')

        const { data: teamData, error: teamError } = await createTeam(teamName)

        if (!teamData || teamError) {
            this.error(teamError || STD_ERRORS.OOPS_ERROR)
        }

        cli.action.stop('Done!')

        this.log(`The team ${teamName} was successfully created! You can now...
... create a new secret token for others to join with $ workingon invite
... add a status update with $ workingon [STATUS]
... view your team's dashboard with $ workingon open
        `)
    }
}
