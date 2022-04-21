const core = require('@actions/core');
const { setupCml } = require('./utils');

(async () => {
  try {
    const version = core.getInput('version');
    const sudo = core.getBooleanInput('sudo');
    // const force = core.getBooleanInput('force');
    await setupCml({ version, sudo, force: false });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
