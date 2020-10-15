const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    // Validate p12
    if (
      !core.getInput("p12-base64") &&
      (!core.getInput("p12-cer-base64") || !core.getInput("p12-cer-base64"))
    ) {
      throw new Error("P12 keys missing or in the wrong format.");
    }

    // Set environment variables
    process.env.P12_BASE64 = core.getInput("p12-base64");
    process.env.P12_KEY_BASE64 = core.getInput("p12-key-base64");
    process.env.P12_CER_BASE64 = core.getInput("p12-cer-base64");
    process.env.MOBILEPROVISION_BASE64 = core.getInput(
      "mobileprovision-base64"
    );
    process.env.PROJECT_PATH = core.getInput("project-path");
    process.env.CODE_SIGNING_IDENTITY = core.getInput("code-signing-identity");
    process.env.TEAM_ID = core.getInput("team-id");
    process.env.WORKSPACE_PATH = core.getInput("workspace-path");
    process.env.EXPORT_METHOD = core.getInput("export-method");
    process.env.CONFIGURATION = core.getInput("configuration");
    process.env.CERTIFICATE_PASSWORD = core.getInput("certificate-password");
    process.env.OUTPUT_PATH = core.getInput("output-path");
    process.env.SCHEME = core.getInput("scheme");
    process.env.UPDATE_TARGETS = core.getInput("update-targets");
    process.env.DISABLE_TARGETS = core.getInput("disable-targets");
    process.env.EXPORT_OPTIONS = core.getInput("export-options");

    // Execute build.sh
    await exec.exec(`bash ${__dirname}/build.sh`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
