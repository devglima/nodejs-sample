rm -fr dist
mkdir dist
cd src && cp -r . ./../dist && cd ../
cp -r package.json dist
cp -r package-lock.json dist
cp -r .env dist
cp -r README.md dist
cp -r rds-combined-ca-bundle.pem dist
cp -r serverless.yml dist
cd dist 
#mv app.js index.js
rm -R tests
npm install --only=production
serverless deploy --verbose