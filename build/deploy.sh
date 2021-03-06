#!/usr/bin/env sh

# 终止一个错误
set -e

# 构建
npm run client:build

# 克隆代码
git clone https://${GH_REF} .deploy_git
cd .deploy_git
git checkout -B gh-pages

cd ../
cp -rf .deploy_git/.git/ dist/client/
rm -rf .deploy_git/
cd dist/client

# 如果你是要部署到自定义域名
# echo 'www.example.com' > CNAME

git config user.name "wenfs"
git config user.email "wefashe@qq.com"

git add -A
git commit -m ":construction: travis CI Auto deploy at `date +"%Y-%m-%d %H:%M"`"

# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}"

