在线挂号智能医疗练习项目

1.打开src/manifest.json文件，微信小程序配置里，更改为你自己的
小程序APPID

2.打开src/pages/login/login.vue
把appid和secret秘钥改为你自己的小程序appid和秘钥

3.打开src/utils/qq-Location.ts，找到key
填写腾讯地图api的开发者密钥（key）
腾讯地图开放平台：https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview
申请开发者密钥（key）

4.安全域名设置，在小程序管理后台 -> 开发 -> 开发管理 -> 开发设置 -> “服务器域名” 中设置request合法域名，添加https://apis.map.qq.com
添加https://meituan.thexxdd.cn


5.在根目录下执行 pnpm install 安装依赖，成功后，
再执行pnpm dev