# Open-LMS-Tasks

![build](https://img.shields.io/badge/build-passing-brightgreen) [![GitHub issues](https://img.shields.io/github/issues/airRnot1106/Open-LMS-Tasks)](https://github.com/airRnot1106/Open-LMS-Tasks/issues) [![GitHub stars](https://img.shields.io/github/stars/airRnot1106/Open-LMS-Tasks)](https://github.com/airRnot1106/Open-LMS-Tasks/stargazers) [![GitHub license](https://img.shields.io/github/license/airRnot1106/Open-LMS-Tasks)](https://github.com/airRnot1106/Open-LMS-Tasks/blob/main/LICENSE)

![demo](https://user-images.githubusercontent.com/62370527/138891272-93bda2f4-79b8-4a68-b49a-0b5151b023ef.png)

課題やテストの情報を取得して一覧表示する Chrome 拡張です。

## Install

1. GitHub の Releases から最新バージョンのコードをダウンロード
   ![releases](https://user-images.githubusercontent.com/62370527/138903018-7e2a9e70-6c8a-46f5-ba5c-4778cb7fd3dc.png)
2. Source Code (zip)をクリックし、好きな場所に保存
   ![source](https://user-images.githubusercontent.com/62370527/138903635-dd3c3614-5527-4654-8a81-4bc6ac4611d8.png)
3. `chrome://extensions/`にアクセス
4. 右上のデベロッパーモードを On にする
   ![dev](https://user-images.githubusercontent.com/62370527/138892416-9abb12dd-78ae-4e3d-bb83-31275dac535d.png)
5. `パッケージ化されていない拡張機能を読み込む`をクリックし、解凍したzipファイルの中の`app`フォルダを選択
6. 拡張機能の一覧に`Open-LMS-Tasks`が追加されていればインストール完了です。

## Usage

拡張機能の欄から Open-LMS-Task をクリックすると、ポップアップが表示されます。

<img src="https://user-images.githubusercontent.com/62370527/138893838-124d1e9e-b493-4f5a-bc75-511a1fcc28ff.png" width="50%">

ポップアップには課題の一覧が表示されます。

<img src="https://user-images.githubusercontent.com/62370527/138894751-1aed5086-c71b-4eed-a7e4-a33288386071.png" width="50%">

インストールした時点ではまだ何も表示されません。課題が一覧に表示されるためには、Open LMS 上で一度課題のページにアクセスする必要があります。<br>

古い課題は自動的に非表示になります。すべて表示するには`show all`を On にしてください。<br>

`リセット`を押すと課題データが初期化されます。ご注意ください。

## Note

Open-LMS-Tasks は非公式のツールです。当ソフトの利用にあたって、何らかの不具合やトラブルが生じたとしても、製作者は一切の責任を負いません。自己責任でご利用ください。<br>

当プログラムは、ユーザーが Open LMS 上の課題ページにアクセスした際のみに DOM を取得するので、不必要にサーバーに負荷をかけることはありません。

## Contributing

バグ報告や要望は issue または Twitter までお願いします。

## Author

- Github: [airRnot1106](https://github.com/airRnot1106)

- NPM: [airrnot1106](https://www.npmjs.com/~airrnot1106)

- Twitter: [@airRnot1106](https://twitter.com/airRnot1106)

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](https://github.com/airRnot1106/Open-LMS-Tasks/blob/main/LICENSE) file for details.
