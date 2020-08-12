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
  const sudo = await exec('which sudo');

  console.log('Uninstalling previous CML');
  await exec(
    `${sudo} npm uninstall -g canvas vega vega-cli vega-lite @dvcorg/cml`
  );

  console.log(`Installing CML version ${version}`);
  await exec('npm config set user 0 && npm config set unsafe-perm true');
  await exec(
    `${sudo} npm install -g canvas vega vega-cli vega-lite @dvcorg/cml${
      version !== 'latest' ? `@${version}` : ''
    }`
  );
};

exports.exec = exec;
exports.setup_cml = setup_cml;
