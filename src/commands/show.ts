import { Command } from '@oclif/command'

export default class Show extends Command {
    static description = 'Show your status'

    static examples = [
        `$ workingon show
"Refactoring tests"   15hrs ago
    `,
    ]

    static flags = {}

    static args = []

    async run() {}
}
