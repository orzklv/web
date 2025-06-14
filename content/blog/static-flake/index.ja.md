+++
title = "Flake を使った静的ウェブサイト"
description = "静的ウェブサイトのホスティングに docker を使うのはやりすぎ。じゃあ nix flake を試してみようか？"
authors = ["Orzklv"]
date = 2024-09-27
updated = "2025-06-14"
draft = false

[taxonomies]
tags = ["Nix", "Flake", "DevOps"]

[extra]
banner = "banner.webp"
toc = true

disclaimer = """
- このチュートリアルは、読者が NixOS にある程度精通していることを前提としています。
"""

[extra.comments]
host = "social.floss.uz"
user = "orzklv"
id = "114683093625327778"
+++

## Docker にするか、しないか

この記事を読んでいるあなたは、Docker が何か知っていて、すでにプロダクションアプリケーションや個人プロジェクトで使っているか、あるいは静的ウェブサイトのホスティングのような基本的な用途で使っている可能性が高いです。Docker は仮想化と比べて軽量だと言われていますが、それでもコンテナベースの仮想化であり、ある程度のオーバーヘッドはあります。また、Docker コンテナを利用するには、何らかの Linux ディストリビューションをベースとして使う必要があります。多くの場合、**ubuntu** や **debian** が選ばれますが、これらは大抵不要なものを多く含んでいます。最終的に 5MB 程度の静的サイトをホスティングするために、500MB もあるイメージを構築し、さらに caddy のリバースプロキシの上に nginx を動かすというのは、どう考えても非効率です。

## Docker の問題点

