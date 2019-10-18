# Vue CLI 安装

1. Node 版本要求：8.9 或更高版本 (推荐 8.11.0+)
1. 安装命令：npm install -g @vue/cli
1. 验证是否安装成功：vue --version

# 创建一个新项目

1. 命令：vue create hello-world
1. 回车进行安装

# 项目部署 GitHub Pages

1.  新建文件 deploy.sh

    > >

        # 错误时停止
        set -e

        # 打包
        npm run build

        # 进入目标文件夹
        cd dist

        # 提交到本地仓库

        git init
        git add -A
        git commit -m 'deploy'

        # 提交到 https://github.com:vitaoa/VueDev 项目的 gh-pages 分支
        git push -f git@github.com:vitaoa/VueDev.git master:gh-pages

        cd -

1.  git ssh

    > >

        ssh-keygen -t rsa -C "jupiterzw@sina.com"
        接着出现：
        Generating public/private rsa key pair.
        Enter file in which to save the key (C:\Users\GA/.ssh/id_rsa):
        直接回车-回车
        然后系统会自动在.ssh文件夹下生成两个文件，id_rsa和id_rsa.pub，用记事本打开id_rsa.pub
        将全部的内容复制
        登陆github账户，进入设置-> 新增new SSH key
        在git中输入命令：
        ssh -T git@github.com
        yes回车,然后就会提示你成功了~~

1.  命令操作
    > >
        bash deploy.sh

# loader

1.  安装：npm install -D sass-loader node-sass

1.  配置：0 配置既可以使用

1.  引入 SCSS 全局变量
    > >
        css: {
            loaderOptions: {
                sass: {
                    // 注意：在 sass-loader v7 中，这个选项名是 "data"
                    prependData: `@import "~@/scss/app/setting"`
                },
                scss: {
                    prependData: `@import "~@/scss/app/setting";`
                }
            }
        }

# 打包

1.  不打包的 js，放到 public 目录下就行，build 的时候会自动打包到 dist 目录下
1.  代码拆分：配置 configureWebpack 的 optimization 选项，用 splitChunks 拆分代码
    > >
        例如排除jquery:
        vendor: {
            test(module) {
                let path = module.resource
                if (!path) return true
                path = path.replace(/\\/g, '/')
                const isNeed = path &&
                    /node_modules/.test(path) &&
                    /node_modules\/(?!jquery)/.test(path)
                if (!isNeed && path.indexOf('node_modules') > -1) {
                    console.log('vendor not need::', path, isNeed)
                }
                return isNeed
            },
            name: 'chunk-vendors',
            priority: 10,
            enforce: true
        }
1.  启用 gzip

    1.  安装 compression-webpack-plugin 插件

        > >

            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
                threshold: 10240,
                minRatio: 0.8
            })
            要使服务器返回.gz 文件，还需要对服务器进行配置，根据 Request Headers 的 Accept-Encoding 标签进行鉴别，如果支持 gzip 就返回.gz 文件。

    1.  在 nginx 中启用 gzip 压缩
        > >
            gzip  on;
            gzip_vary on;
            gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

#### Run your tests

```
npm run test
```

#### Lints and fixes files

```
npm run lint
```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
