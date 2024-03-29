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

# vue 构建库(lib 库模式打包)

1.  将一个单独的入口构建为一个库的命令语句：
    > >
        "lib": "vue-cli-service build --target lib --name vefui  --dest lib packages/index.js"
1.  这个入口可以是一个.js 文件或.vue 文件，如果没有指定入口，则会使用 src/App.vue

# 发布到 npm

1.  package.json 文件修改：
    > >
        "private": false,
        "main": "lib/vefui.umd.min.js",
1.  新增.npmignore 文件(忽略的文件设置):

    > >

        # 忽略目录
        packages/
        public/

        # 忽略指定文件
        vue.config.js
        babel.config.js
        *.map

1.  npm 发布命令:

    > >

        登录：npm login
        发布：npm publish

1.  测试：
    > >
        下载：npm install efui --save
        引入：在入口文件main.js里面引入
            import EfUI from 'efui'
            import 'efui/lib/efui.css'
            Vue.use(EfUI)

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

# git 操作

1.  查看所有分支

    git branch -a

1.  删除分支

    - git branch -d test:删除本地分支
    - git push origin --delete test:删除远程分支

1.  创建分支

    - git checkout -b test：创建了一个名称为 test 的分支并切换到 test 分支上去
    - git checkout -b test master：从 master 分支分化一个新分支名为 test，并切换到 test 分支上去

1.  推送分支

    - git push origin test:推送本地新分支到远程
    - 推送单个 commit 到另一个分支

            cherry-pick 命令:
            eg:将 master （本地尚未提交）分支的 commit b169a68 合并到 test 分支
            1: 先切换到分支 test：git checkout test
            2: 合并 commit b169a68：git cherry-pick b169a68
            现在 b169a68 就被合并到 test 分支，并在 test 中添加了 commit（作为一个新的 commit）。

1.  撤销

    - git reset --hard HEAD
    - git reset --hard commit_id //或者使用更精确的指定回滚到某一次的 commit 上面
    - git merge --abort //丢弃正在进行的合并
    - 撤回已经 push 到远程的 commit

            先本地回滚：git reset --hard commit_id
            再本地强制推送到远程分支：git push -f origin test

    - 取消撤回已经 push 到远程的 commit

            查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）:git reflog
            重新回到以前提交的版本：git reset --hard commit_id
            再本地推送到远程分支：git push origin test
