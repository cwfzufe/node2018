
#### 安装 Node.js

```sh
wget https://nodejs.org/dist/v8.9.1/node-v8.9.1-linux-x64.tar.xz
tar -xvf node-v8.9.1-linux-x64.tar.xz
mv node-v8.9.1-linux-x64 nodejs
ln -s ~/nodejs/bin/* /usr/local/bin/
node -v
npm -v
```

#### 安装 Git

```sh
apt-get update
apt-get install git
git clone https://github.com/cwfzufe/node2018
cd node2018
node index
```

#### 使用 PM2 启动

```sh
npm i pm2 -g
ln -s ~/nodejs/bin/* /usr/local/bin/
pm2 start index.js --name="myblog"
```

这里我们使用 pm2 启动博客，所以关掉终端后博客仍然在运行。