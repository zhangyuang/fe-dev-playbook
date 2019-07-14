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

[Charles](https://www.charlesproxy.com)是一个代理服务器，简单的说法为当访问网站时，会由charles代为获取请求相关数据，这样就达到了截取网络请求以及分析请求结果的目的。charles是在日常工作中常用的功能包括：移动端实机测试，将远程文件代理到本地等。

移动端实机测试指的是：将本地环境下开发的页面在手机上测试展示效果；将远程文件代理到本地的功能为：当需要在线上环境测试展示效果，而本地程序代码不确保正确的情况下，可以将线上的文件访问地址重定向到本地的文件，从而使得线上环境真正使用的为本地需要测试的文件。

- 移动端实机测试
  - 为了可以在charles中截取网络请求数据，首先需要将charles设置为系统代理，即让charles成为获取请求数据的委托代理方，具体操作为：选择菜单栏中`proxy`->`Mac OS X Proxy`，使`Mac OS X Proxy`前出现`✔️`。
  - 在charles中选择菜单栏`help`->`Local IP Address`，弹出对话框中的第一条en0数据即为本机ip地址。
  
  ![](https://img.alicdn.com/tfs/TB1MnNNamf2gK0jSZFPXXXsopXa-954-584.png)

  在此图中的第一条数据为ipv4地址，utun1对应的为VPN_IPv4地址，最后两条数据为ipv6地址，我们需要的为第一条数据显示的ip地址。
  - 在charles中选择菜单栏`proxy`->`proxy settings`,在弹出的对话框中填写端口号（可以使用默认的8888），勾选”enable transparent http proxying“。

  ![](https://img.alicdn.com/tfs/TB1.bFMaeH2gK0jSZFEXXcqMpXa-1172-1004.png)

  - 手机和电脑连接同一个无线网络，并对无线网络进行设置，使其显示高级选项，将代理方式从无更改为手动，服务器主机名处填写mac端的ip，服务器端口填写mac中设置的端口号(上步骤设置的8888或其它)，最后记得保存，具体操作如下图所示。

    <center>
    <img src="https://img.alicdn.com/tfs/TB1zvtOabj1gK0jSZFuXXcrHpXa-1080-2280.jpg"  style="height:456px; width:216px;">
    </center>
  - charles中弹窗提示，选择allow。至此手机即可访问需要测试的页面，在charles中也可实时查看接口的响应情况，注意此方案适用于http请求。
- 远程文件代理到本地。
  - Map Local 是将指定的网络请求重定向到本地文件，在charles选择菜单栏`Tools`->`Map Local`，填写需要重定向的源地址以及本地的目标文件。如果网络请求较为复杂，可在请求处右键选择`Save Response`保存请求返回的数据到本地。

  具体填写方式为：Map From处为原始的网址相关数据，protocol选择http或者https协议，Host填写网址中协议之后,"/"之前的数据，即域名；Port处填写端口号，此处为选填，Path（选填）处填写第一个"/"以及之后的数据，此处如果为若干地址，可填写为"/*"，Query（选填）处填写请求地址中的查询字符串，也就是"?"及其之后的部分；Map To处为本地地址，可以为单文件或者文件夹的地址，通过choose按钮进行选择。

  注意：如果Map From以及Map To中的数据需要区分大小写，应勾取Case-sensitive选项。

  ![](https://img.alicdn.com/tfs/TB1vFEjXYr1gK0jSZFDXXb9yVXa-924-812.png)

- https请求数据获取
  由于https协议的请求安全系数较高，在截取此类请求数据时，需要安装证书等操作，此处单独列出https协议请求的操作步骤。
  - 安装证书。在charles中选择菜单栏`help`->`SSL Proxying`->`Install Charles Root Certificate`,安装成功后，双击安装的证书进行信任处理。

  ![](https://img.alicdn.com/tfs/TB16ONTabj1gK0jSZFuXXcrHpXa-1478-930.png)

  - 在charles选择菜单栏`proxy`->`SSL Proxying Settings`，将需要截取数据的网址添加到弹出的对话框中，并选中`enable SSL Proxying `。至此，在mac电脑中即可对https请求进行抓包处理。

  ![](https://img.alicdn.com/tfs/TB127JSaoT1gK0jSZFhXXaAtVXa-1174-872.png)

  - 如果要截取移动端访问的https协议的数据，在完成上述步骤后，需要重复第一个步骤，并更改为选择菜单栏`help`->`SSL Proxying`->`Install Charles Root Certificate on a Mobile Device or Remote Browser`。移动端完成无线网络配置(移动端实机测试的第四步骤)后，访问[证书地址](http://charlesproxy.com/getssl)，即可完成安装证书的操作。至此，移动端访问https请求，就可以在charles中实时显示相关抓包信息。
