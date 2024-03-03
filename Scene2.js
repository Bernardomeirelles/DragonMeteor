const gameState = {
  score: 0,
};

// definindo a largura do jogo
const larguraJogo = 1700;

// Definindo altura do jogo
const alturaJogo = 780;


// classe da Scene2
export default class Scene2 extends Phaser.Scene {
    constructor() {
      super({ key: "Scene2" });
    }
  
    // função de pre carregamento
    preload() {
      // carrega imagens
      this.load.image("back", "assets/3.png");
      this.load.image("player", "assets/charmander.png");
      this.load.image("meteoro", "assets/meteoro.png");
    }
  
    // função de criação 
    create() {
      // definindo o game state para zero para que o jogador ao iniciar o game nao tenha pontos da rodada passada
      gameState.score = 0;
  
      // adiciona a imagem de fundo
      this.add.image(larguraJogo / 2, alturaJogo / 2, "back");
  
      // adiciona o sprite do jogador
      this.homem = this.physics.add.sprite(larguraJogo / 2, 0, "player").setScale(0.7);
      this.homem.setCollideWorldBounds(true);
  
      // configura as teclas de movimentação
      this.cursor = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        left: Phaser.Input.Keyboard.KeyCodes.A,
      });
  
      // atribuindo a constante meteors ao grupo
      const meteors = this.physics.add.group();
  
      // adiciona texto para exibir a pontuação
      gameState.scoreText = this.add.text(this.renderer.width, 0, "Pontuação: 0", {
        fontSize: "64px",
        fill: "#000",
      }).setOrigin(1, 0);
  
      // função para gerar meteoros
      const meteorGen = () => {
        const xCoord = Math.random() * 1700;
        const meteor = meteors.create(xCoord, 2, "meteoro").setScale(0.5);
      };
  
      // loop para gerar meteoros em intervalos ao longo do eixo x
      const meteorGenLoop = this.time.addEvent({
        delay: 1000,
        callback: meteorGen,
        callbackScope: this,
        loop: true,
      });
  
      // colisão entre jogador e meteoros
      this.physics.add.overlap(this.homem, meteors, (homem, meteor) => {
        meteor.destroy();
        gameState.score += 10;
        gameState.scoreText.setText("Pontuação: " + gameState.score);
        // verifica se a pontuação atingiu 100 para iniciar a Scene1 novamente e retornar a tela inicial
        if (gameState.score >= 100) {
          this.scene.start("Scene1");
        }
      });
  
      // armazena o grupo de meteoros na instância da cena
      this.meteors = meteors;
    }
  
    update() {

      // controle de movimento do jogador por meio de condicionais e aperto de teclado (logica de movimentação)
      if (this.cursor.left.isDown) {
        this.homem.setFlipX(true)
        this.homem.setVelocityX(-800);
      } else if (this.cursor.right.isDown) {
        this.homem.setFlipX(false)
        this.homem.setVelocityX(800);
      } else {
        this.homem.setVelocityX(0);
      }
  
      if (this.cursor.up.isDown) {
        this.homem.setVelocityY(-300);
      } else if (this.cursor.down.isDown) {
        this.homem.setVelocityY(300);
      } else {
        this.homem.setVelocityY(0);
      }
    }
  }
  