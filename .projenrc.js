const { typescript } = require('projen');
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  majorVersion: 1,
  name: 'cdk-metadata-decode',
  releaseToNpm: true,
  minNodeVersion: '16.0.0',
  workflowNodeVersion: '16.14.0',
  autoApproveOptions: {
    allowedUsernames: ['auto-machine'],
    secret: 'GITHUB_TOKEN',
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