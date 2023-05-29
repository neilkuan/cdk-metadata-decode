import * as zlib from 'zlib';
// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'chalk';
class StringBuilder {
  private readonly parts = new Array<string>();
  constructor() {
  }

  public append(x: string) {
    this.parts.push(x);
  }

  public get hasChars() {
    return this.parts.length > 0;
  }

  public toString(): string {
    return this.parts.join('');
  }
}
function decodePrefixEncodedString(x: string) {
  const ret = new Array<string>();
  const prefixes = new Array<string>();
  let current = new StringBuilder();
  let i = 0;
  while (i < x.length) {
    switch (x[i]) {
      case ',':
        if (current.hasChars) {
          ret.push(prefixes.join('') + current.toString());
          current = new StringBuilder();
        }
        break;
      case '}':
        if (current.hasChars) {
          ret.push(prefixes.join('') + current.toString());
        }
        current = new StringBuilder();
        prefixes.pop();
        break;
      case '{':
        prefixes.push(current.toString());
        current = new StringBuilder();
        break;
      default:
        current.append(x[i]);
        break;
    }

    i += 1;
  }
  if (current.hasChars) {
    ret.push(prefixes.join('') + current.toString());
  }
  return ret;
}


export function CDKMetaDataDeCoder(analytics: string, args?: boolean) {
  const buf = Buffer.from(analytics.split(':').splice(2)[0], 'base64');
  const analyticsString = zlib.gunzipSync(buf).toString();
  const constructInfo = decodePrefixEncodedString(analyticsString);
  console.log('\n');
  console.log(chalk.yellowBright('NodeJS Version 👀 👀 👀 ...:  \n'));
  console.log(chalk.greenBright(constructInfo.filter((i: string)=>(
    i.startsWith('node.js')
  ))[0]), '\n');

  if (args) {
    console.log(chalk.yellowBright('ALL CDK MetaData'));
    console.log(constructInfo);
  }
}
