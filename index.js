const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    // Validate p12 keys.
    if (!core.getInput("p12-base64")
      && (!core.getInput("p12-cer-base64") || !core.getInput("p12-key-base64"))) {
      throw new Error("P12 keys missing or in the wrong format.");
    }
    if (core.getInput("browserstack-upload").toLowerCase() === 'true'
      && (!core.getInput("browserstack-username") || !core.getInput("browserstack-access-key"))) {
      throw new Error("Browserstack username or access key missing.");
    }
    process.env.PROJECT_PATH = core.getInput("project-path");
    process.env.P12_BASE64 = core.getInput("p12-base64");
    process.env.P12_KEY_BASE64 = core.getInput("p12-key-base64");
    process.env.P12_CER_BASE64 = core.getInput("p12-cer-base64");
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
    process.env.DISABLE_TARGETS = core.getInput("disable-targets");
    process.env.BROWSERSTACK_UPLOAD = core.getInput("browserstack-upload");
    process.env.BROWSERSTACK_USERNAME = core.getInput("browserstack-username");
    process.env.BROWSERSTACK_ACCESS_KEY = core.getInput("browserstack-access-key");
    process.env.BUILD_PODS = core.getInput("build-pods");
    process.env.PODS_PATH = core.getInput("pods-path");
    await exec.exec(`bash ${__dirname}/../build.sh`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
