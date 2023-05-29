import chalk from 'chalk';
import { CDKMetaDataDeCoder } from './version-decode';
// eslint-disable-next-line import/no-extraneous-dependencies

async function main() {
  const analytics=<string>process.argv.slice(2)[0];
  const args: boolean = process.argv.slice(2).length >= 2;
  const constructInfo = CDKMetaDataDeCoder(analytics);

  console.log('\n');
  console.log(chalk.yellowBright('NodeJS Version 👀 👀 👀 ...:  \n'));
  console.log(chalk.greenBright(constructInfo.filter((i: string)=>(
    i.startsWith('node.js')
  ))[0]), '\n');

  if (args) {
    console.log(chalk.yellowBright('ALL CDK MetaData'));
    console.log(constructInfo);
  }
};
main().catch((e) => {
  console.error(e.stack);
  process.exit(1);
});