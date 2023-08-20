import { readFileSync } from "fs"
import * as yaml from "js-yaml"
import { join } from "path"
const configFileNameObj = {
  development: "dev",
  test: "test",
  production: "prod",
}
const env = process.env.NODE_ENV
const filePath = join(__dirname, `./${configFileNameObj[env]}.yml`)

export default () => {
  return yaml.load(readFileSync(filePath, "utf8"))
}
