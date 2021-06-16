const core = require('@actions/core');
const { setupCml } = require('./utils');

(async () => {
  try {
    const version = core.getInput('version');
    await setupCml({ version });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
