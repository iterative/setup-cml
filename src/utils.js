const util = require('util');

const execp = util.promisify(require('child_process').exec);
const exec = async (command, opts) => {
  return new Promise(function (resolve, reject) {
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
  let sudo = '';
  try {
    sudo = await exec('which sudo');
  } catch (err) {}

  if (platform === 'linux') {
    let git = true;
    try {
      await exec('git');
    } catch (err) {
      git = false;
    }

    try {
      if (!git) {
        await exec(`${sudo} add-apt-repository ppa:git-core/ppa && ${sudo} apt update -y && ${sudo} apt install git -y`);
      }
    } catch (err) {
      throw new Error('Git is not available and was not able to be installed either. This only works for debian distros');
    }
  }

  console.log('Uninstalling previous CML');
  await exec(
    `${sudo} npm uninstall -g canvas vega vega-cli vega-lite @dvcorg/cml`
  );

  console.log(`Installing CML version ${version}`);
  await exec('npm config set user 0');
  await exec(
    `${sudo} npm install -g canvas vega vega-cli vega-lite @dvcorg/cml${
      version !== 'latest' ? `@${version}` : ''
    }`
  );
};

exports.exec = exec;
exports.setup_cml = setup_cml;
