export default class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1" });
  }

  preload() {
    // Carregar recursos
    this.load.image("bg", "assets/1.png");

    this.load.image("botao", "assets/play.png");
    this.load.image("botao2", "assets/more.png");
  }

  create() {
    // Configuração inicial da cena e dos botões fazendo com que ao apertar os botões vá para outra cena realizando assim a troca de cena. 
    this.add.image(800, 400, "bg");
   this.butao = this.add.image(1305, 480, "botao");
    this.butao2 = this.add.image(1305, 630, "botao2");
    this.butao.setInteractive();
    this.butao.on("pointerup", () => this.scene.start("Scene2"));
    this.butao2.setInteractive();
    this.butao2.on("pointerup", () => this.scene.start("Scene3"));
  }

  update() {
    // Lógica de atualização da cena
  }
}
