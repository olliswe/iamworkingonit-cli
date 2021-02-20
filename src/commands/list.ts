import { Command } from '@oclif/command'
import { getTeam } from '../helpers/queries'
import { STD_ERRORS, UPDATE_TYPES } from '../config'
import cli from 'cli-ux'
import { getTimeSince } from '../helpers/utils'

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
        cli.action.start('Fetching data...')
        const { data, error } = await getTeam()
        cli.action.stop('Done!')
        this.log('')

        if (!data || !data.users || error) {
            this.error(error || STD_ERRORS.OOPS_ERROR)
        }

        const tableData = data.users.map((user) => ({
            ...user,
            statusUpdate: user.statusupdates
                ? user.statusupdates[0]
                : undefined,
        }))

        console.log(tableData)

        this.log(`Team ${data.teamName}:`)

        cli.table(tableData, {
            member: {
                get: (row) => `${row.firstName} ${row.lastName}`,
                header: 'Member',
                minWidth: 15,
            },
            status: {
                header: 'Status',
                get: (row) =>
                    row.statusUpdate &&
                    row.statusUpdate?.updatetype?.type !== UPDATE_TYPES.CLEAR
                        ? `"${row.statusUpdate.status}"`
                        : 'none',
                minWidth: 40,
            },
            updatetype: {
                header: 'Type',
                get: (row) => row.statusUpdate?.updatetype?.type || '-',
                minWidth: 10,
            },
            latestUpdate: {
                header: 'Latest update',
                get: (row) =>
                    row.statusUpdate
                        ? getTimeSince(row.statusUpdate.createdAt)
                        : '',
                minWidth: 10,
            },
        })
    }
}
