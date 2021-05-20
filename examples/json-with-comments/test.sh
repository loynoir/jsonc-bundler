#!/bin/bash
{
	set -eo pipefail
	[ -z "${DEBUG:-}" ] || set -x
	__dirname="$(dirname "$0")"
	readonly __dirname
	cd "${__dirname}" || exit 1

	export JSONC_EXTENDS=include
    
	npm run --silent cli \
		"$PWD"/extend.jsonc \
		>"$PWD"/spec/actual.bundle.jsonc

	diff -u \
		./spec/actual.bundle.jsonc \
		./spec/expected.bundle.jsonc

	echo ">>> TEST: PASS"

	echo ">>> Exit"
	exit 0
}
