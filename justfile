#!/usr/bin/env just --justfile
export PATH := "./node_modules/.bin:" + env_var('PATH')

build:
  docker build -t uwusite .
