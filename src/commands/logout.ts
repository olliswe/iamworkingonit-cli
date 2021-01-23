import { Command } from '@oclif/command'

export default class Logout extends Command {
    static description = 'Logout of your account'

    static examples = [`$ workingon logout`]

    static flags = {}

    static args = []

    async run() {}
}
