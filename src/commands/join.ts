import { Command } from '@oclif/command'
import cli from 'cli-ux'

export default class Join extends Command {
    static description = 'Join a team if you know the ID'

    static examples = [
        `$ workingon join

Congratulations! You've joined team "Gryffindor"

Here's what you can do next:
- $ workingon list
- $ workingon status

    `,
    ]

    static flags = {}

    static args = []

    async run() {
        const teamId = await cli.prompt(
            `What's the ID of the team you want to join?`
        )

        // TODO: Run query
    }
}
