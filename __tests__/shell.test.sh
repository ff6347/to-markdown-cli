#!/usr/bin/env bash
# shellcheck disable=SC2016
set -u pipefail
IFS=$'\n\t'
output=$(echo "<h1>foo</h1>" | html2md)
exitcode=1
if echo "$output" | grep -q "# foo"; then
  echo "Test passed"
  echo "$output"
  exitcode=0
else
  echo "Test failed"
  echo "$output"
  exitcode=1
fi
output=$(html2md -c)
if echo "$output" | grep -q 'Couldn'\''t find the `xsel` binary and fallback didn'\''t work. On Debian/Ubuntu you can install xsel with: sudo apt install xsel'; then
  echo "Test passed xsel"
  echo "$output"
  exitcode=0
else
  echo "Test failed xsel"
  echo "$output"
  exitcode=1
fi
exit $exitcode
