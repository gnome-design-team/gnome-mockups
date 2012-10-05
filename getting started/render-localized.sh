case $1 in
	osx)
	  export PYTHONPATH="/Users/jimmac/.blender/scripts"
          blender="/Applications/blender.app/Contents/MacOS/blender";;
	linux)
          export PYTHONPATH=$PYTHONPATH:/usr/lib64/python3.3/site-packages
	  blender="blender";;
esac

for file in *blend
  do
  $blender -b $file -P workaround.py
done
