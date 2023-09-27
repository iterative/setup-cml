const core = require('@actions/core');
const { setupCml, isNode16 } = require('./utils');

(async () => {
  try {
    const version = core.getInput('version');
    const sudo = core.getBooleanInput('sudo');
    const force = core.getBooleanInput('force');

    if (await isNode16()) {
      await setupCml({ version, sudo, force });
      core.info('Consider Migrating to setup-cml@v2: link');
    } else {
      core.warning('CML may not function properly see: link');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
