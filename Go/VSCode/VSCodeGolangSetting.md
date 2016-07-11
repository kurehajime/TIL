# VSCodeのGolangの設定

1. [vscode-go/READMEとdelve/Buildingの日本語訳
](http://qiita.com/qt-luigi/items/1e73c2e129c408c16cbf)を参考にプラグインを入れる。
2.  tasks.jsonを用意する。

## Debug

1. deleveをhomebrewで入れる。証明書が鬼門になるのでgo getは辛い。
2. プロジェクト内でF5押すとlanch.jsonを作ってくれる。
3. mainがプロジェクト直下にない場合は以下のようにパスを変更

```

"program": "${workspaceRoot}/cmd/cjk2num",

```
