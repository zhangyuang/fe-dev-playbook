# Chrome

目前最流行，最强大的浏览器，也是前端开发必备的浏览器。下面我们来介绍使用Chrome浏览器的一些小技巧。

## 快捷键

老生常谈，任何常用的应用的快捷键都必须熟练使用，玩得66的, 下面介绍常用的快捷键，再次声明本文档不是大而全的文档，Chrome快捷键组合大概有几十种，但我们只需要记住最常用的几种就行了

Chrome快捷键和前面讲到的iterm2, VS Code快捷键几乎一样，事实证明优秀的设计是每个应用都会共同遵守的

- `cmd` + `T` 打开一个新的Tab    
- `cmd` + `数字键` 快速跳转到和数字键对应的Tab，`cmd + 9`跳转到最后一个tab    
- `cmd` + `shift` + `N` 以无痕模式打开新窗口  
- `cmd` + `w` 关闭当前窗口  
- `cmd` + `N` 打开一个新的浏览器窗口  

## 插件

Chrome的[插件商店](https://chrome.google.com/webstore/category/extensions?hl=zh-CN)的强大程度无与伦比，下面来介绍我们开发中经常用到的一些插件

- [沙拉查词](https://chrome.google.com/webstore/detail/cdonnmffkdaoajfknoeeecmchibpmkmg) 必装的插件，划词翻译功能是我目前用过的最舒服的  
- [Quick QR](https://chrome.google.com/webstore/detail/afpbjjgbdimpioenaedcjgkaigggcdpp) 必装的插件，将链接转换为二维码  
- [lighthouse](https://chrome.google.com/webstore/detail/blipmdconlkpinefehnmjammfjpmpbjk) Google官方出品，可以分析出你的网页的性能数据，以及列出可以优化的点  
- [JSON Formatter](https://chrome.google.com/webstore/detail/bcjindcccaagfpapjjmafapmmgkkhgoa) 格式化JSON文件，让你在浏览器打开JSON文件时获得更愉悦的体验  
- [React Developer Tools](https://chrome.google.com/webstore/detail/fmkadmapgofadopljbjfkapdkoienihi) 开发React应用时用的辅助工具，大部分人应该都装了  
- [Vue.js devtools](https://chrome.google.com/webstore/detail/nhdogjmejiglipccpnnnanhbledajbpd) 同上，开发Vue应用时的辅助工具  
- [Octotree](https://chrome.google.com/webstore/detail/bkhaagjahfmjljalopjnoealnfndnagc) 方便你查看github项目结构  
- [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/nlfbmbojpeacfghkpbjhddihlkkiljbi) 为不支持跨域请求的接口的响应头加Allow-Control-Allow-Origin: *  



## Chrome DevTools - 性能监控

- Chrome浏览器打开 URL：chrome://flags/#enable-devtools-experiments
- 将 “Developer Tools experiments” 选项设置为“启用”
- 点击 “Relaunch now” 来重启 Chrome
- 打开 Chrome DevTools
- 打开 DevTools “Setting” -> “Experiments” 选项
- 键盘连击 6 次 `SHIFT`，以显示隐藏的选项
- 选中 “Performance Monitor” 选项
- 重启 DevTools
- 点击 “Esc” 打开附加面板
- 选择 “Performance monitor”
- 单击启用/禁用监控项
- 开始使用性能监控吧

该监控涵盖了包含cpu、js、css等8种项目，并以时间轴/性能象限，展示相关性能情况。以css性能监控为例，我们启用以下两项及cpu项：

- “Layouts / sec”
- “Style recalcs / sec”

​        此时我们已经开启了对css性能的实时检，我们可以进行最简单的一个操作：改变 CSS 的 `top`和 `left`属性，当然我们要知道前提，这个操作会触发整个像素渲染流程：绘制，布局和组合。如果我们将这些属性用于动画，它将每秒触发几十次/上百次操作，那我们可以在监控象限处看见其 CPU 使用率保持较高水位。

​        但是如果你使用 CSS 的 `transform` 属性的 `translateX/Y` 来切换动画，我们当然也要知道前提：这并不会触发绘制和布局，仅仅会触发组合这一阶段，因为这是基于 GPU 的，此时监控象限处 CPU 使用率水位较低。

​        当然，我们不能完全按照“既知前提”去呼应监控象限，更多的是我们需要根据象限情况，去改变/优化我们代码逻辑，并再次通过该处监控得以印证，优化情况。
