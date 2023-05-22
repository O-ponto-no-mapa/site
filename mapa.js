// Cria a variável tipo lista (array) para ser usada com os dados do arquivo JSON externo.
let lugares = [];

// Cria a variável tipo lista (array) para ser usada com os marcadores do mapa.
let marcadoresCrato = [];
let marcadoresMissaoVelha = [];
let marcadoresJuazeiro = [];
let marcadoresSantana = [];
let marcadoresNovaOlinda = [];
let marcadoresBarbalha = [];

// Executa a função 'obterDados().
obterDados();

// Define a função assíncrona 'obterDados()'.
async function obterDados() {
    // A função 'fetch' ler o arquivo 'lugares.json' e guarda na variável 'resposta'.
    let resposta = await fetch('lugares.json');
    // O operador 'await' pausa a função para receber o retorno da solicitação, que no caso é um objeto tipo JSON, 
    lugares = await resposta.json();

    // Observação: cada objeto da lista é acessado pelo seu índice, que começa com 0, 
    // como 'lugares' tem nove objetos, os índices são de 0 a 8.
    // O índice fica entre colchetes '[índice]' após o nome da lista de objetos, seguido de '.' e o nome da chave.
    // Por exemplo, para acessar o valor da chave 'nome' do primeiro objeto da lista é usado 'lugares[0].nome'. 

    // Executa a função 'obterTemperatura()'.
    obterTemperatura();
}

// Na função abaixo o objeto de fetch() não é um arquivo local mas sim um endereço web, uma URL, que retorna um objeto JSON.
// Abra o link abaixo no navegador para visualizar a resposta da API Open-Meteo 
// sobre a solicitação de temperatura na latitute -7 e longitude -39:
// https://api.open-meteo.com/v1/forecast?latitude=-7&longitude=-39&hourly=temperature_2m&timezone=America%2FSao_Paulo

// Para mais informações sobre a API Open-Meteo, visite:
// https://open-meteo.com/en/docs#

// Define a função 'obterTemperatura()' para obter dados usando a API Open-Meteo.
async function obterTemperatura() {
    // Loop 'for' para executar nove solicitações dos dados da API Open-Meteo, referentes aos geossítios deste exercício.
    for (let i = 0; i < 9; i++) {
        // A função 'fetch' ler a URL com as respectivas coordenadas de 'lugares' e guarda na variável 'dadosOpenMeteo'.
        let dadosOpenMeteo = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lugares[i].lat + '&longitude=' + lugares[i].long + '&hourly=temperature_2m&timezone=America%2FSao_Paulo');

        // O operador 'await' pausa a função para receber o retorno da solicitação, que no caso é um objeto tipo JSON, 
        let dadosTempJSON = await dadosOpenMeteo.json();

        // Observação: cada API tem um modo próprio de organizar os dados no objeto JSON, e para saber é preciso inspecionar.

        // Descomente as duas linhas abaixo para imprimir no console do navegador o conteúdo de 'dadosTempJSON'.
        // console.log("Resultado da solicitação de objeto tipo JSON:");
        // console.log(dadosTempJSON);

        // Neste exercício o que interessa é a temperatura às 12:00 de hoje e de amanhã, portanto, o 12º e 36º objeto do array. 
        // Esta informação é acessada com 'dadosTempJSON.hourly.temperature_2m[12]'
        // e 'dadosTempJSON.hourly.temperature_2m[36]'.

        // Também são usadas as respectivas datas com 'dadosTempJSON.hourly.time[12]'
        // e dadosTempJSON.hourly.time[36].

        // Neste caso é usada a função 'new Date()' que especifica que o valor de data é de fato uma data,
        // e formata a data de acordo com o padrão brasileiro (DD/MM/AAAA HH:MM:SS) 
        // com a função 'toLocaleString()', pois o formato da API Open-Meteo é 'AAAA/MM/DDTHH:MM'.

        // Adiciona em 'lugares[i]' as chaves 'tempDataHoje' e 'tempDataAmanha' com os valores obtidos pela API Open-Meteo.
        lugares[i].tempDataHoje = new Date(dadosTempJSON.hourly.time[12]).toLocaleString('pt-BR');
        lugares[i].tempDataAmanha = new Date(dadosTempJSON.hourly.time[36]).toLocaleString('pt-BR');

        // Adiciona em 'lugares[i]' as chaves 'temperaturaHoje' e 'temperaturaAmanha' com os valores obtidos pela API Open-Meteo.
        lugares[i].temperaturaHoje = dadosTempJSON.hourly.temperature_2m[12];
        lugares[i].temperaturaAmanha = dadosTempJSON.hourly.temperature_2m[36];
    }

    // Executa a função 'carregarMapa()'.
    carregarMapa();
}

