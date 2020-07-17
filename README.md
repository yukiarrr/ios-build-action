# iOS Build Action

This action build iOS project. (.xcodeproj, .xcworkspace)

And, can export to ipa, so it can be continuously delivered to DeployGate and TestFlight.

## Inputs

### `project-path`

**Required** .xcodeproj path.

### `p12-base64`

**Required** Base64 encoded p12 file.

### `mobileprovision-base64`

**Required** Base64 encoded mobileprovision file.

### `code-signing-identity`

**Required** For example, `"iOS Distribution"`.

### `team-id`

**Required** Team id.

### `workspace-path`

.xcworkspace path. Default `""`.

### `export-method`

Choose app-store, `"ad-hoc"`, `"package"` `"enterprise"`, `"development"`, or `"developer-id"`. Default `"app-store"`.

### `configuration`

For example, `"Debug"`, `"Release"`. Default `"Release"`.

### `scheme`

For example, `"myscheme"`.

### `certificate-password`

Certificate password. Default `""`.

### `output-path`

Output path of ipa. Default `"output.ipa"`.

## Example usage

### Unity

```yaml
- uses: yukiarrr/ios-build-action@v1.0.0
  with:
    project-path: Unity-iPhone.xcodeproj
    p12-base64: ${{ secrets.P12_BASE64 }}
    mobileprovision-base64: ${{ secrets.MOBILEPROVISION_BASE64 }}
    code-signing-identity: ${{ secrets.CODE_SIGNING_IDENTITY }}
    team-id: ${{ secrets.TEAM_ID }}
    workspace-path: Unity-iPhone.xcworkspace
```
