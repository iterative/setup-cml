import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import fetch from 'node-fetch'; // can be remove is github actions runs node 18 > https://github.com/octokit/octokit.js/#fetch-missing
import {Octokit} from '@octokit/rest';
import os from 'os';
import {chmodSync, copyFileSync, lstatSync} from 'fs';

async function run() {
  try {
    const version = core.getInput('version');
    const arch = os.arch();
    const platform = os.platform();

    let cmlPath = tc.find('cml', version);
    console.log('cmlPath: ', cmlPath);
    if (cmlPath) {
      core.addPath(cmlPath);
    } else {
      const filename = deriveCMLAsset(arch, platform);
      console.log('filename: ', filename);
      const {url, version: retrievedVersion} = await getCmlDownloadUrl(
        version,
        filename
      );
      console.log('url: ', url);
      console.log('retrievedVersion: ', retrievedVersion);
      cmlPath = await tc.downloadTool(url);
      const downloadedCML = `${cmlPath}/${filename}`;
      const nomalizedCML = `${cmlPath}/cml`;
      console.log('cmlPath: ', cmlPath);
      console.log(lstatSync(cmlPath));
      //console.log(lstatSync(downloadedCML));
      //copyFileSync(downloadedCML, nomalizedCML);
      const cachedCML = await tc.cacheFile(
        cmlPath,
        'cml',
        'cml',
        retrievedVersion
      );
      console.log('cachedCML: ', cachedCML);
      console.log(lstatSync(cachedCML));
      chmodSync(`${cachedCML}/cml`, '755');
      core.addPath(cachedCML);
    }
  } catch (error: any) {
    core.setFailed(error);
  }
}

interface CMLDownloadResponse {
  url: string;
  version: string;
}

async function getCmlDownloadUrl(
  version: string,
  assetName: string
): Promise<CMLDownloadResponse> {
  const octokit = new Octokit({
    request: {
      fetch: fetch
    }
  });
  let release;
  if (version == 'latest') {
    const response = await octokit.repos.getLatestRelease({
      owner: 'iterative',
      repo: 'cml'
    });
    release = response.data;
  } else {
    const response = await octokit.repos.getReleaseByTag({
      owner: 'iterative',
      repo: 'cml',
      tag: version
    });
    release = response.data;
  }
  const {tag_name, assets} = release;
  const asset = assets.find(asset => asset.name == assetName);
  if (!asset) {
    throw new Error(
      `Could not find CML binary ${assetName} for version ${version}`
    );
  }
  return {url: asset.browser_download_url, version: tag_name};
}

function deriveCMLAsset(arch: string, platform: string): string {
  if (!(arch == 'x64' || arch == 'arm64')) {
    throw new Error(`CML Unsupported architecture ${arch}`);
  }
  switch (platform) {
    case 'darwin':
      return `cml-macos-${arch}`;
    case 'linux':
      return `cml-linux-${arch}`;
    case 'win32':
      return `cml-win-${arch}.exe`;
    default:
      throw new Error(`CML Unsupported platform ${platform}`);
  }
}

run();
