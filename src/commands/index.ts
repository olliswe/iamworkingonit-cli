import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import { STD_ERRORS } from '../config'
import { addStatusUpdate } from '../helpers/queries'

export default class Status extends Command {
    static description = 'Update or clear your status'

    static examples = [
        `$ workingon "Refactoring Dashboard"`,
        `$ workingon --clear`,
    ]

    static flags = { clear: flags.boolean({ description: 'Clear you status' }) }

    static args = [
        {
            name: 'status',
            required: false,
            description: 'Describe your current status',
        },
    ]

    async run() {
        const { args } = this.parse(Status)
        const { flags } = this.parse(Status)

        if (flags.clear) {
            cli.action.start('Clearing your status')
            //TODO: Clear status

            cli.action.stop('Done')
            return
        }

        const status = args?.status
        if (!status) {
            this.error(`You need to specify a status update!
e.g. $ workingon "Refactoring tests"`)
            return
        }

        const statusWords = status.split(' ')
        if (statusWords.length === 1) {
            this.log(
                `Sorry, the command "$ workingon ${status}" was not recognized`
            )
            let responses = await inquirer.prompt([
                {
                    name: 'isUpdate',
                    message: `Do you wish to update your status to "${status}"`,
                    type: 'confirm',
                },
            ])
            const isUpdate = responses.isUpdate
            if (!isUpdate) {
                this.error(STD_ERRORS.HELP_ERROR)
                return
            }
        }

        cli.action.start(`Setting your status to
"${status}"
      `)
        const { data, error } = await addStatusUpdate(status)

        if (error || !data) {
            this.error(error || STD_ERRORS.OOPS_ERROR)
        }

        cli.action.stop(`Done! Your status was successfully updated!`)
        return
    }
}
