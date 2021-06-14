const puppeteer = require('puppeteer-core');
const os = require('os');
const getVideosTime = require('./getVideosTime');

const executablePaths = {
  'linux': '/usr/bin/google-chrome',
  'darwin': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'win32': 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
}

const platform = os.platform();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePaths[platform]
  });
  
  const page = await browser.newPage();
  
  // A função já está toda feita, basta somente seguir o padrão na hora de adicionar novas playlists
  const plTutoriais = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PLibu8EvlllROUe3PMpsgSUaiO3Eqfz14f');
  const plUnboxings =  await getVideosTime(page, 'https://www.youtube.com/playlist?list=PLibu8EvlllRPEtXkQA85TWDp7dALrucy8')
  const plReviews = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PLibu8EvlllRPmz7WHdyfMY6UHZdAD1EPN')
  const plRE2ClaireA = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PLibu8EvlllRNudSvJxsVmbrxnaX8S7aya')
  const plJogos = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PLibu8EvlllRO56De_Wk6cG_oSbfe9uhUe')
  const plLives = await getVideosTime(page, 'https://www.youtube.com/playlist?list=PLibu8EvlllROfh7Zk7w25b1cS5F2oE7Dr')
  //await page.screenshot({ path: 'playlist.png' });

  // Aqui adicione suas playlist de acordo com o nome, respeitando a ordem conforme o exemplo abaixo
  let hours = plTutoriais[0] + plUnboxings[0] + plReviews[0] + plRE2ClaireA[0] + plJogos[0] + plLives[0];
  let minutes = plTutoriais[1] + plUnboxings[1] + plReviews[1] + plRE2ClaireA[1] + plJogos[1] + plLives[1];
  let seconds = plTutoriais[2] + plUnboxings[2] + plReviews[2] + plRE2ClaireA[2] + plJogos[2] + plLives[2];

  const minutesFromSeconds = Math.floor(seconds / 60);

  seconds = seconds % 60;
  minutes += minutesFromSeconds;

  const hoursFromMinutes = Math.floor(minutes / 60);

  minutes = minutes % 60;
  hours += hoursFromMinutes;

  console.log(`Produzi ${hours}h${minutes}m${seconds}s de conteúdo para o Canal Elton Santos`)

  await browser.close();
})();