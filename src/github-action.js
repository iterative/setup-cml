const core = require('@actions/core');
const { setupCml } = require('./utils');

(async () => {
  try {
    const version = core.getInput('version');
    const sudo    = core.getBooleanInput('sudo'); 
    await setupCml({ version, sudo });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
