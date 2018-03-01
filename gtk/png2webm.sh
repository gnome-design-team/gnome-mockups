#!/bin/bash

ffmpeg -r 30 -i $1/%04d.png -c:v libvpx-vp9 -lossless 1 $1.webm
