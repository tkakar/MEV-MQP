cd ./front-end
npm run build
scp -r ./build $1@mev.wpi.edu:~
rm -r ./build

cd ../back-end
scp -r ./app.js $1@mev.wpi.edu:~

ssh -t $1@mev.wpi.edu sudo sh /MEV/deploy-part2.sh
