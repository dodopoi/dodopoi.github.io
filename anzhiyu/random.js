var posts=["2024/03/17/Windows之间文件网络共享设置/","2023/06/27/clash旁路由/","2024/07/24/是bug么？Windows家庭版可以通过商店免费升级到专业版/","2024/05/23/淘宝购买steam游戏注意事项/","2024/07/24/猫头鹰NoctuaHOME系列产品平替/","2020/02/02/知识储备查询ing/","2024/06/05/英伟达低版本驱动下载方法/","2021/03/09/git/git简介/","2024/04/10/git/在本地配置多个github账号/","2024/09/28/hexo博客搭建/2、Hexo安知鱼主题首页设置上/","2024/09/27/hexo博客搭建/1、Hexo博客环境配置/","2024/10/01/hexo博客搭建/4、Hexo安知鱼主题修改控制台打印logo/","2024/09/30/hexo博客搭建/3、Hexo安知鱼主题首页设置下/","2024/06/05/暗黑破坏神4裸连方法/index.zh-cn/","2023/06/16/联想小新黑苹果/1.1黑苹果单OC分区引导镜像制作/","2023/06/17/联想小新黑苹果/1.2写入镜像/","2023/06/17/联想小新黑苹果/2.1BIOS设置/","2023/06/17/联想小新黑苹果/2.2OC文件结构/","2023/06/17/联想小新黑苹果/2.3准备ACPI/","2023/06/19/联想小新黑苹果/2.4.1USB定制/","2023/06/19/联想小新黑苹果/2.4.2macOS蓝牙设置/","2023/06/19/联想小新黑苹果/2.4准备Kexts/","2023/06/19/联想小新黑苹果/2.5Drivers说明/","2023/06/19/联想小新黑苹果/2.6OC编辑器/","2023/06/19/联想小新黑苹果/2.8Kexts微调/","2023/06/19/联想小新黑苹果/2.7初步配置/","2023/06/23/联想小新黑苹果/3.1配置ACPI/","2023/06/23/联想小新黑苹果/3.2配置Booter/","2023/06/28/联想小新黑苹果/3.4配置Kernel/","2023/06/28/联想小新黑苹果/3.3配置DeviceProperties/","2023/06/28/联想小新黑苹果/3.5配置Misc/","2023/06/29/联想小新黑苹果/3.6配置NVRAM/","2023/06/29/联想小新黑苹果/3.7配置Platformlnfo/","2023/06/30/联想小新黑苹果/3.8配置UEFI/","2023/06/30/联想小新黑苹果/4.0联想Lenovo小新I2000黑苹果首发体验之旅/","2024/10/03/IDLE修改代码配色及语法高亮主题/","2024/10/02/git/github创建多个项目站点/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"hello-algo","link":"https://hello-algo.com","avatar":"https://picgo-1.pages.dev//astronaut.png","descr":"That was less than stellar","siteshot":"https://picgo-1.pages.dev//%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-09-28%20004348.png","color":"vip","tag":"技术"},{"name":"廖雪峰","link":"https://liaoxuefeng.com","avatar":"https://picgo-1.pages.dev//liaoxuefeng.jpg","descr":"廖雪峰的官方网站","siteshot":"https://picgo-1.pages.dev//liaoxuefeng.png","color":"vip","tag":"技术"},{"name":"Piglei","link":"https://www.piglei.com","avatar":"https://picgo-1.pages.dev//my-avatar-80.jpg","descr":null,"siteshot":"https://picgo-1.pages.dev//piglei.png"},{"name":"凡梦星尘空间站","link":"https://lisenhui.cn","avatar":"https://elkan1788.github.io/imgs/avatar.png","descr":"再平凡的人也有属于他的梦想！","recommend":true},{"name":"mostima","link":"https://mostima.blog","avatar":"https://mostima.blog/img/avatar.jpg","descr":"悟以往之不谏，知来者之可追。"},{"name":"仓鼠阁","link":"https://runofftheearth.github.io","avatar":"https://picgo-1.pages.dev//OIP-C.FWOWVgjw73Sqr1p_fpaC-QHaFj","descr":"🐹","siteshot":"https://picgo-1.pages.dev//cangshuge.png","color":"vip"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };