const core = require('@actions/core');
const { setupCml, setupDVC } = require('./utils');

(async () => {
  try {
    const version = core.getInput('version');
    const sudo = core.getBooleanInput('sudo');
    const force = core.getBooleanInput('force');
    await setupCml({ version, sudo, force });
    const dvcVersion = core.getInput('dvc_version');
    await setupDVC({ dvcVersion });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
