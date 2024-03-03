// definindo a largura do jogo
const larguraJogo = 1700
        
// Definindo altura do jogo
const alturaJogo = 780;


//  classe expotadora da Scena3
export default class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene3" });
  }

  preload() {
    // Carregar recursos da função pre load
    this.load.image('more', "assets/2.png");
    this.load.image("botao", "assets/play.png");
  }

  create() {
    // Configuração inicial da cena com as respectivas imagens que devem aparecer
    this.add.image(larguraJogo/2, alturaJogo/2, 'more');
    this.butao = this.add.image(250, 700, 'botao').setScale(0.5*1.1);
    this.butao.setInteractive();
    this.butao.on("pointerup", () => this.scene.start("Scene2"));


    // mudando a escala de acordo com o cursor passar em cima dos botoes para dar um feedback tátil
        this.butao.setInteractive();

        this.butao.on('pointerover', () => {
            this.butao.setScale(1.5);
        });

        this.butao.on('pointerout', () => {
            this.butao.setScale(0.5*1.1);
        });
   
  }

  update() {
   
  }
}
