# Nurocheck

Nuro 光の工事予約ページが「空きあり」状態になったら Slack に通知してくれるツール。

## 実行時の環境変数

- URL: Nuro 光から通知された確認ページ URL (必須)
- SLACK_HOOK_URL: 空きがあったときに通知する Slack の Webhook URL (任意)

## ローカルマシン上で実行

```sh
# 初回のみ
npm i
```

```sh
# 実行
URL=XXX SLACK_HOOK_URL=YYY node index.js
```

## Docker 上で実行

```sh
# 初回のみ
cd docker
docker build -t puppeteer-chrome-linux .

cd ..
docker run -u root -i --init --rm --cap-add=SYS_ADMIN -v $PWD:/home/pptruser -w /home/pptruser --name puppteer-chrome  puppeteer-chrome-linux npm i
```

```sh
# 実行
docker run -u root -i --init --rm --cap-add=SYS_ADMIN -v $PWD:/home/pptruser -w /home/pptruser --name puppteer-chrome \
 --env CHROME_PATH=google-chrome-unstable \
 --env URL=<XXXXXXX> \
 --env SLACK_HOOK_URL=<YYYYYYY> puppeteer-chrome-linux node index.js
```

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)
