iamworkingonit
==============

Let you colleagues know what you&#39;re working on

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/iamworkingonit.svg)](https://npmjs.org/package/iamworkingonit)
[![Downloads/week](https://img.shields.io/npm/dw/iamworkingonit.svg)](https://npmjs.org/package/iamworkingonit)
[![License](https://img.shields.io/npm/l/iamworkingonit.svg)](https://github.com/olliswe/iamworkingonit-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g iamworkingonit
$ workingon COMMAND
running command...
$ workingon (-v|--version|version)
iamworkingonit/0.0.2 darwin-x64 node-v15.7.0
$ workingon --help [COMMAND]
USAGE
  $ workingon COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`workingon [STATUS]`](#workingon-status)
* [`workingon create`](#workingon-create)
* [`workingon help [COMMAND]`](#workingon-help-command)
* [`workingon invite`](#workingon-invite)
* [`workingon join`](#workingon-join)
* [`workingon list`](#workingon-list)
* [`workingon login`](#workingon-login)
* [`workingon logout`](#workingon-logout)
* [`workingon open`](#workingon-open)
* [`workingon show`](#workingon-show)

## `workingon [STATUS]`

Update or clear your status

```
USAGE
  $ workingon [STATUS]

ARGUMENTS
  STATUS  Describe your current status

OPTIONS
  --clear  Clear you status

EXAMPLES
  $ workingon "Refactoring Dashboard"
  $ workingon --clear
```

_See code: [src/commands/index.ts](https://github.com/olliswe/iamworkingonit-cli/blob/v0.0.2/src/commands/index.ts)_

## `workingon create`

Create new team (if you're not part of one)

```
USAGE
  $ workingon create

EXAMPLE
  $ workingon create
```

_See code: [src/commands/create.ts](https://github.com/olliswe/iamworkingonit-cli/blob/v0.0.2/src/commands/create.ts)_

## `workingon help [COMMAND]`

display help for workingon

```
USAGE
  $ workingon help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `workingon invite`

Invite a user to your team

```
USAGE
  $ workingon invite

EXAMPLE
  $ workingon invite
```

_See code: [src/commands/invite.ts](https://github.com/olliswe/iamworkingonit-cli/blob/v0.0.2/src/commands/invite.ts)_

## `workingon join`

Join a team using an invite token

```
USAGE
  $ workingon join

EXAMPLE
  $ workingon join

  Congratulations! You've joined team "Gryffindor"

  Here's what you can do next:
  - $ workingon list
  - $ workingon "Refactoring dashboard"
```

_See code: [src/commands/join.ts](https://github.com/olliswe/iamworkingonit-cli/blob/v0.0.2/src/commands/join.ts)_

## `workingon list`

List the statuses of your team

```
USAGE
  $ workingon list

EXAMPLE
  $ workingon list

  +------------------+-------------------------+-------------+
  |      Member      |         Status          | Last update |
  +------------------+-------------------------+-------------+
  | Harry Potter     | "Refactoring Dashboard" | 30min ago   |
  | Hermione Granger | "Writing tests"         | 1hr ago     |
  | Ron Weasely      | none                    | 3hrs ago    |
  +------------------+-------------------------+-------------+
```

_See code: [src/commands/list.ts](https://github.com/olliswe/iamworkingonit-cli/blob/v0.0.2/src/commands/list.ts)_

## `workingon login`

Login to your account

```
USAGE
  $ workingon login

OPTIONS
  --signup  Sign up as new user

EXAMPLES
  $ workingon login
  $ workingon login --signup
```

_See code: [src/commands/login.ts](https://github.com/olliswe/iamworkingonit-cli/blob/v0.0.2/src/commands/login.ts)_

## `workingon logout`

Logout of your account

```
USAGE
  $ workingon logout

EXAMPLE
  $ workingon logout
```

_See code: [src/commands/logout.ts](https://github.com/olliswe/iamworkingonit-cli/blob/v0.0.2/src/commands/logout.ts)_

## `workingon open`

Open the iamworkingon.it dashboard

```
USAGE
  $ workingon open
```

_See code: [src/commands/open.ts](https://github.com/olliswe/iamworkingonit-cli/blob/v0.0.2/src/commands/open.ts)_

## `workingon show`

Show your status

```
USAGE
  $ workingon show

EXAMPLE
  $ workingon show
  "Refactoring tests"   15hrs ago
```

_See code: [src/commands/show.ts](https://github.com/olliswe/iamworkingonit-cli/blob/v0.0.2/src/commands/show.ts)_
<!-- commandsstop -->
