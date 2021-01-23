import { Command, flags } from '@oclif/command'

export default class Status extends Command {
    static description = 'Update or clear your status'

    static examples = [
        `$ workingon status "Refactoring Dashboard"`,
        `$ workingon status --clear`,
    ]

    static flags = { clear: flags.boolean({ description: 'Clear you status' }) }

    static args = [
        {
            name: 'comment',
            required: false,
            description: 'Describe your current status',
        },
    ]

    async run() {}
}
