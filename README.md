kisskeys
========

Command line tool to retrieve PubNub keys with login and password and save publish and subscribe keys in a json file for consumption by apps using PubNub SDK.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/kisskeys.svg)](https://npmjs.org/package/kisskeys)
[![Downloads/week](https://img.shields.io/npm/dw/kisskeys.svg)](https://npmjs.org/package/kisskeys)
[![License](https://img.shields.io/npm/l/kisskeys.svg)](https://github.com/nfodorpubnub/kisskeys/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g kisskeys
$ kisskeys -o ./pubnub-keys.json
$ kisskeys --user "youremail" --password "yourpassword" -o ./pubnub-keys.json
running command...
$ kisskeys (-v|--version|version)
kisskeys/0.0.1 darwin-x64 node-v12.14.0
$ kisskeys --help [COMMAND]
USAGE
  $ kisskeys --user "youremail" --password "yourpassword" -o ./pubnub-keys.json
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
## `kisskeys enterkeys [COMMAND]`

Enter PubNub keys to json key config file.

```
USAGE
  $ kisskeys enterkeys

ARGUMENTS
  enterkeys  Enter PubNub keys to json key file

OPTIONS
  --all  see all commands in CLI
```

## `kisskeys help [COMMAND]`

display help for kisskeys

```
USAGE
  $ kisskeys help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/enterkeys.ts)_
<!-- commandsstop -->
