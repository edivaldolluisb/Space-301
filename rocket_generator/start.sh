#!/bin/bash

poetry run python rocket_generator/receiver.py &
poetry run python rocket_generator/main.py
