/* ===== CONTEÚDO EDITÁVEL — troque aqui sem mexer no resto do site =====
   Fotos/vídeo: coloque os arquivos em /assets e escreva o caminho. Vazio = espaço reservado. */
window.LF = {
  numero: "17",                                  // número da sorte: aparece escondido na evidência (tela 4) e no topo de TODAS as perguntas (tela 5)
  fotoEvidencia: "assets/evidencia.jpg",
  sombra: "assets/sombra-homem.jpg",             // SOMBRA PADRÃO (usada se o professor não tiver a sua). Serve de foto dos perfis (capa, quadro e fichas) até a revelação final.
                                                 // Cada professor tem a sua: sombra-mulher.jpg (Cássia e Vanessa) e sombra-homem.jpg (Julio e José).         // foto da sombra, raspada na tela 4
  codigo: "REBECA",                              // palavra-código (tela 8): iniciais das 6 perguntas de cada professor, nesta ordem
  carta: {
    n: "001", palavra: "Paciência.",
    texto: ["Há pessoas que não apressam nossas descobertas. Elas permanecem ao nosso lado até que sejamos capazes de encontrar as respostas por conta própria.",
            "Observar cuidadosamente quem lhe ensinou a não desistir diante do que parecia impossível."],
    assinatura: "— Um informante"
  },
  palavras: ["Paciência", "Aprendizado", "Influência", "Legado"],   // exibidas em "Todas as Palavras"

  /* Cada professor tem:
     - ficha de investigador (palavra, marcante, mania, jeito, momento, registrado, ensinamento, deixado, pista)
       Campo vazio aparece como tarja preta (sigiloso).
     - perguntas: EXATAMENTE 6, cada uma com EXATAMENTE 3 dicas. Aparecem uma por vez, na ordem, no interrogatório (tela 5).
       "respostas": a primeira é a oficial; as outras são formas aceitas.
       Maiúsculas, acentos, pontuação e artigo inicial (o/a) são ignorados; erros leves de digitação em palavras longas também.
     - video: (opcional) vídeo do professor, exibido ao concluir o interrogatório dele. Vazio = não aparece nada.
     ATENÇÃO: a 1ª letra de cada pergunta forma R-E-B-E-C-A. Ao editar um texto, mantenha a letra inicial. */
  professores: [
    { nome: "Professora Cássia", sombra: "assets/sombra-mulher.jpg", area: "Pacote Office", foto: "assets/fotos/cassia.jpg",
      palavra: "Força", marcante: "Sorriso", mania: "Mais na dela", jeito: "Rígida e, ao mesmo tempo, atenta a ajudar",
      momento: "Quando você passava mais de 45 perguntas de revisão",
      registrado: "Nossos pequenos reencontros e, quando mais precisava, nem que fosse para te observar de longe",
      ensinamento: "Disciplina e confiança",
      deixado: "A beleza de ver o outro como queremos que tudo mude para melhor",
      pista: "Anotação do caso: toda pergunta esconde um segredo na primeira letra. Junte todas e o código da surpresa final se revela. Erre à vontade: são 3 dicas por pergunta. E atenção, haverá uma sobre a sua área, porque o informante também gosta de testar o detetive.",
      // ▶ VÍDEO DA PROFESSORA CÁSSIA (ainda será gravado): coloque o arquivo em assets/ e escreva o caminho aqui. Ex.: "assets/video-cassia.mp4"
      video: "",
      perguntas: [
        { // PESSOAL — não substituir nem alterar a resposta
          texto: "Referente ao buquê de flores da homenagem, qual artista renomado inspirou a escolha?",
          respostas: ["Van Gogh", "Vincent Van Gogh", "Vangogh", "Gogh"],
          dicas: ["Foi um artista ligado ao pós-impressionismo.", "Uma de suas obras mais famosas retrata flores amarelas.", "Seu sobrenome começa com V e ele pintou os famosos Girassóis."] },
        { // Excel
          texto: "Em qual programa do Pacote Office é possível organizar dados em células, criar tabelas e realizar cálculos utilizando fórmulas?",
          respostas: ["Excel", "Microsoft Excel", "MS Excel"],
          dicas: ["Trabalha com linhas, colunas e planilhas.", "É muito utilizado para controles financeiros e relatórios.", "Seu ícone tradicional apresenta a letra X."] },
        { // Word
          texto: "Bastante utilizado na criação e formatação de documentos, qual aplicativo permite elaborar textos, cartas, relatórios e trabalhos escolares?",
          respostas: ["Microsoft Word", "Word", "MS Word"],
          dicas: ["Permite alterar fontes, margens e espaçamentos.", "É muito utilizado para produzir documentos escritos.", "Seu ícone tradicional apresenta a letra W."] },
        { // PowerPoint
          texto: "Em qual aplicativo é possível criar apresentações utilizando slides, imagens, animações e transições?",
          respostas: ["PowerPoint", "Power Point", "Microsoft PowerPoint", "PPT"],
          dicas: ["É muito utilizado em trabalhos e apresentações profissionais.", "Permite organizar informações em sequências de slides.", "Seu ícone tradicional apresenta a letra P."] },
        { // Atalhos do teclado
          texto: "Com qual combinação de teclas podemos copiar um texto, imagem ou arquivo selecionado no Windows e em diversos programas do Office?",
          respostas: ["Ctrl + C", "Control + C", "Ctrl C"],
          dicas: ["É um dos atalhos mais utilizados no computador.", "É frequentemente acompanhado do comando de colar.", "Utiliza a tecla Ctrl junto com a letra C."] },
        { // Outlook
          texto: "Além de enviar e receber mensagens eletrônicas, qual aplicativo do Pacote Office também permite organizar compromissos, reuniões e calendários?",
          respostas: ["Outlook", "Microsoft Outlook", "MS Outlook"],
          dicas: ["É muito utilizado na comunicação profissional.", "Permite organizar e-mails e compromissos.", "Seu nome começa com O."] }
      ] },

    { nome: "Professor Julio", sombra: "assets/sombra-homem.jpg", area: "Hardware", foto: "assets/fotos/julio.jpg",
      palavra: "Humorado", marcante: "Risada", mania: "Fazer perguntas apontando com a escova", jeito: "Descontraído e, ao mesmo tempo, sério",
      momento: "Quando você contava os casos de família para a gente",
      registrado: "A gente jogando videogame",
      ensinamento: "Fazer dos estudos algo sério, mas ao mesmo tempo leve de aprender",
      deixado: "Ser abrigo para pessoas, mesmo estando triste",
      pista: "Anotação do caso: toda pergunta esconde um segredo na primeira letra. Junte todas e o código da surpresa final se revela. Erre à vontade: são 3 dicas por pergunta. E atenção, haverá uma sobre a sua área, porque o informante também gosta de testar o detetive.",
      // ▶ VÍDEO DO PROFESSOR JULIO (ainda será gravado): coloque o arquivo em assets/ e escreva o caminho aqui. Ex.: "assets/video-julio.mp4"
      video: "",
      perguntas: [
        { // Monitor
          texto: "Responsável por transformar informações digitais em imagens na tela, qual dispositivo é utilizado para a saída visual do computador?",
          respostas: ["Monitor", "Monitores", "Tela", "Display"],
          dicas: ["É um periférico de saída.", "Pode utilizar tecnologias como LED e LCD.", "É onde visualizamos janelas, imagens e vídeos."] },
        { // PESSOAL — não substituir nem alterar a resposta
          texto: "Em uma peça teatral realizada durante a comemoração dos 45 anos da Obra Social Dom Bosco, qual personagem você interpretou?",
          respostas: ["Padre Rosalvino", "Rosalvino", "Pe Rosalvino", "Padre Rosalvino da Silva"],
          dicas: ["O personagem era uma figura religiosa.", "Sua representação estava relacionada à história da Obra Social Dom Bosco.", "O nome do personagem começa com Padre."] },
        { // Mouse
          texto: "Basicamente, qual dispositivo permite que o usuário envie comandos ao computador movimentando um cursor pela tela?",
          respostas: ["Mouse", "Mouses"],
          dicas: ["É um periférico de entrada.", "Pode ser conectado por USB ou Bluetooth.", "Possui botões e, geralmente, uma rodinha central."] },
        { // Placa de vídeo
          texto: "Em um computador, qual componente é responsável pelo processamento gráfico, sendo especialmente importante para jogos e edição de vídeos?",
          respostas: ["Placa de vídeo (GPU)", "Placa de vídeo", "GPU", "Placa gráfica"],
          dicas: ["É responsável por processar e renderizar imagens.", "Pode ser integrada ou dedicada.", "Sua sigla mais conhecida é GPU."] },
        { // Cooler
          texto: "Conhecido por dissipar o calor e ajudar a evitar o superaquecimento, qual sistema de refrigeração é utilizado no computador?",
          respostas: ["Cooler", "Coolers", "Water cooler"],
          dicas: ["Ajuda a manter a temperatura dos componentes.", "Geralmente possui uma ventoinha.", "Seu nome é uma palavra em inglês que começa com C."] },
        { // BIOS
          texto: "Antes de o sistema operacional iniciar, qual firmware realiza verificações e prepara o hardware para a inicialização do computador?",
          respostas: ["BIOS"],
          dicas: ["É executado durante a inicialização.", "Realiza verificações básicas dos componentes.", "Sua sigla possui quatro letras e começa com B."] }
      ] },

    { nome: "Professora Vanessa", sombra: "assets/sombra-mulher.jpg", area: "Cibersegurança", foto: "assets/fotos/vanessa.jpg",
      palavra: "Jovial", marcante: "Explicação leve e descontraída", mania: "Fala algumas gírias", jeito: "Descontraída e, ao mesmo tempo, séria",
      momento: "O dia em que você deu todas as aulas para a gente",
      registrado: "Quando estava com vergonha de pegar comida na palestra e você me ajudando a ficar mais tranquila e familiarizada",
      ensinamento: "Avançar meus conhecimentos em assuntos já estudados por mim em outros cursos",
      deixado: "Ser você mesmo e não ter medo de demonstrar seus verdadeiros gostos",
      pista: "Anotação do caso: toda pergunta esconde um segredo na primeira letra. Junte todas e o código da surpresa final se revela. Erre à vontade: são 3 dicas por pergunta. E atenção, haverá uma sobre a sua área, porque o informante também gosta de testar o detetive.",
      // ▶ VÍDEO DA PROFESSORA VANESSA (ainda será gravado): coloque o arquivo em assets/ e escreva o caminho aqui. Ex.: "assets/video-vanessa.mp4"
      video: "",
      perguntas: [
        { // Ransomware
          texto: "Responsável por sequestrar dados ou bloquear o acesso a arquivos, exigindo um pagamento para liberá-los, que tipo de ameaça digital é essa?",
          respostas: ["Ransomware"],
          dicas: ["É um tipo de malware.", "Costuma utilizar criptografia para impedir o acesso aos arquivos.", "Seu nome começa com R e está relacionado a pedidos de resgate."] },
        { // Phishing
          texto: "Em ataques digitais, qual técnica utiliza mensagens, e-mails ou páginas falsas para enganar pessoas e roubar informações confidenciais?",
          respostas: ["Phishing", "Fishing"],
          dicas: ["Pode utilizar links fraudulentos.", "Frequentemente imita empresas e instituições conhecidas.", "Seu nome começa com P e lembra a palavra inglesa para pescar."] },
        { // PESSOAL — não substituir nem alterar a resposta. (Início ajustado para "Basicamente," para manter a inicial B do código; o conteúdo e a resposta são os originais.)
          texto: "Basicamente, o que é identificado por algumas pessoas como um simples desenho animado, mas possui características e uma identidade cultural próprias?",
          respostas: ["Anime", "Animes"],
          dicas: ["Tem origem na cultura japonesa.", "Pode apresentar gêneros como ação, romance, fantasia e suspense.", "É uma palavra de cinco letras que começa com A."] },
        { // Firewall
          texto: "Em uma rede de computadores, qual mecanismo monitora e controla o tráfego de dados, permitindo ou bloqueando conexões de acordo com regras de segurança?",
          respostas: ["Firewall", "Fire wall"],
          dicas: ["Funciona como uma barreira de proteção.", "Pode analisar o tráfego de entrada e saída de uma rede.", "Seu nome em inglês significa literalmente parede de fogo."] },
        { // Autenticação multifator
          texto: "Como é chamado o método de segurança que exige duas ou mais formas diferentes de verificação para confirmar a identidade de um usuário?",
          respostas: ["Autenticação multifator (MFA)", "Autenticação multifator", "MFA", "Autenticação de múltiplos fatores", "Autenticação multi fator", "Autenticação multifatorial", "2FA", "Autenticação de dois fatores"],
          dicas: ["Vai além de uma simples senha.", "Pode combinar senha, impressão digital e código enviado ao celular.", "Sua sigla em inglês possui três letras e começa com M."] },
        { // Antivírus
          texto: "Ao identificar arquivos maliciosos ou programas suspeitos, qual tipo de software pode detectar, bloquear e ajudar a remover essas ameaças do computador?",
          respostas: ["Antivírus", "Anti vírus"],
          dicas: ["Ajuda a proteger o sistema contra malwares.", "Pode realizar verificações em arquivos e dispositivos.", "Seu nome começa com A e termina com vírus."] }
      ] },

    { nome: "Professor José", sombra: "assets/sombra-homem.jpg", area: "TOTVS e Gestão Empresarial", foto: "assets/fotos/jose.jpg",
      palavra: "Objetivo", marcante: "Explicação leve e descontraída", mania: "Explicar até que todos entendam", jeito: "Descontraído e, ao mesmo tempo, sério",
      momento: "Piadinhas leves que melhoram os dias dos alunos",
      registrado: "Quando você finalmente gravou meu nome, uma raridade, né? rsrs",
      ensinamento: "Melhorar minha postura e minha oratória",
      deixado: "Ser muito, muito paciente rsrs",
      pista: "Anotação do caso: toda pergunta esconde um segredo na primeira letra. Junte todas e o código da surpresa final se revela. Erre à vontade: são 3 dicas por pergunta. E atenção, haverá uma sobre a sua área, porque o informante também gosta de testar o detetive.",
      // ▶ VÍDEO DO PROFESSOR JOSÉ (ainda será gravado): coloque o arquivo em assets/ e escreva o caminho aqui. Ex.: "assets/video-jose.mp4"
      video: "",
      perguntas: [
        { // ERP
          texto: "Responsável por centralizar e integrar informações de diferentes setores de uma empresa, qual tipo de sistema de gestão empresarial é conhecido pela sigla ERP?",
          respostas: ["Enterprise Resource Planning", "ERP", "Sistema ERP", "Planejamento de Recursos Empresariais"],
          dicas: ["É um sistema utilizado para integrar processos empresariais.", "Ajuda a conectar áreas como financeiro, estoque, compras e faturamento.", "Sua sigla possui três letras e começa com E."] },
        { // X-Men
          texto: "Em X-Men, qual mutante é conhecido por possuir garras retráteis de adamantium e um poderoso fator de cura?",
          respostas: ["Wolverine", "Logan", "James Howlett", "Carcaju"],
          dicas: ["Seu nome verdadeiro é James Howlett.", "É conhecido pelo temperamento difícil e pela capacidade de regeneração.", "Seu codinome também é o nome de um animal."] },
        { // Fluxo de caixa
          texto: "Basicamente, qual documento registra as entradas e saídas de dinheiro de uma empresa ao longo de determinado período?",
          respostas: ["Fluxo de caixa", "Demonstração do fluxo de caixa", "DFC"],
          dicas: ["Ajuda a acompanhar a movimentação financeira.", "Permite prever necessidades de dinheiro.", "Seu nome contém a palavra caixa."] },
        { // Estoque
          texto: "Em um sistema ERP, qual módulo é utilizado para controlar os produtos disponíveis, as entradas, as saídas e os saldos de mercadorias?",
          respostas: ["Estoque", "Módulo de estoque", "Controle de estoque", "Gestão de estoque"],
          dicas: ["Ajuda a evitar faltas e excessos de produtos.", "Registra movimentações de mercadorias.", "É o setor que controla aquilo que a empresa possui armazenado."] },
        { // Compras
          texto: "Com a finalidade de organizar a aquisição de materiais e serviços, qual setor é responsável por negociar com fornecedores e realizar compras para a empresa?",
          respostas: ["Setor de Compras", "Compras", "Departamento de Compras"],
          dicas: ["Mantém contato com fornecedores.", "Pesquisa preços e negocia condições.", "Seu nome começa com C."] },
        { // Cadastro de produtos
          texto: "Ao realizar o cadastro de um novo produto em um sistema ERP, qual informação identifica e diferencia esse item dos demais produtos cadastrados?",
          respostas: ["Código do produto", "Código", "Código do item", "Código de produto", "SKU", "ID do produto"],
          dicas: ["É utilizado para localizar o item no sistema.", "Pode ser composto por números e letras.", "É uma identificação única atribuída ao produto."] }
      ] }
  ],
  frase: "Ensinar é deixar uma parte de si no outro.",
  // ▶ VÍDEO DO DEPOIMENTO FINAL (tela 9, "o informante") — ainda será gravado.
  //   Quando estiver pronto: coloque o arquivo em assets/ e escreva o caminho aqui. Ex.: "assets/depoimento.mp4"
  //   Enquanto estiver vazio, a TV mostra "O depoimento será exibido aqui."
  video: "",
  albumExtra: [],                                // fotos extras: [{foto:"assets/f1.jpg", legenda:""}]
  final: ["Existem pessoas que passam por nossas vidas sem deixar registros oficiais.",
          "Mas algumas deixam evidências em lugares que nenhum arquivo consegue guardar.",
          "No jeito que a gente aprende,", "no jeito que a gente continua.",
          "Esta investigação termina aqui.", "A importância que você teve, não."],
  assinaturaFinal: "— Rebeca ♡"
};
