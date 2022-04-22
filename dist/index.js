module.exports=function(e,t){"use strict";var n={};function __webpack_require__(t){if(n[t]){return n[t].exports}var o=n[t]={i:t,l:false,exports:{}};e[t].call(o.exports,o,o.exports,__webpack_require__);o.l=true;return o.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(614)}return startup()}({82:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.toCommandProperties=t.toCommandValue=void 0;function toCommandValue(e){if(e===null||e===undefined){return""}else if(typeof e==="string"||e instanceof String){return e}return JSON.stringify(e)}t.toCommandValue=toCommandValue;function toCommandProperties(e){if(!Object.keys(e).length){return{}}return{title:e.title,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}}t.toCommandProperties=toCommandProperties},87:function(e){e.exports=require("os")},102:function(e,t,n){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){if(o===undefined)o=n;Object.defineProperty(e,o,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,o){if(o===undefined)o=n;e[o]=t[n]});var r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))o(t,e,n);r(t,e);return t};Object.defineProperty(t,"__esModule",{value:true});t.issueCommand=void 0;const s=i(n(747));const u=i(n(87));const a=n(82);function issueCommand(e,t){const n=process.env[`GITHUB_${e}`];if(!n){throw new Error(`Unable to find environment variable for file command ${e}`)}if(!s.existsSync(n)){throw new Error(`Missing file at path: ${n}`)}s.appendFileSync(n,`${a.toCommandValue(t)}${u.EOL}`,{encoding:"utf8"})}t.issueCommand=issueCommand},129:function(e){e.exports=require("child_process")},431:function(e,t,n){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){if(o===undefined)o=n;Object.defineProperty(e,o,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,o){if(o===undefined)o=n;e[o]=t[n]});var r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))o(t,e,n);r(t,e);return t};Object.defineProperty(t,"__esModule",{value:true});t.issue=t.issueCommand=void 0;const s=i(n(87));const u=n(82);function issueCommand(e,t,n){const o=new Command(e,t,n);process.stdout.write(o.toString()+s.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const a="::";class Command{constructor(e,t,n){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=n}toString(){let e=a+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const n in this.properties){if(this.properties.hasOwnProperty(n)){const o=this.properties[n];if(o){if(t){t=false}else{e+=","}e+=`${n}=${escapeProperty(o)}`}}}}e+=`${a}${escapeData(this.message)}`;return e}}function escapeData(e){return u.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return u.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},470:function(e,t,n){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){if(o===undefined)o=n;Object.defineProperty(e,o,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,o){if(o===undefined)o=n;e[o]=t[n]});var r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.hasOwnProperty.call(e,n))o(t,e,n);r(t,e);return t};var s=this&&this.__awaiter||function(e,t,n,o){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,r){function fulfilled(e){try{step(o.next(e))}catch(e){r(e)}}function rejected(e){try{step(o["throw"](e))}catch(e){r(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((o=o.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});t.getState=t.saveState=t.group=t.endGroup=t.startGroup=t.info=t.notice=t.warning=t.error=t.debug=t.isDebug=t.setFailed=t.setCommandEcho=t.setOutput=t.getBooleanInput=t.getMultilineInput=t.getInput=t.addPath=t.setSecret=t.exportVariable=t.ExitCode=void 0;const u=n(431);const a=n(102);const c=n(82);const f=i(n(87));const l=i(n(622));var p;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(p=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){const n=c.toCommandValue(t);process.env[e]=n;const o=process.env["GITHUB_ENV"]||"";if(o){const t="_GitHubActionsFileCommandDelimeter_";const o=`${e}<<${t}${f.EOL}${n}${f.EOL}${t}`;a.issueCommand("ENV",o)}else{u.issueCommand("set-env",{name:e},n)}}t.exportVariable=exportVariable;function setSecret(e){u.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){const t=process.env["GITHUB_PATH"]||"";if(t){a.issueCommand("PATH",e)}else{u.issueCommand("add-path",{},e)}process.env["PATH"]=`${e}${l.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const n=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!n){throw new Error(`Input required and not supplied: ${e}`)}if(t&&t.trimWhitespace===false){return n}return n.trim()}t.getInput=getInput;function getMultilineInput(e,t){const n=getInput(e,t).split("\n").filter(e=>e!=="");return n}t.getMultilineInput=getMultilineInput;function getBooleanInput(e,t){const n=["true","True","TRUE"];const o=["false","False","FALSE"];const r=getInput(e,t);if(n.includes(r))return true;if(o.includes(r))return false;throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}\n`+`Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)}t.getBooleanInput=getBooleanInput;function setOutput(e,t){process.stdout.write(f.EOL);u.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setCommandEcho(e){u.issue("echo",e?"on":"off")}t.setCommandEcho=setCommandEcho;function setFailed(e){process.exitCode=p.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){u.issueCommand("debug",{},e)}t.debug=debug;function error(e,t={}){u.issueCommand("error",c.toCommandProperties(t),e instanceof Error?e.toString():e)}t.error=error;function warning(e,t={}){u.issueCommand("warning",c.toCommandProperties(t),e instanceof Error?e.toString():e)}t.warning=warning;function notice(e,t={}){u.issueCommand("notice",c.toCommandProperties(t),e instanceof Error?e.toString():e)}t.notice=notice;function info(e){process.stdout.write(e+f.EOL)}t.info=info;function startGroup(e){u.issue("group",e)}t.startGroup=startGroup;function endGroup(){u.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return s(this,void 0,void 0,function*(){startGroup(e);let n;try{n=yield t()}finally{endGroup()}return n})}t.group=group;function saveState(e,t){u.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},543:function(e,t,n){const o=n(669);const r=o.promisify(n(129).exec);const i=async(e,t)=>{return new Promise(function(n,o){const{debug:i}=t||{};r(e,(t,r,s)=>{if(i)console.log(`\nCommand: ${e}\n\t${r}\n\t${s}`);if(t)o(t);n((r||s).slice(0,-1))})})};const s=async e=>{const{version:t="latest",sudo:n=true,force:o=false}=e;const r="@dvcorg/cml";let s="";if(n){try{s=await i("which sudo")}catch(e){}if(s){s+=' env "PATH=$PATH"'}}try{const e=await i("echo none | cml --version");let n=t;if(n==="latest")n=await i("npm show @dvcorg/cml version");if(!o&&e.includes(n)){console.log(`CML ${t} is already installed. Nothing to do.`);return}}catch(e){}console.log("Uninstalling previous CML");await i(`${s} npm uninstall -g ${r}`);console.log(`Installing CML version ${t}`);await i("npm config set user 0");console.log(await i(`${s} npm install -g${o?"f":""} canvas@2 vega@5 vega-cli@5 vega-lite@4 ${r}${t!=="latest"?`@${t}`:""}`))};t.exec=i;t.setupCml=s},614:function(e,t,n){const o=n(470);const{setupCml:r}=n(543);(async()=>{try{const e=o.getInput("version");const t=o.getBooleanInput("sudo");const n=o.getBooleanInput("force");await r({version:e,sudo:t,force:n})}catch(e){o.setFailed(e.message)}})()},622:function(e){e.exports=require("path")},669:function(e){e.exports=require("util")},747:function(e){e.exports=require("fs")}});