const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    process.env.PROJECT_PATH = core.getInput("project-path");
    process.env.P12_BASE64 = core.getInput("p12-base64");
    process.env.MOBILEPROVISION_BASE64 = core.getInput(
      "mobileprovision-base64"
    );
    process.env.CODE_SIGNING_IDENTITY = core.getInput("code-signing-identity");
    process.env.TEAM_ID = core.getInput("team-id");
    process.env.WORKSPACE_PATH = core.getInput("workspace-path");
    process.env.EXPORT_METHOD = core.getInput("export-method");
    process.env.CONFIGURATION = core.getInput("configuration");
    process.env.CERTIFICATE_PASSWORD = core.getInput("certificate-password");
    process.env.OUTPUT_PATH = core.getInput("output-path");
    process.env.SCHEME = core.getInput("scheme");

    await exec.exec(`/bin/bash ${__dirname}/build.sh`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
