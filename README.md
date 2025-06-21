[Amazon Q CLI でゲームを作ろう Tシャツキャンペーン](https://aws.amazon.com/jp/blogs/news/build-games-with-amazon-q-cli-and-score-a-t-shirt/)に応募するために、Amazon Q CLIとClaude4.0でVibe Codingしてみました。バス移動中にアイディアを考えてスマホアプリにぽちぽち相談し、空港のラウンジで大体コードを書いてもらって、到着地で整理してGithubにアップデートするという促成栽培ゲームなので粗々です（スマホ非対応）。

# 🐱 猫とお魚ゲーム 🐟

サザエさんらしき女性から逃げながら、道端に落ちているお魚を集める楽しいブラウザゲームです！

## 🎮 今すぐプレイ！

[![ゲームをプレイ](https://img.shields.io/badge/🎮_ゲームをプレイ-今すぐ開始-brightgreen?style=for-the-badge)](https://tamaden55.github.io/game-for-tshirts/)

**🔗 ゲームURL**: https://tamaden55.github.io/game-for-tshirts/

## ゲームの特徴

- **シンプルな操作**: 矢印キーまたはWASDで猫を操作
- **追跡システム**: サザエさんが猫を追いかけてきます
- **収集要素**: お魚を集めてスコアを稼ごう
- **難易度上昇**: 時間が経つにつれて追跡者が速くなります
- **視覚効果**: パーティクルエフェクトで華やかに
- **効果音**: Web Audio APIを使った効果音

## 遊び方

1. `index.html`をブラウザで開く
2. 矢印キーまたはWASDで猫を移動
3. 青いお魚を集めてスコアを稼ぐ
4. ピンクのサザエさんに捕まらないように注意！
5. できるだけ長く生き残ってハイスコアを目指そう

## ファイル構成

- `index.html` - メインのHTMLファイル
- `game.js` - ゲームのメインロジック
- `effects.js` - パーティクルエフェクトと効果音

## 技術仕様

- HTML5 Canvas
- JavaScript (ES6+)
- Web Audio API
- レスポンシブデザイン

## カスタマイズ

ゲームの設定は`game.js`で簡単に変更できます：

- `cat.speed` - 猫の移動速度
- `chaser.speed` - 追跡者の初期速度
- お魚の生成数や配置
- スコアシステム

## ブラウザ対応

モダンブラウザ（Chrome、Firefox、Safari、Edge）で動作します。
Web Audio APIを使用しているため、一部の古いブラウザでは効果音が再生されない場合があります。

楽しんでプレイしてください！ 🎮
