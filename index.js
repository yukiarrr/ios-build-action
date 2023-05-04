const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    // Validate p12
    if (
      !core.getInput("p12-base64") &&
      (!core.getInput("p12-key-base64") || !core.getInput("p12-cer-base64")) &&
      !core.getInput("p12-path") &&
      (!core.getInput("p12-key-path") || !core.getInput("p12-cer-path"))
    ) {
      throw new Error("P12 keys missing or in the wrong format.");
    }

    // Validate mobileprovision
    if (
      !core.getInput("mobileprovision-base64") &&
      !core.getInput("mobileprovision-path")
    ) {
      throw new Error("mobileprovision missing or in the wrong format.");
    }

    // Validate increment build number
    if (
      core.getInput("increment-build-number") === "testflight" &&
      (!core.getInput("bundle-identifier") || !core.getInput("app-store-connect-api-key-id") || !core.getInput("app-store-connect-api-key-issuer-id") || !core.getInput("app-store-connect-api-key-base64"))
    ) {
      throw new Error("increment-build-number='testflight' requires 'bundle-identifier', 'app-store-connect-api-key-id', 'app-store-connect-api-key-issuer-id' and 'app-store-connect-api-key-base64' to be provided.");
    }

    // Set environment variables
    process.env.P12_BASE64 = core.getInput("p12-base64");
    process.env.P12_KEY_BASE64 = core.getInput("p12-key-base64");
    process.env.P12_CER_BASE64 = core.getInput("p12-cer-base64");
    process.env.MOBILEPROVISION_BASE64 = core.getInput(
      "mobileprovision-base64"
    );
    process.env.P12_PATH = core.getInput("p12-path");
    process.env.P12_KEY_PATH = core.getInput("p12-key-path");
    process.env.P12_CER_PATH = core.getInput("p12-cer-path");
    process.env.MOBILEPROVISION_PATH = core.getInput("mobileprovision-path");
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
    process.env.CLONED_SOURCE_PACKAGES_PATH = core.getInput(
      "cloned-source-packages-path"
    );
    process.env.BUILD_SDK = core.getInput("build-sdk");
    process.env.BUILD_DESTINATION = core.getInput("build-destination");
    process.env.ENTITLMENTS_FILE_PATH = core.getInput("entitlements-file-path");
    process.env.INCREMENT_BUILD_NUMBER = core.getInput("increment-build-number");
    process.env.INCREMENT_VERSION_NUMBER = core.getInput('increment-version-number');
    process.env.BUNDLE_IDENTIFIER = core.getInput('bundle-identifier');
    process.env.APP_STORE_CONNECT_API_KEY_ID = core.getInput('app-store-connect-api-key-id');
    process.env.APP_STORE_CONNECT_API_KEY_ISSUER_ID = core.getInput('app-store-connect-api-key-issuer-id');
    process.env.APP_STORE_CONNECT_API_KEY_BASE64 = core.getInput('app-store-connect-api-key-base64');
    process.env.BUILD_PATH = core.getInput('build-path');
    process.env.CUSTOM_KEYCHAIN_NAME = core.getInput('custom-keychain-name');

    // Execute build.sh
    await exec.exec(`bash ${__dirname}/../build.sh`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
