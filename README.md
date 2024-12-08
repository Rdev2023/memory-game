# Memory Game Project

## Table of Contents

* [Install](#install)
* [Instructions](#instructions)
* [Rules](#rules)
* [Contributing](#contributing)

## Install

Source code in master branch of [GitHub.com](https://github.com/Rdev2023/memory-game)

Web page in [GitHub.io](https://Rdev2023.github.io/memory-game/)

## Instructions

### Files and folders

The code consist in 3 folders:
  * **img** - its has just one image file for background.
  * **css** - for `app.css` file.
  * **js** - for `app.js` file.

  #### Styles

  Cards (symbols on cards) in game stylized by aditional rules from external css file that declared in index.html file:

  `<link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">`  

  ### Working code

  Main code locate in `app.js` file in **js** folder.
  When you start runing the function `createDeck()` to create html code of cards.

  `createDeck()` function use function `createCardsArray()` which build Array with elements. Each element - one card.

  After built array start shuffle through function  `shuffle()`.

  When shuffle complete array element will push to **html** code.

  All clicked cards  is flip over by adding a **css** classes `"show"` and `"open"`.
  Matching cards get **css** class `"match"`.

  Work with flip over  cards realized through `flipOver()` function and Map collection `flipMap`.

## Rules

In the same time its possible to open just two cards.

Each card stands in open position just 3 seconds.

If you had case with clicked the card that you already opened before - you lose stars.

The game finish when all cards is matched. And then popup message with your results regards your stars rate:

- No stars - very bad
- :star: - bad
- :star::star: - good
- :star::star::star: - very good

To restart game click restart button :repeat:.


## Contributing

This repository for **Udacity** learning programm.
Contributing will be decline.
