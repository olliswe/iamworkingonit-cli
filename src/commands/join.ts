import { Command } from '@oclif/command'

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

    static flags = {}

    static args = []

    async run() {
        // TODO: Run query
    }
}
