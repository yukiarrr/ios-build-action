#!/bin/bash -e

echo $P12_BASE64 | base64 --decode > ios-build.p12
echo $MOBILEPROVISION_BASE64 | base64 --decode > ios-build.mobileprovision

script_path=$(cd $(dirname ${0}); pwd)
cd $(dirname ${PROJECT_PATH})
cp -r ${script_path}/fastlane ./

fastlane export_ipa
