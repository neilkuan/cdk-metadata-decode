import { CDKMetaDataDeCoder } from '../src/version-decode';

test('CDKMetaDataDeCoder', () => {
  const a = 'v2:deflate64:H4sIAAAAAAAA/zWMyw6CMBBFv4V9HSiYuPUV1wY/wIztGKvtlPQhUcK/CxpX995zk9NABVJWxRrdm8vOdGQNU4Q9dda/HHE6JVQPIUGuaqgK59kr/YBhd+UjBnSUKIhp7Dxrk4xn0VL0OSgS2MfzYNFdNMIhs5rfLUYSyvqse0zqBsPGYnCz4FvGUUyimEJWaYZ/1yjYa4J7LJ9yCbWEprhHYxYhczKOoP3lB2nZwtTOAAAA';
  expect(CDKMetaDataDeCoder(a)).toStrictEqual([
    '3.0.110!@amzn/pipelines.DeploymentStack',
    '1.172.0!monocdk.CfnParameter',
    '1.172.0!monocdk.CfnCondition',
    '1.172.0!monocdk.Resource',
    '1.172.0!monocdk.aws_lambda.FunctionBase',
    '1.172.0!monocdk.aws_cloudwatch.Alarm',
    '1.172.0!monocdk.aws_cloudwatch.CfnAlarm',
    '1.172.0!monocdk.Construct',
    '1.172.0!monocdk.CfnResource',
    'node.js/v14.21.3!jsii-runtime.Runtime',
  ]);
});