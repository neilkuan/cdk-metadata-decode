import { CDKMetaDataDeCoder } from './version-decode';

async function main() {
  const analytics=<string>process.argv.slice(2)[0];
  const arg: boolean = process.argv.slice(2).length >= 2;
  CDKMetaDataDeCoder(analytics, arg);
};
main().catch((e) => {
  console.error(e.stack);
  process.exit(1);
});