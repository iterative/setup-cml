const util = require('util');
const semver = require('semver');

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

const isNode16 = async () => {
  try {
    const version = await exec('node --version');
    return semver.satisfies(version, '16.x.x');
  } catch (err) {
    return false;
  }
};

const setupCml = async opts => {
  const { version = 'latest', sudo = true, force = false } = opts;
  const pkg = '@dvcorg/cml';

  let sudoPath = '';
  if (sudo) {
    try {
      sudoPath = await exec('which sudo');
    } catch (err) {}
    if (sudoPath) {
      sudoPath += ' env "PATH=$PATH"';
    }
  }

  try {
    const cmlVer = await exec(':|cml --version');
    let ver = version;
    if (ver === 'latest') ver = await exec('npm show @dvcorg/cml version');
    if (!force && cmlVer.includes(ver)) {
      console.log(`CML ${version} is already installed. Nothing to do.`);
      return;
    }
  } catch (err) {}

  console.log('Uninstalling previous CML');
  await exec(`${sudoPath} npm uninstall -g ${pkg}`);

  console.log(`Installing CML version ${version}`);

  // invalid for npm v9+
  try {
    await exec('npm config set user 0');
  } catch (err) {} // https://github.com/iterative/setup-cml/issues/85

  console.log(
    await exec(
      `${sudoPath} npm install -g${
        force ? 'f' : ''
      } canvas@2 vega@5 vega-cli@5 vega-lite@5 ${pkg}${
        version !== 'latest' ? `@${version}` : ''
      }`
    )
  );
};

exports.exec = exec;
exports.setupCml = setupCml;
exports.isNode16 = isNode16;
