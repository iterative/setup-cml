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
  const { version, sudo = true, override = '' } = opts;
  const orFlag = override !== '';
  let sudoPath = '';
  if (sudo) {
    try {
      sudoPath = await exec('which sudo');
    } catch (err) {}
  }

  await exec(`${sudoPath} npm config set user 0`);
  console.log('Uninstalling previous CML');
  await exec(
    `${sudoPath} npm uninstall -g canvas vega vega-cli vega-lite @dvcorg/cml ${
      orFlag ? override : ''
    }`
  );

  console.log(`Installing CML version ${orFlag ? override : version}`);
  await exec('npm config set user 0');
  await exec(
    `${sudoPath} npm install -g canvas@2 vega@5 vega-cli@5 vega-lite@4 ${
      orFlag
        ? override
        : `@dvcorg/cml${version !== 'latest' ? `@${version}` : ''}`
    }`
  );

  let installedVersion = '';
  try {
    const json = await exec('npm list --json --global @dvcorg/cml');
    installedVersion = JSON.parse(json).dependencies['@dvcorg/cml'].version;
    console.log(
      `Targeted CML version: ${version}, received: ${installedVersion} ${
        orFlag ? `but from overide at: ${override}` : ''
      }`
    );
  } catch (err) {
    console.log('Failed to parse the install version of CML.', err);
    process.exit(1);
  }
};

exports.exec = exec;
exports.setupCml = setupCml;
