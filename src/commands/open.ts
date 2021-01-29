import { Command } from '@oclif/command'
import cli from 'cli-ux'

export default class Open extends Command {
    static description = 'Open the iamworkingon.it dashboard'

    static flags = {}

    static args = []

    async run() {
        await cli.open('https://iamworkingon.it/dashboard')
    }
}
