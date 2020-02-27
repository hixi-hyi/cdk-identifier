#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import mycdk = require('../../');
const app = new cdk.App();

const baseId = new mycdk.Identifier(new mycdk.Rank({
  kingdom: 'hixi',
  division: 'someapp',
  section: 'dev',
}));

const serviceId = baseId.child({legion:"service"})
{
  // family = Standard
  const standardId = serviceId.child({family:"standard"});
  const common = new CommonStack(app, standardId.child({genus:'common'}));
  const api = new ApiStack(app, standardId.child({genus:'apo'});
}
