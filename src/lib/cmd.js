
import child_process from 'child_process'

export function pbcopy(content) {

  const proc = child_process.spawn('pbcopy')

  logger.info(`Execute (pbcopy), copy content to clipboard, content: ${content}`)

  proc.stdin.write(content)
  proc.stdin.end()

  logger.info(`Now you can execute (CMD+V) to paste your content`)
}
