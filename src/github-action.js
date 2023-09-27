const core = require('@actions/core');
const { setupCml, isNode16 } = require('./utils');

const v1Link = 'https://github.com/iterative/setup-cml/tree/v1#note-on-v1';
const v2Link = 'https://github.com/iterative/setup-cml';

(async () => {
  try {
    const version = core.getInput('version');
    const sudo = core.getBooleanInput('sudo');
    const force = core.getBooleanInput('force');

    if (await isNode16()) {
      await setupCml({ version, sudo, force });
      core.info(`Consider Migrating to setup-cml@v2: ${v2Link}`);
    } else {
      core.warning(`CML may not function properly see: ${v1Link}`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
