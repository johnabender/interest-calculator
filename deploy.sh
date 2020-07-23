#!/bin/zsh

aws --profile manage-s3 s3 rm --recursive s3://static.bendersystems.org/interest-calculator/
aws --profile manage-s3 s3 cp --recursive build/ s3://static.bendersystems.org/interest-calculator/
