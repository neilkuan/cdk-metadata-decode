const { typescript, github } = require('projen');
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  majorVersion: 1,
  name: 'cdk-metadata-decode',
  releaseToNpm: true,
  workflowNodeVersion: '^20',
  autoApproveOptions: {
    allowedUsernames: ['auto-machine'],
    secret: 'PROJEN_GITHUB_TOKEN',
  },
  repository: 'https://github.com/neilkuan/cdk-metadata-decode',
  depsUpgradeOptions: {
    workflowOptions: {
      projenCredentials: github.GithubCredentials.fromPersonalAccessToken({
        secret: 'AUTO_MACHINE_TOKEN',
      }),
    },
  },
  sampleCode: false,
  autoApproveUpgrades: true,
  deps: [
    'zlib',
    'chalk@4.1.2',
  ],
  bin: {
    'cdk-mdd': 'bin/cdk-mdd',
  },
});
project.synth();