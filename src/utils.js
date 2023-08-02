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
      console.log(
        await exec(`cml ci`)
      );
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

  console.log(
    await exec(`cml ci`)
  );
};

const download = async (url, path) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    if (res.status !== 200) return reject(new Error(res.statusText));
    res.body.pipe(fileStream);
    res.body.on('error', err => {
      reject(err);
    });
    fileStream.on('finish', function() {
      resolve();
    });
  });
};

const getLatestVersion = async () => {
  const endpoint = 'https://updater.dvc.org';
  const response = await fetch(endpoint, { method: 'GET' });
  const { version } = await response.json();

  return version;
};

const setupDVC = async opts => {
  const { platform } = process;
  let { version = '' } = opts;
  if (!version) return;

  if (version === 'latest') {
    version = await getLatestVersion();
  }

  if (platform === 'linux') {
    let sudo = '';
    try {
      sudo = await exec('which sudo');
    } catch (err) {}
    try {
      const dvcURL = `https://dvc.org/download/linux-deb/dvc-${version}`;
      console.log(`Installing DVC from: ${dvcURL}`);
      await download(dvcURL, 'dvc.deb');
    } catch (err) {
      console.log('DVC Download Failed, trying from GitHub Releases');
      const dvcURL = `https://github.com/iterative/dvc/releases/download/${version}/dvc_${version}_amd64.deb`;
      console.log(`Installing DVC from: ${dvcURL}`);
      await download(dvcURL, 'dvc.deb');
    }
    console.log(
      await exec(
        `${sudo} apt update && ${sudo} apt install -y --allow-downgrades git ./dvc.deb && ${sudo} rm -f 'dvc.deb'`
      )
    );
  }

  if (platform === 'darwin') {
    try {
      const dvcURL = `https://dvc.org/download/osx/dvc-${version}`;
      console.log(`Installing DVC from: ${dvcURL}`);
      await download(dvcURL, 'dvc.pkg');
    } catch (err) {
      console.log('DVC Download Failed, trying from GitHub Releases');
      const dvcURL = `https://github.com/iterative/dvc/releases/download/${version}/dvc-${version}.pkg`;
      console.log(`Installing DVC from: ${dvcURL}`);
      await download(dvcURL, 'dvc.pkg');
    }
    console.log(
      await exec(`sudo installer -pkg "dvc.pkg" -target / && rm -f "dvc.pkg"`)
    );
  }

  if (platform === 'win32') {
    console.log('Installing DVC with pip');
    console.log(
      await exec(
        `pip install --upgrade dvc[all]${
          version !== 'latest' ? `==${version}` : ''
        }`
      )
    );
  }
};

exports.exec = exec;
exports.setupCml = setupCml;
exports.setupDVC = setupDVC;
