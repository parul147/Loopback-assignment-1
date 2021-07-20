import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

var path = require('path');
var filename = path.basename('../../data/db.json');
const config = {
  name: 'postdb',
  connector: 'memory',
  localStorage: '',
  file: filename
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
