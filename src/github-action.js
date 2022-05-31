const core = require('@actions/core');
const { setupCml } = require('./utils');

(async () => {
  try {
    const version = core.getInput('version');
    const sudo = core.getBooleanInput('sudo');
    const force = core.getBooleanInput('force');
    let ci = core.getInput('ci');

    try {
      ci = core.getBooleanInput('ci');
    } catch (error) {}

    await setupCml({ version, sudo, force, ci });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
