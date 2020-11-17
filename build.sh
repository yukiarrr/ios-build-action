#!/bin/bash -e

if ! type fastlane > /dev/null 2>&1; then
  if type brew > /dev/null 2>&1; then
    brew install fastlane
  else
    sudo gem install fastlane -NV
  fi
fi

script_path=$(cd $(dirname ${0}); pwd)
cp -r ${script_path}/fastlane ./
cp -r ${script_path}/Gemfile ./

if [[ ! -z $P12_KEY_BASE64 && ! -z $P12_CER_BASE64 ]]; then
    echo $P12_KEY_BASE64 | base64 --decode > ios-build-key.p12
    echo $P12_CER_BASE64 | base64 --decode > ios-build-key.cer
    export CERTIFICATE_SPLIT=1
else
    echo $P12_BASE64 | base64 --decode > ios-build.p12
fi
echo $MOBILEPROVISION_BASE64 | base64 --decode > ios-build.mobileprovision

if [[ $BROWSERSTACK_UPLOAD = true || $BUILD_PODS = true ]]; then
    bundle install
fi
fastlane export_ipa
