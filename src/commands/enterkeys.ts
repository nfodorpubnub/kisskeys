/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable object-curly-spacing */
import { Command, flags } from '@oclif/command'
import got from 'got'
const readline = require('readline')
const fs = require('file-system')


// Function to get the nth key from the object
Object.prototype.getByIndex = (index) => {
  return this[Object.keys(this)[index]];
}

export default class EnterKeys extends Command {
  static description = 'Saves PubNub keys into PubNub Keys Json file.'

  static examples = [
    '$ kisskeys enterkeys',
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-o, --output=VALUE)
    output: flags.string({ char: 'o', description: 'Output file json file to store the keys' }),
    user: flags.string({ char: 'u', description: 'PubNub User Name' }),
    password: flags.string({ char: 'p', description: 'PubNub Password' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'output' }]

  async run() {
    // Where the config file containing the private PubNub Keys used by the live event demo is located.
    // They can be edited manually or ran by this script.

    let keys: []
    let userId: string
    let userToken: string
    const { args, flags } = this.parse(EnterKeys)
    if (flags.user) this.log(`--user is: ${flags.user}`)
    if (flags.password) this.log(`--password is: ${flags.password}`)
    const output = flags.output ?? '.pubnub'
    if ((flags.user != "") && (flags.password != "")) {
      this.retrieveKeys(flags.user, flags.password)
    } else {
      this.promptForLoginPwd(output)
    }


  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  promptForLoginPwd = (outputfile: string) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question('\nEnter your PubNub login: ', (pnLogin: string) => {
      rl.question('Enter your PubNub password: ', async (pnPassword: any) => {
        this.retrieveKeys(pnLogin, pnPassword)
      })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  promptForKeys = (outputfile: string) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    let keys: []
    this.log('\n*** A PubNub account is required. ***')
    this.log('\nVisit the PubNub dashboard to create an account or login.')
    this.log('\n     https://dashboard.pubnub.com/')
    this.log('\nCreate a new chat app or locate your chat app in the dashboard.')
    this.log('\nCopy and paste your publish key and then your subscribe key below.')

    rl.question('\nEnter your publish key: ', publishKey => {
      rl.question('Enter your subscribe key: ', subscribeKey => {
        if (
          (publishKey.startsWith('pub') && subscribeKey.startsWith('sub')) ||
          (publishKey.startsWith('demo') && subscribeKey.startsWith('demo'))
        ) {
          const updateKeys = {
            publishKey: publishKey,
            subscribeKey: subscribeKey,
          }
          if (!keys) {
            fs.openSync(outputfile, 'a')
            this.log(`\n${outputfile} file for storing your publish and subscribe key is created.`)
          }
          fs.writeFile(outputfile, JSON.stringify(updateKeys), err => {
            if (!err) {
              this.log(`\nYour keys have been saved to ${outputfile} file.`)
              process.exit(0)
            }
          })
        } else {
          this.log('\nYou entered invalid keys format!')
          process.exit(1)
        }
      })
    })
    this.log(`${outputfile} from ./src/commands/enterkeys.ts`)

    return 0
  }

  retrieveKeys = async (login: string, password: string) => {

    try {
      this.log(`Retrieving keys for ${login}`)

      try {
        const { body } = await got.post('https://admin.pubnub.com/api/me', {
          json: {
            email: login,
            password: password,
          },
          responseType: 'json',
        })
        this.log(`Login successful for ${login}`)

        const userId = body.result.user_id ?? 'error'
        const userToken = body.result.token ?? 'error'

        const urlfetch = body.result.user_roles.roles['account-555269'].account_id
        this.log(urlfetch)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const body2 = await got.get(`https://admin.pubnub.com/api/apps?owner_id=${urlfetch}`, {
          headers: {
            'X-Session-Token': userToken,
          },
          responseType: 'json',
        })
       // this.log(`Results found: ${Object.keys(body2.body.result)}`)
        const resultsKeys = Object.keys(body2.body.result)

        resultsKeys.forEach(element => {
          // this.log(JSON.stringify(Object.keys(body2.body.result)[element]))
          // f(typeof x === "object") {
          //   x = JSON.stringify(x, null, 4);
          // }
          const tmp1 = body2.body.result[0].keys[0] // .getByIndex(0)
          this.log(`App ID: ${tmp1.app_id}`)
          this.log(`subscribe_key: ${tmp1.subscribe_key}`)
          this.log(`publish_key: ${tmp1.publish_key}`)
        })  
     
      } catch (error) {
        this.log(error.response.body.error)
        return
      }


    } catch (error) {
      this.log(error.response)
    }
  }
}
