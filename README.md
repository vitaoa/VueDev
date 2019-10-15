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
