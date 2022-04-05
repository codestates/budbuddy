#!/bin/bash
cd /home/ubuntu/budbuddy/server

export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=production
export KAKAO_REST_API_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REST_API_KEY --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export CLIENT_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export IAM_ACCESS_KEY_ID=$(aws ssm get-parameters --region ap-northeast-2 --names IAM_ACCESS_KEY_ID --query Parameters[0].Value | sed 's/"//g')
export IAM_SECRET_ACCESS_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names IAM_SECRET_ACCESS_KEY --query Parameters[0].Value | sed 's/"//g')
export IAM_REGION=$(aws ssm get-parameters --region ap-northeast-2 --names IAM_REGION --query Parameters[0].Value | sed 's/"//g')

npx sequelize-cli db:migrate --env production
npx sequelize-cli db:seed:all --env production

authbind --deep pm2 start index.js
pm2 save

sleep 1s && pm2 status 
echo $DATABASE_NAME    // budbuddy 식물 관찰 앱! code deploy용 로그!
