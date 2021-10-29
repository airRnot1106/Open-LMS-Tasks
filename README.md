# Open-LMS-Tasks

![build](https://img.shields.io/badge/build-passing-brightgreen) ![GitHub all releases](https://img.shields.io/github/downloads/airRnot1106/Open-LMS-Tasks/total) [![GitHub issues](https://img.shields.io/github/issues/airRnot1106/Open-LMS-Tasks)](https://github.com/airRnot1106/Open-LMS-Tasks/issues) [![GitHub stars](https://img.shields.io/github/stars/airRnot1106/Open-LMS-Tasks)](https://github.com/airRnot1106/Open-LMS-Tasks/stargazers) [![GitHub license](https://img.shields.io/github/license/airRnot1106/Open-LMS-Tasks)](https://github.com/airRnot1106/Open-LMS-Tasks/blob/main/LICENSE)

![demo](https://user-images.githubusercontent.com/62370527/139372455-a98fbbad-2058-40ec-a522-b2fc9bc571b1.png)

課題やテストの情報を取得して一覧表示する Chrome 拡張です。

## Install

1. GitHub の Releases から最新バージョンのコードをダウンロード
   ![releases](https://user-images.githubusercontent.com/62370527/138903018-7e2a9e70-6c8a-46f5-ba5c-4778cb7fd3dc.png)
2. Source Code (zip)をクリックし、好きな場所に保存
   ![source](https://user-images.githubusercontent.com/62370527/138903635-dd3c3614-5527-4654-8a81-4bc6ac4611d8.png)
3. `chrome://extensions/`にアクセス
4. 右上のデベロッパーモードを On にする
   ![dev](https://user-images.githubusercontent.com/62370527/138892416-9abb12dd-78ae-4e3d-bb83-31275dac535d.png)
5. `パッケージ化されていない拡張機能を読み込む`をクリックし、解凍した zip ファイルの中の`app`フォルダを選択
6. 拡張機能の一覧に`Open-LMS-Tasks`が追加されていればインストール完了です

## Usage

拡張機能の欄から Open-LMS-Tasks をクリックすると、ポップアップが表示されます。

<img alt="extension" src="https://user-images.githubusercontent.com/62370527/138893838-124d1e9e-b493-4f5a-bc75-511a1fcc28ff.png" width="50%">

ポップアップには課題の一覧が表示されます。

<img alt="popup" src="https://user-images.githubusercontent.com/62370527/139372552-22972dfd-f699-45c4-a93e-1c452474fac1.png" width="50%">

インストールした時点ではまだ何も表示されません。課題が一覧に表示されるためには、Open LMS 上で一度課題のページにアクセスする必要があります。<br>

古い課題は自動的に非表示になります。すべて表示するには`show all`を On にしてください。<br>

## Update

将来的なアップデートの際のデータ移行方法について説明します。

- #### v0.1.0 → v0.2.0

  1.  **バージョンアップ前**に、`chrome://extensions/`にアクセスする

  2.  ID をコピー(IDは環境によって変わります)
      <img alt="id" src="https://user-images.githubusercontent.com/62370527/139373854-52534c79-da05-4e9d-a7f6-a2c80eb99d40.png" width="50%">
  3.  `chrome-extension://コピーしたID/pages/popup.html`にアクセス

  4.  DevTools を開く(`F12`キーを押す)

  5.  `Console`タブを開き、

      ```console
         (async()=>{console.log(JSON.stringify(await chrome.storage.local.get()));})()
      ```

      上記のコマンドを実行する
      ![devtools](https://user-images.githubusercontent.com/62370527/139374362-a2aa40ff-a918-435d-a2be-a7a8efd5fbd3.png)

  6.  表示されるテキストをコピーし、メモ帳などのテキストエディタに貼り付けて、ファイル名を`好きな名前.olt`で保存する(拡張子を`.olt `にする)

  7.  `v0.2.0 → それ以降`のステップ 3 に進む(ここではステップ6で保存したファイルを選択する)

- #### v0.2.0 → それ以降
  1.  **バージョンアップ前**に、左下のメニューを開き、`エクスポート`を選択
      <img alt="export" src="https://user-images.githubusercontent.com/62370527/139375109-80aa34d1-eefc-4128-a7c5-23f2e33b348f.png" width="50%">
  2.  **バージョンアップ後**に、左下のメニューを開き、`インポート`を選択
  3.  ステップ 1 でダウンロードしたファイルを選択
  4.  データが表示されたら移行完了

## Note

Open-LMS-Tasks は非公式のツールです。当拡張機能の利用にあたって、何らかの不具合やトラブルが生じたとしても、製作者は一切の責任を負いません。自己責任でご利用ください。<br>

当拡張機能は、ユーザーが Open LMS 上の課題ページにアクセスした際のみに DOM を取得するので、サーバーに過剰な負荷をかけることはありません。

## Contributing

バグ報告や要望は issue または Twitter までお願いします。

## Author

- Github: [airRnot1106](https://github.com/airRnot1106)

- NPM: [airrnot1106](https://www.npmjs.com/~airrnot1106)

- Twitter: [@airRnot1106](https://twitter.com/airRnot1106)

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](https://github.com/airRnot1106/Open-LMS-Tasks/blob/main/LICENSE) file for details.
