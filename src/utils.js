const util = require('util');

const execp = util.promisify(require('child_process').exec);
const exec = async (command, opts) => {
  return new Promise(function(resolve, reject) {
    const { debug } = opts || {};

    execp(command, (error, stdout, stderr) => {
      if (debug) console.log(`\nCommand: ${command}\n\t${stdout}\n\t${stderr}`);

      if (error) reject(error);

      resolve((stdout || stderr).slice(0, -1));
    });
  });
};

const setupCml = async opts => {
  const { version, sudo = true } = opts;
  let sudoPath = '';
  if (sudo) {
    try {
      sudoPath = await exec('which sudo');
    } catch (err) {}
  }

  await exec(`${sudoPath} npm config set user 0`);

  console.log('Uninstalling previous CML');
  await exec(
    `${sudoPath} npm uninstall -g canvas vega vega-cli vega-lite @dvcorg/cml`
  );

  console.log(`Installing CML version ${version}`);
  await exec('npm config set user 0');
  await exec(
    `${sudoPath} npm install -g canvas@2 vega@5 vega-cli@5 vega-lite@4 @dvcorg/cml${
      version !== 'latest' ? `@${version}` : ''
    }`
  );

  let installedVersion = '';
  try {
    const json = await exec('npm list --json --global @dvcorg/cml');
    installedVersion = JSON.parse(json).dependencies['@dvcorg/cml'].version;
    console.log(
      `Targeted CML version: ${version}, received: ${installedVersion}`
    );
  } catch (err) {}
};

exports.exec = exec;
exports.setupCml = setupCml;
