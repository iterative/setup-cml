const core = require('@actions/core');
const { setupCml } = require('./utils');

(async () => {
  try {
    const version = core.getInput('version');
    const sudo = core.getBooleanInput('sudo');
    const override = core.getInput('override');
    await setupCml({ version, sudo, override });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
