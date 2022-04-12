#!/bin/bash
cd /Users/annereis/carda-gatsby
export PATH=/usr/local/bin:$PATH
/usr/local/bin/yarn imagine $1 &> ~/imagine.txt
open ~/imagine.txt