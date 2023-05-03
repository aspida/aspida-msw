import minimist from 'minimist'
import getConfig from './getConfig'
import write from './writeRouteFile'
import watch from './watchInputDir'
import build from './buildTemplate'
import { version } from '../package.json'

export const run = (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'config', 'watch'],
    alias: { v: 'version', c: 'config', w: 'watch' }
  })

  // eslint-disable-next-line no-unused-expressions
  argv.version !== undefined
    ? console.log(`v${version}`)
    : argv.watch !== undefined
    ? getConfig(argv.config).forEach(config => {
        write(build(config))
        watch(config.input, () => write(build(config)))
      })
    : getConfig(argv.config).map(build).forEach(write)
}
