#!bin/tool.sh

directories=$(ls -d */)

for dir in $directories
    do
        echo "processing $dir..."
        cd $dir

        ##############################

        cd ..
        echo $dir
    done