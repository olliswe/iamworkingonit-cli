import { Command } from '@oclif/command'

export default class Invite extends Command {
    static description = `Generate a secret invite token to allow other uses to join your team`

    static examples = [`$ workingon invite`]

    static flags = {}

    static args = []

    async run() {}
}
