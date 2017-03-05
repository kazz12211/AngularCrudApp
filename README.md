# AngularCrudApp

## 概要
- AngularJSとにTSコンポーネントを組み合わせてクライアントサイド
- Spring BootでJPAを使ってMySQLにアクセスするサーバーサイド。
- クライアントとサーバーはREST APIを使ってデータを交換する。
- 開発環境はEclipseでSpring Tool Suiteをインストールしたもの。

## 設定
- src/main/resources/application.propertiesにMySQLへの接続情報を記述する。
- 接続情報で記述した内容通りにMySQLデータベースのインスタンスとスキーマを作る。

## 実行
プロジェクトディレクトリで以下のコマンド `./mvnw spring-boot:run` を実行する。