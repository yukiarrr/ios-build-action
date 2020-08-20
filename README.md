# iOS Build Action

This action build iOS project. (.xcodeproj, .xcworkspace)

And can export to ipa, so it can be continuously delivered to DeployGate and TestFlight.

self-hosted is also supported. If you use self-hosted, install Xcode.

## Inputs

You can add a single p12 key+cert file with `p12-base64`, or if you have key and cert in separate files
you can add them with `p12-key-base64` and `p12-cer-base64`. One of the two options is required.

### `project-path`

**Required** .xcodeproj path.

### `p12-base64`

**Required if single file**: Base64 encoded p12 file (key + cert).

### `p12-key-base64`

**Required if split key/cert**: Base64 encoded p12 key file.

### `p12-cer-base64`

**Required if split key/cert**: Base64 encoded certificate for the p12 key.

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

### `disable-targets`

These targets will not use automatic code signing and instead use the identity specified in other inputs. Input targets separated by ','. For example, 'MyApp,YourApp'. Default "".  (default to all targets)

## Contributions Welcome!

If you have any other inputs you'd like to add, feel free to create PR.

Welcome your contributions!

## Example usage

### single p12

```yaml
- uses: yukiarrr/ios-build-action@v1.1.1
  with:
    project-path: Unity-iPhone.xcodeproj
    p12-base64: ${{ secrets.P12_BASE64 }}
    mobileprovision-base64: ${{ secrets.MOBILEPROVISION_BASE64 }}
    code-signing-identity: ${{ secrets.CODE_SIGNING_IDENTITY }}
    team-id: ${{ secrets.TEAM_ID }}
    workspace-path: Unity-iPhone.xcworkspace # optional
```

### key and cert

```yaml
- uses: yukiarrr/ios-build-action@v1.1.1
  with:
    project-path: Unity-iPhone.xcodeproj
    p12-key-base64: ${{ secrets.P12_KEY_BASE64 }}
    p12-cer-base64: ${{ secrets.P12_CER_BASE64 }}
    mobileprovision-base64: ${{ secrets.MOBILEPROVISION_BASE64 }}
    code-signing-identity: ${{ secrets.CODE_SIGNING_IDENTITY }}
    team-id: ${{ secrets.TEAM_ID }}
    workspace-path: Unity-iPhone.xcworkspace # optional
```