2024年9月、kolyma ウェブサイトのイメージを GitHub Registry にプッシュしていた時のことです。私の CI は、静的ウェブサイトのリポジトリを nginx コンテナに格納し、それをレジストリにプッシュするというものでした。しかし、x86_64 イメージの後に arm64 イメージをプッシュすると、前者が削除されてしまうという問題が発生しました。いろいろ試したものの、結局 docker の使用を諦めました。それだけでなく、docker イメージの更新や手動での操作が煩わしくなってきたからです。幸いなことに、私の全サーバーは NixOS 上で動いており、その設定は [kolyma-labs/instances](https://github.com/kolyma-labs/instances) に公開されています。そこで、「docker コンテナの代わりに flake を使って、nginx を連携させよう」と思ったのです。

## Flake を始めよう

このチュートリアルでは、私の実験ゾーンである Kolyma の静的ウェブサイト [kolyma-labs/gate](https://github.com/kolyma-labs/gate) を対象に flake 化を行います。まず、Nix パッケージマネージャがインストールされていることが前提です。プロジェクトの構成は以下のようになっていると仮定します：

```
.
└── src
    ├── assets
    │   └── favicon
    ├── index.html
    ├── libs
    │   └── something
    │       └── *.js
    └── styles
        └── *.css

```

この静的サイトを nginx でベアメタルでホスティングするには、nginx の `root` を `src` ディレクトリに設定すれば良いのです。NixOS でも同様のロジックに従いますが、まずはプロジェクトをパッケージ化する必要があります。

### パッケージ化

まず、次のコマンドを実行して flake を初期化します：

```bash
nix flake init
```

これにより、プロジェクトのルートに flake.nix が生成されます。開いてみると、次のような内容になっています：

```nix
{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: {

    packages.x86_64-linux.hello = nixpkgs.legacyPackages.x86_64-linux.hello;

    packages.x86_64-linux.default = self.packages.x86_64-linux.hello;

  };
}
```

ご覧の通り、Nix は flake.nix というエントリーファイルを自動生成してくれます。ここでは `nixpkgs` の最新版チャンネルを `inputs` として取り込んでいます。`outputs` では、2つの既存パッケージへの参照が定義されています。ここから我々がやることは以下の通りです。

### Flake Utils

ここで便利なライブラリ `flake-utils` を使います。これにより、プラットフォームごとの冗長な記述を避けられます。現在の `packages` セクションでは `x86_64-linux` のみですが、静的サイトはプラットフォームに依存しないので、すべてのデフォルトプラットフォームで同じように使えるようにします。

まずは、`inputs` に `flake-utils` を追加します：

```nix
{
  description = "Our packaged website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    # 追加
    flake-utils.url = "github:numtide/flake-utils";
  };

  ...
}
```

次に、`outputs` の内容を以下のように変更します：

```nix
outputs =
  { nixpkgs
  , flake-utils
  , ...
  }: flake-utils.lib.eachDefaultSystem (system:
  let
    pkgs = nixpkgs.legacyPackages.${system};
  in
  {
    # Output packages
    packages.default = pkgs.callPackage ./. { };
  });
```

ここで、`flake-utils` の `eachDefaultSystem` 関数を使い、すべてのデフォルトプラットフォーム用の `default` パッケージを生成します。次のように `nix repl` で確認できます：

```
$ nix repl
Nix 2.28.3
Type :? for help.

nix-repl> :lf . # loads flake from current working directory
Added 15 variables.

nix-repl> outputs.packages
{
  aarch64-darwin = { ... };
  aarch64-linux = { ... };
  x86_64-darwin = { ... };
  x86_64-linux = { ... };
}

nix-repl>
```

`packages.default` のみを期待していたかもしれませんが、実際には各プラットフォームごとに `default` パッケージが作成されます。`packages.x86_64-linux.default` のような形式ですね。これにより、すべてのプラットフォームに個別対応する手間が省けます。

パッケージの宣言が終わったところで、次に実際のパッケージング処理に進みましょう。

### パッケージング

ここで行うのは、「`src` の中にあるものを全部どこかにコピーし、それを `package` として扱うように Nix に伝える」ことです。実際の作業はシンプルです。`flake.nix` に `pkgs.callPackage ./. { }` と書いたことで、以下の意味になります：

- ルートにある `default.nix` を探す
- それをビルドの定義があるパッケージとして扱う
- 定義されたビルド手順を実行してパッケージを作成する

つまり、プロジェクトのルートに `default.nix` というファイルを作成する必要があります。そしてその中で、パッケージについて宣言していきます。Nix は関数型言語であり、すべてが宣言的です。したがって、パッケージとは「属性の集合（オブジェクトや JSON のようなもの）」を生成する関数です。以下はその基本構文です：

```nix
{ arg1, arg2 ? "defaulted-value" }:
let
# 一時的な値などはここに書く
  computated-value = "${arg1.name} ${arg2}";
in
{
  # 最終的な出力だけをここで返す
  full-name = computated-value;
}
```

この構造が理解できたら、いよいよパッケージの定義に入ります。まず必要な引数を宣言します：

```nix, hl_lines=1-3
{
  pkgs ? import <nixpkgs> {}, ...
}:
```

これは「`pkgs` という引数を受け取り、それが渡されていない場合はシステムの nixpkgs を使う」という意味です。ここで提供される関数群がパッケージングに必要となります。次に、この関数が `package` を返すことを明示します：

```nix, hl_lines=4-5
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
}
```

これでパッケージとして認識されますが、まだ名前・バージョン・ビルド方法などが定義されていません。まずは名前とバージョンから：

```nix, hl_lines=5-6
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
  pname = "ourweb";
  version = "0.1.0";
}
```

次に、Nix に「どこにソースコードがあるか」を教えます。私の例では `src` フォルダにありますので、次のようになります：

```nix, hl_lines=8
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
  pname = "ourweb";
  version = "0.1.0";

  src = ./src;
}
```

これで Nix はソースの場所を認識しますが、まだ「何をすべきか」は分かっていません。次に、それを説明します：

```nix, hl_lines=10-13
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenv.mkDerivation {
  pname = "ourweb";
  version = "0.1.0";

  src = ./src;

  installPhase = ''
    mkdir -p $out
    mv ./* $out
  '';
}
```

Nix のパッケージングに慣れている方なら `buildPhase` を期待したかもしれませんが、今回は静的ウェブサイトなのでビルドは不要です。ソースコードをパッケージにコピーするだけです。`$out` はパッケージが生成される場所（Nix が決定）を表し、そこにすべてのファイルを移動します。各フェーズは環境変数が渡された bash スクリプトで構成されており、特別な魔法が使われているわけではありません。

では、実際にパッケージをビルドしてみましょう：

```bash
nix build .#default
# "." はカレントディレクトリの flake.nix を指す
# "#default" は packages の default を指定している

# もしくは単に

nix build
# 両方デフォルトなので省略可能
```

ビルドが完了すると、プロジェクトルートに `result` ディレクトリが現れ、中にウェブサイトの内容が入っているのが分かります。やった！……でも結構時間かかりましたね。なぜ？

### 最適化の工夫

実は `pkgs.stdenv.mkDerivation` はデフォルトで C/C++ ツールチェイン全体を読み込むため、静的ウェブサイトのような軽量なビルドにも関わらず無駄が多いです。これを避けるには、`cc` ツールチェインを読み込まない `pkgs.stdenvNoCC.mkDerivation` を使います：

```nix, hl_lines=4
{
  pkgs ? import <nixpkgs> {}, ...
}:
pkgs.stdenvNoCC.mkDerivation {
  pname = "ourweb";
  version = "0.1.0";

  src = ./src;

  installPhase = ''
    mkdir -p $out
    mv ./* $out
  '';
}
```

これでもう一度ビルドしてみると、はるかに速く完了するはずです！

## 使用方法

このチュートリアルでは、読者が NixOS の経験があり、実運用で使われる NixOS 構成を持っていることを前提としています。NixOS での nginx を用いたウェブサイトホスティングについてもっと理解したい場合は、[nixos.wiki の Nginx ページ](https://nixos.wiki/wiki/Nginx) を参照してください。

まず、作成した静的ウェブサイトのリポジトリを、利用している NixOS 構成の `inputs` セクションに追加します。以前に `flake-utils` を `inputs` に追加したときと同様の手順です。ただし、今回はリポジトリのリンクを変更します：

```nix
{
  description = "My NixOS configuration";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.05";

    # このように追加
    our-website.url = "github:someone/ourweb";
  };

  ...
}
```

すでに NixOS が動作していて、nginx の設定もあると仮定しましょう。nginx に、特定のドメイン名のもとでこの静的ウェブサイトをホスティングさせたい場合、基本的なテンプレートは以下のようになります **（nixos.wiki から引用）**：

```nix
services.nginx.virtualHosts."myhost.org" = {
  addSSL = true;
  enableACME = true;
  root = "/var/www/myhost.org";
};
```

では、これを `myblog.com` に変更し、`root` を我々が作成したウェブサイトパッケージのパスに設定する必要があります。つまり次のようにします：

```nix
# `pkgs` および `inputs` がこの設定で使用可能であると仮定
services.nginx.virtualHosts."myblog.com" = {
  addSSL = true;
  enableACME = true;
  root = inputs.our-website.packages.${pkgs.stdenv.hostPlatform.system}.default;
};
```

これにより、パッケージがビルドされ、コンテンツは `/nix/store/blablasomehashsum-ourweb-0.1.0` のようなパスに配置されます。そして nginx の root は自動的にその場所を参照するようになります。

次に構成を適用します。適用後、`acme-myblog.com.service` のようなサービスが生成されるのが見えるかもしれませんが、これは NixOS が証明書の自動取得（Let’s Encrypt）をすべて管理してくれるからです。何も手動で行わなくても、すべて自動で期待通りに動作します。

構成が完了したら、ブラウザで `myblog.com` にアクセスしてみましょう。あなたのウェブサイトが表示されるはずです。

実際に稼働している私のプロダクション環境の例として、[kolyma.uz](https://kolyma.uz) を参照してください。

## 結論

このチュートリアルでは、Nix におけるパッケージングの基本についても紹介しましたので、これを終えた時点で、あなたはすでに基礎を習得できているはずです。時間が取れ次第、今後もこういった記事を書いていく予定です。記事を書くのは楽しいし、それ自体は問題ないのですが、投稿後に毎回、2つの他言語に翻訳する必要があるのが本当に大変で、その作業にかなりの時間を取られてしまうのです。それに加えて、後から誤字を直すために読み返す手間もあります。もし誰かがその部分を手伝ってくれるなら、もっと多くの記事を公開できるのになと思っています。

とはいえ、NixOS の航海に出る皆さんに幸運を祈ります。このガイドが、素晴らしいパッケージングの旅の出発点となることを願っています！
