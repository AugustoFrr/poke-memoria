var ativa = false;
var blockFlip = false;
var cartaId;
var matchs = 0;
var numCard;
var cronometro;
var song;

var mainMusic = document.getElementById('indexSound');
mainMusic.volume = 0.3;
mainMusic.play();

function criarCarta(i, j, level) {
  var container = document.createElement('div');
  var theCard = document.createElement('div');
  var theFront = document.createElement('div');
  var theBack = document.createElement('div');

  if (level.value == "Easy") {
    container.className = "cardEasy";
  } else if (level.value == "Medium") {
    container.className = "cardMedium";
  } else {
    container.className = "cardHard";
  }

  theCard.className = "thecard noselect";
  theFront.className = "thefront";
  theBack.className = "theback";

  j = (j == 0) ? "x" : "y"
  theCard.id = `carta${i}${j}`

  var img = document.createElement('img');
  img.src = `./mons/img${i}.png`;
  img.className = "image";
  theBack.appendChild(img);

  theFront.onclick = () => {
    if (!blockFlip) {
      theCard.classList.toggle('flip');
      document.getElementById('flipSound').play();

      if (ativa) {
        if (theCard.id.replace(/x|y/, "") == cartaId.replace(/x|y/, "")) {
          document.getElementById('matchSound').play();

          matchs++;
          if (matchs == numCard) {
            setTimeout(() => {
              gameOver(true);
            }, 2000);
          }

          ativa = false;
        } else {

          blockFlip = true;
          setTimeout(() => {

            theCard.classList.toggle('flip');
            document.getElementById(cartaId).classList.toggle('flip');
            blockFlip = false;
          }, 1000);
          ativa = false;
        }
      } else {

        cartaId = theCard.id;
        ativa = true;
      }
    }
  }

  theCard.appendChild(theFront);
  theCard.appendChild(theBack);
  container.appendChild(theCard);

  return container;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  var segundos;

  let level = document.querySelector('select');
  if (level.value == "Easy") {
    numCard = 6;
    segundos = 60;
    song = './sounds/easy.mp3'
  } else if (level.value == "Medium") {
    numCard = 12;
    segundos = 80;
    song = './sounds/medium.mp3'
  } else {
    numCard = 20;
    segundos = 140;
    song = './sounds/hard.mp3'
  }
  document.getElementById('indexSound').pause();
  document.getElementById('indexSound').src = song;
  document.getElementById('indexSound').volume = 0.1;
  document.getElementById('indexSound').play();

  document.getElementById('painel').style.visibility = "visible";

  cronometro = setInterval(() => {
    document.getElementById('crono').innerHTML = segundos;
    segundos--;
    if (segundos < 0) {
      gameOver(false);
      clearInterval(cronometro);
    }
  }, 1000);

  document.querySelector('button').remove();
  level.remove();
  document.querySelector('div#logo').remove();
  var lista = new Array();
  for (var i = 1; i <= numCard; i++) {
    for (var j = 0; j < 2; j++) {
      lista.push(criarCarta(i, j, level));
    }
  }

  shuffleArray(lista);

  for (var i = 0; i < lista.length; i++) {
    document.querySelector('div#game').appendChild(lista[i]);
  }
}

function gameOver(vitoria) {
  document.getElementById('indexSound').pause();
  clearInterval(cronometro);
  limparTela();

  var container = document.createElement('div');
  var row = document.createElement('div');
  var row2 = document.createElement('div');
  var col = document.createElement('div');
  var col2 = document.createElement('div');
  var div = document.createElement('div');

  var botao = document.createElement('a');
  botao.onclick = () => {
    window.location.reload(false);
  }
  botao.textContent = "Restart!";
  botao.className = "btn btn-primary btn-lg"

  container.className = "container vertical-center menu";
  row.className = "row";
  row2.className = "row";
  col.className = "col";
  col2.className = "col d-flex justify-content-center mb-2";
  div.className = "d-flex justify-content-center mb-2";
  var img = document.createElement('img');

  if (vitoria) {
    document.getElementById('indexSound').src = './sounds/victory.mp3';
    img.src = "./mons/vitoria.png";
  } else {
    document.getElementById('indexSound').src = './sounds/gameover.mp3';
    img.src = "./mons/gameover.png";
  }

  document.getElementById('indexSound').volume = 0.2;
  document.getElementById('indexSound').play();

  img.style.width = "60%";

  div.appendChild(img);
  col.appendChild(div);
  row.appendChild(col);
  container.appendChild(row);

  col2.appendChild(botao);
  row2.appendChild(col2);
  container.appendChild(row2);

  game.appendChild(container)
}

function limparTela() {
  var game = document.querySelector('div#game');
  game.innerHTML = "";
  document.getElementById('painel').remove();
}




