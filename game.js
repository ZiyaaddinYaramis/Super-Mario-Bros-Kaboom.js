// Kaboom'u başlatma
kaboom({
  global: true, // Fonksiyonları global yapar
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

// Sprite'ları yüklüyoruz
loadSprite("coin", "assets/img/coin.png");
loadSprite("evil-shroom", "assets/img/evil-shroom.png");
loadSprite("brick", "assets/img/brick.png");
loadSprite("block", "assets/img/block.png");
loadSprite("mario", "assets/img/mario.png");
loadSprite("mushroom", "assets/img/mushroom.png");
loadSprite("surprise", "assets/img/surprise.png");
loadSprite("unboxed", "assets/img/unboxed.png");
loadSprite("pipe-top-left", "assets/img/pipe-top-left.png");
loadSprite("pipe-top-right", "assets/img/pipe-top-right.png");
loadSprite("pipe-bottom-left", "assets/img/pipe-bottom-left.png");
loadSprite("pipe-bottom-right", "assets/img/pipe-bottom-right.png");

loadSprite("blue-block", "assets/img/blue-block.png");
loadSprite("blue-brick", "assets/img/blue-brick.png");
loadSprite("blue-steel", "assets/img/blue-steel.png");
loadSprite("blue-evil-shroom", "assets/img/blue-evil-shroom.png");
loadSprite("blue-surprise", "assets/img/blue-surprise.png");

// Oyun sahnesi
scene("game", ({ level, score }) => {
  const maps = [
    [
      "                                      ",
      "                                      ",
      "                                      ",
      "                                      ",
      "                                      ",
      "     %   =*=%=                        ",
      "                                      ",
      "                            -+        ",
      "                    ^   ^   ()        ",
      "==============================   =====",
    ],
    [
      "£                                       £",
      "£                                       £",
      "£                                       £",
      "£                                       £",
      "£                                       £",
      "£        @@@@@@              x x        £",
      "£                          x x x        £",
      "£                        x x x x  x   -+£",
      "£               z   z  x x x x x  x   ()£",
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ],
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid()],
    $: [sprite("coin"), "coin"],
    "%": [sprite("surprise"), solid(), "coin-surprise"],
    "*": [sprite("surprise"), solid(), "mushroom-surprise"],
    "}": [sprite("unboxed"), solid()],
    "(": [sprite("pipe-bottom-left"), solid(), scale(0.5)],
    ")": [sprite("pipe-bottom-right"), solid(), scale(0.5)],
    "-": [sprite("pipe-top-left"), solid(), scale(0.5), "pipe"],
    "+": [sprite("pipe-top-right"), solid(), scale(0.5), "pipe"],
    "^": [sprite("evil-shroom"), solid(), "dangerous"],
    "#": [sprite("mushroom"), solid(), "mushroom", body()],
    "!": [sprite("blue-block"), solid(), scale(0.5)],
    "£": [sprite("blue-brick"), solid(), scale(0.5)],
    z: [sprite("blue-evil-shroom"), solid(), scale(0.5), "dangerous"],
    "@": [sprite("blue-surprise"), solid(), scale(0.5), "coin-surprise"],
    x: [sprite("blue-steel"), solid(), scale(0.5)],
  };

  const gameLevel = addLevel(maps[level], levelCfg);

  const scoreLabel = add([
    text(score),
    pos(30, 6),
    {
      value: score,
    },
  ]);

  add([text("level " + parseInt(level + 1)), pos(40, 6)]);

  // Oyuncu karakteri
  const player = add([
    sprite("mario"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
  ]);

  keyDown("left", () => {
    player.move(-120, 0);
  });

  keyDown("right", () => {
    player.move(120, 0);
  });

  keyPress("space", () => {
    if (player.grounded()) {
      player.jump(400);
    }
  });

  player.action(() => {
    camPos(player.pos);
    if (player.pos.y >= 400) {
      go("lose", { score: scoreLabel.value });
    }
  });

  action("dangerous", (d) => {
    d.move(-20, 0);
  });

  player.collides("dangerous", (d) => {
    go("lose", { score: scoreLabel.value });
  });
});

scene("lose", ({ score }) => {
  add([text(score, 32), origin("center"), pos(width() / 2, height() / 2)]);
});

// Oyunu başlat
start("game", { level: 0, score: 0 });
