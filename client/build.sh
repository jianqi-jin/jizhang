NAME_SPACE="jizhang"
TAR="$NAME_SPACE.tar.gz"
rm -rf dist
rm -rf output
mkdir dist
mkdir output
npm i
npm run build
tar -zvcf 
tar -zvcf $TAR ./dist
mv $TAR ./output
