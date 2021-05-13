const core = require('@actions/core');
const { setupCML } = require('./utils');

(async () => {
  try {
    const version = core.getInput('version');
    await setupCML({ version });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
