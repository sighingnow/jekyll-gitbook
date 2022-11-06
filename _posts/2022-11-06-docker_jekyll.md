---
title: 使用 Jekyll | Docker 建立Github Pages
author: Benson Hsu
date: 2022-11-05
category: Jekyll
layout: post
tags: [github, jekyll, tool]
---

之前就想找一個能用 Markdown 寫筆記的地方，之前都是寫在 Github 的 Repositories 裡面但是檔案一多起來想整理也不方便，那就自己寫個 Blog 當作紀錄，
剛好就趁這個機會把這次的內容當作第一篇紀錄。

Jekyll 是一個用 Ruby 寫的簡單靜態網頁生成器，當是目前我幾乎都是用 Lab 的電腦做事，平時也是遠端到上面，所以很直覺的就想用 Docker 來處理環境，
之後跑腳本把生成好的文件在推上 Github 就可以做好一次更新了。

Required:
- Docker image Jekyll/Jekyll
- Html, Javascript, CSS

### Jekyll themes

剛開始就先找個模板來用，[Jekyll themes]上就有很多可以用的模板來用，像我用的就是使用 GitBook 風格的模板，同時有搜尋功能之後文章的找尋也會比較方便。
找到模板之後去把他 forks 到自己的儲存庫，clone 下來就可以開始修改了。

### Docker Jekyll

Jekyll 官方有一個 [Docker image] 所以拉這個 image 就可以了，裡面 Readme 教學寫得還蠻詳細的，只要把模板 -v 到 container 裡面就可以執行 Jekyll 生成。
第一次運行安裝套件等等會花一點時間，之後啟動容器速度就快很多了。

- `jekyll build` 直接生成網頁
- `jekyll serve` 生成網頁後運行在 localhost:4000 

```bash
docker run \
  --volume="$PWD:/srv/jekyll:Z" \
  -p 4000:4000 \
  --name jekyll \
  -it jekyll/jekyll \
  jekyll serve ||
docker start jekyll;
```

### Customize

之後應該就等文件生成好，同時記得設定 [Github pages publishing source], 把發布源改到生成的目錄。這樣 github.io 
的內容就直接指向這個目錄。然後就是一些自定義的小修改，這裡只要會一點 Js, Html 就可以搞定。
像我用的模板本來是舊的 post 優先，改預設字體，加入時間註記，這樣一個簡單的靜態網頁就完成了。

- Default font size: gitbook-plugin-fontsettings

```
  "pluginsConfig": {
      "fontsettings": {
          "size": 1,
      }
  }
```

- Add date in post: _layout/post.html
- change sort method: _includes/toc-date.htnl

> ##### NOTE
>
> 之後想到要修改的再更新吧，可能加入留言系統、標籤之類的，目前這樣的靜態網頁我就很滿意了。
{: .block-tip }


[Jekyll themes]: http://jekyllthemes.org/
[Docker image]: https://hub.docker.com/r/jekyll/jekyll/
[Github pages publishing source]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
