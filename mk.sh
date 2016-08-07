sudo gulp
cp -r dist/* ../json-server/public/
cd ../json-server/ && json-server --watch db.json

