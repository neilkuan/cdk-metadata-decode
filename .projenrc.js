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
  npmProvenance: true,
  npmTokenSecret: '',
  npmTrustedPublishing: true,
  deps: [
    'zlib',
    'chalk@4.1.2',
  ],
  bin: {
    'cdk-mdd': 'bin/cdk-mdd',
  },
});

// Add registry-url to setup-node in release_npm job for OIDC Trusted Publishing
const releaseWorkflow = project.release.publisher.project.tryFindObjectFile('.github/workflows/release.yml');
if (releaseWorkflow) {
  releaseWorkflow.addOverride('jobs.release_npm.steps.0.with.registry-url', 'https://registry.npmjs.org');
}

// Add provenance to publishConfig in package.json
project.package.addField('publishConfig', {
  access: 'public',
  provenance: true,
});

project.synth();