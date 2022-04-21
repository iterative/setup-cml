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
  /* const { version, sudo = true, force = false } = opts;
  const pkg = '@dvcorg/cml';

  let sudoPath = '';
  if (sudo) {
    try {
      console.log(`sudo`);
      sudoPath = await exec('which sudo');
    } catch (err) {}
    if (sudoPath) {
      sudoPath += ' env "PATH=$PATH"';
    }
  }

  console.log(`cconfig set user 0`);
  await exec(`${sudoPath} npm config set user 0`);

  try {
    console.log(`cml --version`);
    // console.log(await exec('cml --version'))
    const cmlVer = await exec('cml --version');
    let ver = version;
    console.log(`check latest`);
    if (ver === 'latest') ver = await exec('npm show @dvcorg/cml version');
    if (!force && cmlVer.includes(ver)) {
      console.log(`CML ${version} is already installed. Nothing to do.`);
      return;
    }
  } catch (err) {}

  console.log('Uninstalling previous CML');
  console.log(await exec(`${sudoPath} npm uninstall -g ${pkg}`));

  console.log(`Installing CML version ${version}`);
  await exec('npm config set user 0');
  console.log(
    await exec(
      `${sudoPath} npm install -g${
        force ? 'f' : ''
      } canvas@2 vega@5 vega-cli@5 vega-lite@4 ${pkg}${
        version !== 'latest' ? `@${version}` : ''
      }`
    )
  ); */

  const { version } = opts;
  console.log(await exec(`Installing CML version ${version}`));
};

exports.exec = exec;
exports.setupCml = setupCml;
