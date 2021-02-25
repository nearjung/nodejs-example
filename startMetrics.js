var http = require('http');
var https = require('https');
const config = require('./configuration/config');
const fs = require("fs");
var stats = require('measured-core').createCollection();
const os = require('os');
const signalfx = require('signalfx');
const express = require('express');
const { SignalFxMetricsReporter, SignalFxSelfReportingMetricsRegistry } = require('measured-signalfx-reporter');
const { createProcessMetrics, createOSMetrics, createExpressMiddleware } = require('measured-node-metrics');
const libraryMetadata = require('./package'); // get metadata from package.json

const library = libraryMetadata.name;
const version = libraryMetadata.version;

// Report process and os stats 1x per minute
const PROCESS_AND_SYSTEM_METRICS_REPORTING_INTERVAL_IN_SECONDS = 60;
// Report the request count and histogram stats every 10 seconds
const REQUEST_METRICS_REPORTING_INTERVAL_IN_SECONDS = 10;

const defaultDimensions = {
  app: library,
  app_version: version,
  env: 'test'
};
const apiKeyResolver = () => {
    // https://diogomonica.com/2017/03/27/why-you-shouldnt-use-env-variables-for-secret-data/
    return process.env.SIGNALFX_API_KEY;
  };
  
  // Create the signal fx client
  const signalFxClient = new signalfx.Ingest(apiKeyResolver(), {
    userAgents: library
  });
  
  // Create the signal fx reporter with the client
  const signalFxReporter = new SignalFxMetricsReporter(signalFxClient, {
    defaultDimensions: defaultDimensions,
    defaultReportingIntervalInSeconds: 10,
    logLevel: 'debug'
  });
  
  // Create the self reporting metrics registry with the signal fx reporter
  const metricsRegistry = new SignalFxSelfReportingMetricsRegistry(signalFxReporter, { logLevel: 'debug' });
  
  createOSMetrics(metricsRegistry, {}, PROCESS_AND_SYSTEM_METRICS_REPORTING_INTERVAL_IN_SECONDS);
  createProcessMetrics(metricsRegistry, {}, PROCESS_AND_SYSTEM_METRICS_REPORTING_INTERVAL_IN_SECONDS);
  
  const app = express();
  // wire up the metrics middleware
  app.use(createExpressMiddleware(metricsRegistry, REQUEST_METRICS_REPORTING_INTERVAL_IN_SECONDS));
  
  app.get('/hello', (req, res) => {
    res.send('hello world');
  });
  
  app.get('/path2', (req, res) => {
    res.send('path2');
  });
  
  app.listen(9001, () => console.log("Start metrics server Port : 9001"));