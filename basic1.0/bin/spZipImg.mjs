#!/usr/bin/env node
import run from '../index.js'
const argv =  process.argv.slice(2)
const argv0 = argv[0];
run(argv0)
