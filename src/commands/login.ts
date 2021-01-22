import { Command } from '@oclif/command'
import cli from 'cli-ux'
import { loginWithFirebase, readFromStorage, writeToStorage } from '../utils'
import * as inquirer from 'inquirer'

const TEAMS = [
    {
        name: 'LivingPackets',
        value: '0934rjwer',
    },
    { name: 'I Am Working On It', value: 'weoifjwoi' },
]

export default class Login extends Command {
    static description = 'Login to your account'

    static examples = []

    static flags = {}

    static args = []

    async run() {
        const email = await cli.prompt('What is your email')
        const password = await cli.prompt('What is your password?', {
            type: 'hide',
        })

        cli.action.start('Signing you in to your account')

        const { data, error } = await loginWithFirebase(email, password)

        if (error) {
            cli.action.stop('Error')
            console.log(error.toString())
            return
        }

        const refreshToken = data.data.refreshToken
        const idToken = data.data.idToken

        writeToStorage({ idToken, refreshToken })

        cli.action.stop('Success!')

        const { data: storageData } = readFromStorage()

        let responses: any = await inquirer.prompt([
            {
                name: 'teams',
                message:
                    'Please select your current team. You can switch teams at any point by running "workingon teams".',
                type: 'list',
                choices: TEAMS,
            },
        ])
        const team = responses.teams
        console.log(team)

        writeToStorage({ idToken, refreshToken, currentTeamId: team.id })
    }
}