// Define a função 'carregarMapa()'.
function carregarMapa() {

    // Cria ícones para os marcadores no mapa.
    let iconeAmarelo = L.icon({
        iconUrl: 'pinoAmarelo.png', // Arquivo de imagem do ícone.
        shadowUrl: 'pino30_30_sombra.png',
        iconSize: [30, 30], // Tamanho do ícone em pixels.
        iconAnchor: [15, 30], // Ponto no ícone que corresponde a localizaão do marcador.
        shadowSize: [30, 30], // Tamanho do ícone da sombra.
        shadowAnchor: [15, 30],  // Ponto do ícone da sombra que corresponde a localizaão do marcador.
        popupAnchor: [0, -32] // Ponto quue o popup deve abrir em relação à posição do ícone.
    });

    let iconeAzul = L.icon({
        iconUrl: 'pinoAzul.png', // Arquivo de imagem do ícone.
        shadowUrl: 'pino30_30_sombra.png',
        iconSize: [30, 30], // Tamanho do ícone em pixels.
        iconAnchor: [15, 30], // Ponto no ícone que corresponde a localizaão do marcador.
        shadowSize: [30, 30], // Tamanho do ícone da sombra.
        shadowAnchor: [15, 30],  // Ponto do ícone da sombra que corresponde a localizaão do marcador.
        popupAnchor: [0, -32] // Ponto quue o popup deve abrir em relação à posição do ícone.
    });

    let iconeCiano = L.icon({
        iconUrl: 'pinoCiano.png', // Arquivo de imagem do ícone.
        shadowUrl: 'pino30_30_sombra.png',
        iconSize: [30, 30], // Tamanho do ícone em pixels.
        iconAnchor: [15, 30], // Ponto no ícone que corresponde a localizaão do marcador.
        shadowSize: [30, 30], // Tamanho do ícone da sombra.
        shadowAnchor: [15, 30],  // Ponto do ícone da sombra que corresponde a localizaão do marcador.
        popupAnchor: [0, -32] // Ponto quue o popup deve abrir em relação à posição do ícone.
    });


    let iconeMagenta = L.icon({
        iconUrl: 'pinoMagenta.png', // Arquivo de imagem do ícone.
        shadowUrl: 'pino30_30_sombra.png',
        iconSize: [30, 30], // Tamanho do ícone em pixels.
        iconAnchor: [15, 30], // Ponto no ícone que corresponde a localizaão do marcador.
        shadowSize: [30, 30], // Tamanho do ícone da sombra.
        shadowAnchor: [15, 30],  // Ponto do ícone da sombra que corresponde a localizaão do marcador.
        popupAnchor: [0, -32] // Ponto quue o popup deve abrir em relação à posição do ícone.
    });

    let iconeVerde = L.icon({
        iconUrl: 'pinoVerde.png', // Arquivo de imagem do ícone.
        shadowUrl: 'pino30_30_sombra.png',
        iconSize: [30, 30], // Tamanho do ícone em pixels.
        iconAnchor: [15, 30], // Ponto no ícone que corresponde a localizaão do marcador.
        shadowSize: [30, 30], // Tamanho do ícone da sombra.
        shadowAnchor: [15, 30],  // Ponto do ícone da sombra que corresponde a localizaão do marcador.
        popupAnchor: [0, -32] // Ponto quue o popup deve abrir em relação à posição do ícone.
    });


    let iconeVermelho = L.icon({
        iconUrl: 'pinoVermelho.png', // Arquivo de imagem do ícone.
        shadowUrl: 'pino30_30_sombra.png',
        iconSize: [30, 30], // Tamanho do ícone em pixels.
        iconAnchor: [15, 30], // Ponto no ícone que corresponde a localizaão do marcador.
        shadowSize: [30, 30], // Tamanho do ícone da sombra.
        shadowAnchor: [15, 30],  // Ponto do ícone da sombra que corresponde a localizaão do marcador.
        popupAnchor: [0, -32] // Ponto quue o popup deve abrir em relação à posição do ícone.
    });

    //Existem dois tipos de camadas (layers): 'base layers' que são as camadas de imagens (tiles layers) do mapa;
    // e 'overlays' que são os ítens adicionados sobre a 'base layers'. 

    // Cria três 'base layers', as imagens dos mapas: um padrão do OpenstreetMaps, um topográfico e outro com tonalidade na escala de cinza.
    let mapaBase = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    let mapaStamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });

    let mapaEsri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // A função 'for' é um loop (ou laço) com um número determinado de repetições,
    // e geralmente tem a seguinte estrtura (inicialização; condição; atualização){declarações executadas se a condição for verdadeira}
    // Observação: '++' significa adicionar '1', portanto a expressão 'i++' é equivalente a 'i = i + 1'.
    // Como 'lugares.length' retorna nove, neste caso as declaçõres de 'for' (o que está entre chaves {}) serão executadas nove vezes.
    for (let i = 0; i < lugares.length; i++) {

        // Cria a variável 'geoparqueInfo' com as informações dos geossítios contidas em 'lugares'.
        let geoparqueInfo = "<h2>" + lugares[i].nome +
            "</h2> Coordenadas: " + lugares[i].lat + ", " + lugares[i].long +
            "<br> Cidade: " + lugares[i].cidade +
            `<br> Site: <a href='${lugares[i].site}' target='blank'>` + lugares[i].site + "</a>" +
            "<p><strong>Open-Meteo API</strong><br> Temperatura estimada <br>" +
            lugares[i].tempDataHoje + ": " + lugares[i].temperaturaHoje + "°C" +
            "<br>" + lugares[i].tempDataAmanha + ": " + lugares[i].temperaturaAmanha + "°C </p>";;

        // A função 'if' faz um teste de comparação e executa se a expressão for verdadeira.
        // A função 'else if' é executada se o teste de comparação anterior for falso.

        // O método 'push' adiciona um novo ítem no array. 
        // Aqui é usado pra adicionar ítens nas listas de marcadores das respectivas cidades.
        if (lugares[i].cidade == "Crato - CE") {
            // Cria e adiciona  marcador no mapa nas coordenadas especificadas em 'lugares[i]' com os respectivos ícones.    
            marcadoresCrato.push(L.marker([lugares[i].lat, lugares[i].long], {
                icon: iconeAmarelo
            }).bindPopup(geoparqueInfo));
        }
        else if (lugares[i].cidade == "Missão Velha - CE") {
            // Cria e adiciona  marcador no mapa nas coordenadas especificadas em 'lugares[i]' com os respectivos ícones.    
            marcadoresMissaoVelha.push(L.marker([lugares[i].lat, lugares[i].long], {
                icon: iconeAzul
            }).bindPopup(geoparqueInfo));
        }
        else if (lugares[i].cidade == "Juazeiro do Norte - CE") {
            // Cria e adiciona  marcador no mapa nas coordenadas especificadas em 'lugares[i]' com os respectivos ícones.    
            marcadoresJuazeiro.push(L.marker([lugares[i].lat, lugares[i].long], {
                icon: iconeCiano
            }).bindPopup(geoparqueInfo));
        }
        else if (lugares[i].cidade == "Santana do Cariri - CE") {
            // Cria e adiciona  marcador no mapa nas coordenadas especificadas em 'lugares[i]' com os respectivos ícones.    
            marcadoresSantana.push(L.marker([lugares[i].lat, lugares[i].long], {
                icon: iconeMagenta
            }).bindPopup(geoparqueInfo));
        }
        else if (lugares[i].cidade == "Nova Olinda - CE") {
            // Cria e adiciona  marcador no mapa nas coordenadas especificadas em 'lugares[i]' com os respectivos ícones.    
            marcadoresNovaOlinda.push(L.marker([lugares[i].lat, lugares[i].long], {
                icon: iconeVerde
            }).bindPopup(geoparqueInfo));
        }
        else if (lugares[i].cidade == "Barbalha - CE") {
            // Cria e adiciona  marcador no mapa nas coordenadas especificadas em 'lugares[i]' com os respectivos ícones.    
            marcadoresBarbalha.push(L.marker([lugares[i].lat, lugares[i].long], {
                icon: iconeVermelho
            }).bindPopup(geoparqueInfo));
        }

    }

    // Cria o grupo de camada para cada cidade com os respectivos marcadores.
    let grupoCrato = L.layerGroup(marcadoresCrato);
    let grupoMissaoVelha = L.layerGroup(marcadoresMissaoVelha);
    let grupoJuazeiro = L.layerGroup(marcadoresJuazeiro);
    let grupoSantana = L.layerGroup(marcadoresSantana);
    let grupoNovaOlinda = L.layerGroup(marcadoresNovaOlinda);
    let grupoBarbalha = L.layerGroup(marcadoresBarbalha);

    // Cria o objeto 'meuMapa' com a vista centralizada na latitude e longitude de 'lugares[0]' com um zoom inicial de 9.
    // Adiciona como 'base layer' o 'mapaBase' e como 'overlay' os grupos dos marcadores.
    let meuMapa = L.map('mapaLeaflet', {
        layers: [mapaBase, grupoCrato, grupoMissaoVelha, grupoJuazeiro, grupoSantana, grupoNovaOlinda, grupoBarbalha]
    }).setView([lugares[0].lat, lugares[0].long], 9);

    // Cria os ítens de 'base layers' que serão exibidos no menu de controle do mapa.
    let controleBaseLayers = {
        "Mapa padrão OpenStreetMap": mapaBase,
        "Mapa Stamen.TonerLite": mapaStamen_TonerLite,
        "Mapa Esri.WorldImagery": mapaEsri_WorldImagery,
    };

    // Cria os ítens de 'overlays' que serão exibidos no menu de controle do mapa.
    let controleOverlays = {
        "Crato": grupoCrato,
        "Missão Velha": grupoMissaoVelha,
        "Juazeiro do Norte": grupoJuazeiro,
        "Santana do Cariri": grupoSantana,
        "Nova Olinda": grupoNovaOlinda,
        "Barbalha": grupoBarbalha

    };

    // Adiciona o menu de controle ao mapa com as 'base layers' e 'overlays'.
    L.control.layers(controleBaseLayers, controleOverlays).addTo(meuMapa);
}