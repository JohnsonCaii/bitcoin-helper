/**
 * Created by pefish on 2017/5/11.
 */
import log4js from 'log4js'

export default async (filename) => {
  const appenders = {}, categories = {
    default: {
      appenders: [],
      level: 'info'
    }
  }
  appenders[filename] = {
    type: 'stdout',
  }
  categories['default']['appenders'].push(filename)

  log4js.configure({
    appenders: appenders,
    categories: categories
  })
  return log4js.getLogger(filename)
}

