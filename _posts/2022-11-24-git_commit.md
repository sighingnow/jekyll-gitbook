---
title: "Git - Commit message format"
author: Benson Hsu
date: 2022-11-24
category: Jekyll
layout: post
tags: [github, tool]
---

> 說明 Git 提交時應注意的 Commit message format，建立良好的規範才能有效的合作

- 做 issue 的時候不應該一次 Commit 所有變動！應該獨立每個 Commit 不同意義的異動，這樣才能使 Commit 快速閱讀與程式碼間的關係。
- 每次 Commit 都是針對異動做說明，Why & What。
- 每次 Commit 加上 issue 編號，方便追蹤後續問題。

### Basic format

**Header:**
- type: 代表 commit 的類別：feat, fix, docs, style, refactor, test, chore，必要欄位。
- scope 代表 commit 影響的範圍，例如資料庫、控制層、模板層等等，視專案不同而不同，為可選欄位。
- subject 代表此 commit 的簡短描述，不要超過 50 個字元，結尾不要加句號，為必要欄位。

**Body:**
- Body 部份是對本次 Commit 的詳細描述，可以分成多行，每一行不要超過 72 個字元。
- 說明程式碼變動的項目與原因，還有與先前行為的對比。

**Footer:** 
- 填寫任務編號（如果有的話）.
- BREAKING CHANGE（可忽略），記錄不兼容的變動，以 BREAKING CHANGE: 開頭，後面是對變動的描述、
以及變動原因和遷移方法。  

**type** 需規範好有哪些類別：
- feat: 新增/修改功能 (feature)。
- fix: 修補 bug (bug fix)。
- docs: 文件 (documentation)。
- style: 格式 (不影響程式碼運行的變動 white-space, formatting, missing semi colons, etc)。
- refactor: 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)。
- perf: 改善效能 (A code change that improves performance)。
- test: 增加測試 (when adding missing tests)。
- chore: 建構程序或輔助工具的變動 (maintain)。
- revert: 撤銷回覆先前的 commit 例如：revert: type(scope): subject (回覆版本：xxxx)。

### Example

- 一個簡單的 feat 範例

``` 
#Feat Example
feat: message 信件通知功能

因應新需求做調整：
 通知和 message 都要寄發每日信件，
 通知和 message 都用放在同一封信裡面就好，
 不然信件太多可能也不會有人想去看。

調整項目：
1. mail_template.php，新增 message 區塊。
2. Send_today_notify_mail.php，新增 取得每日 Message 邏輯。
3. Message_model_api.php，新增 $where 參數，以便取得每日訊息。
4. Message_api.php、Message_group_user_model_api.php，新增 *取得訊息使用者* 邏輯，以便撈取每日訊息。

issue #863
```

> ##### NOTE
>
> 只會寫程式只能代表你是一個會寫程式的人，能跟一群人一起寫程式才是一個好的工程師。  
{: .block-tip }