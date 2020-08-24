const core = require('@actions/core');
const { setup_cml } = require('./utils');

(async () => {
  try {
    const version = core.getInput('version');
    await setup_cml({ version });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
