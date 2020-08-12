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

const setup_cml = async opts => {
  const { version } = opts;

  try {
    console.log('Uninstalling previous CML');
    const uninstall_cmd =
      'npm uninstall -g canvas vega vega-cli vega-lite @dvcorg/cml';
    try {
      await exec(`${uninstall_cmd}`);
    } catch (err) {
      await exec(`sudo ${uninstall_cmd}`);
    }
  } catch (err) {}

  try {
    console.log(`Installing CML version ${version}`);

    const install_cmd = `npm install -g canvas vega vega-cli vega-lite @dvcorg/cml${
      version !== 'latest' ? `@${version}` : ''
    }`;

    console.log(
      await exec('npm config set user 0 && npm config set unsafe-perm true')
    );
    try {
      await exec(`${install_cmd}`);
    } catch (err) {
      await exec(`sudo ${install_cmd}`);
    }
  } catch (err) {
    console.error(err);
  }
};

exports.exec = exec;
exports.setup_cml = setup_cml;
