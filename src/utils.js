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
    await exec('npm uninstall -g @dvcorg/cml canvas vega vega-cli vega-lite');
  } catch (err) {}

  try {
    console.log(`Installing CML version ${version}`);
    await exec('npm install -g vega vega-cli vega-lite');
    console.log(
      await exec(
        `npm i -g @dvcorg/cml${version !== 'latest' ? `@${version}` : ''}`
      )
    );

    /* if (process.platform === 'linux') {
      const command = 'apt-get install -y libfontconfig-dev';
      try {
        await exec(`sudo ${command}`);
      } catch (err) {
        await exec(command);
      }
    } */
  } catch (err) {}
};

exports.exec = exec;
exports.setup_cml = setup_cml;
