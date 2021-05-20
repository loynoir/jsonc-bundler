#!/bin/bash
{
	set -eo pipefail
	[ -z "${DEBUG:-}" ] || set -x
	__dirname="$(dirname "$0")"
	readonly __dirname
	cd "${__dirname}" || exit 1

	export JSONC_EXTENDS=extends
    
	npm run --silent cli \
		"$PWD"/extend.tsconfig.json \
		>"$PWD"/spec/actual.bundle.tsconfig.json

	diff -u \
		./spec/actual.bundle.tsconfig.json \
		./spec/expected.bundle.tsconfig.json

	echo ">>> TEST: PASS"

	echo ">>> Exit"
	exit 0
}
