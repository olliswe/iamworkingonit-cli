import { Command } from '@oclif/command'
import * as keytar from 'keytar'
import { getTokens, handleError } from '../utils'

export default class Show extends Command {
    static description = 'Show your status'

    static examples = [
        `$ workingon show
"Refactoring tests"   15hrs ago
    `,
    ]

    static flags = {}

    static args = []

    async run() {
        const { error, idToken, refreshToken } = await getTokens()
        if (error) {
            this.error(handleError(error))
        }
        console.log(idToken, refreshToken)
    }
}
