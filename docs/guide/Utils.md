# Utils

本篇文章将介绍一些实用类的小工具来帮助我们从繁琐的鼠标操作中脱离出来

## Spectatle

[Spectatle](https://www.spectacleapp.com/)一款可以让你更加轻松快速的控制窗口大小的软件。
快速实现窗口全屏/靠左/靠右/居中等展现形式, 建议快捷键设置如下。`cmd + alt + enter`全屏。

![](https://gw.alicdn.com/tfs/TB1ESaBXG67gK0jSZFHXXa9jVXa-1224-1066.jpg)

## Dash

[Dash](https://kapeli.com/dash)是一个文档API文档浏览器，在单一窗口中可以浏览、搜索各API细节。使用效果如下图所示。

![](https://img.alicdn.com/tfs/TB1xPgeXNv1gK0jSZFFXXb0sXXa-1820-1206.png)

使用vscode时可以在扩展中搜索Dash，点击安装即可通过 `ctrl+h` 快捷键查找需要的api具体说明。

## Charles

[Charles](https://www.charlesproxy.com)是一个代理服务器，在日常工作中常用的功能包括：移动端实机测试，将远程文件代理到本地，网络请求抓包处理等。

- 移动端实机测试
  - 首先将charles设置为系统代理，选择菜单栏中`proxy`->`Mac OS X Proxy`，之后在help中查看本机ip地址。
  - 在charles中选择菜单栏`proxy`->`proxy settings`,在弹出的对话框中填写端口号（可以使用默认的8888），勾选”enable transparent http proxying“。
  - 手机和电脑连接同一个网络，并对无线网络进行高级设置，选择手动代理填写mac端的ip以及端口号。
  - charles中弹窗提示，选择allow。至此手机即可访问需要测试的页面，在charles中也可实时查看接口的响应情况，注意此方案适用于http请求。
- https请求抓包
  - 安装证书。在charles中选择菜单栏`help`->`SSL Proxying`->`Install Charles Root Certificate`,双击安装的证书进行信任处理，即可成功安装。
  - 在charles选择菜单栏`proxy`->`SSL Proxying Settings`，将需要截取数据的网址添加到弹出的对话框中，并选中`enable SSL Proxying `。至此，在mac电脑中即可对https请求进行抓包处理。
  - 如果要截取移动端访问的https协议的数据，在完成上述步骤后，需要重复第一个步骤，并更改为选择`Install Charles Root Certificate on a Mobile Device or Remote Browser`，移动端完成代理配置后，访问[证书地址](http://charlesproxy.com/getssl)，即可完成安装证书的操作,之后在手机`系统设置`->`关于手机`->`证书信任设置`中把证书开启。至此，移动端访问https请求，就可以在charles中实时显示相关抓包信息。
- 远程文件代理到本地。
  - Map Local 是将指定的网络请求重定向到本地文件，在charles选择菜单栏`Tools`->`Map Local`，填写需要重定向的源地址以及本地的目标文件。具体填写如下图所示。如果网络请求较为复杂，可在请求处右键选择`Save Response`保存请求返回的数据到本地。

  ![](https://img.alicdn.com/tfs/TB1vFEjXYr1gK0jSZFDXXb9yVXa-924-812.png)
