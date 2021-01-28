import { Command } from '@oclif/command'
import { getTeam } from '../helpers/queries'
import { STD_ERRORS } from '../config'

export default class List extends Command {
    static description = 'List the statuses of your team'

    static examples = [
        `$ workingon list

+------------------+-------------------------+-------------+
|      Member      |         Status          | Last update |
+------------------+-------------------------+-------------+
| Harry Potter     | "Refactoring Dashboard" | 30min ago   |
| Hermione Granger | "Writing tests"         | 1hr ago     |
| Ron Weasely      | none                    | 3hrs ago    |
+------------------+-------------------------+-------------+

    `,
    ]

    static flags = {}

    static args = []

    async run() {
        const { data, error } = await getTeam()

        if (!data || error) {
            this.error(error || STD_ERRORS.OOPS_ERROR)
        }

        console.log(data)
    }
}
