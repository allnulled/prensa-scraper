const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const main = async function() {
    try {
        const navegador = await puppeteer.launch({ headless: false });
        const pestanya = await navegador.newPage();
        const objetivos = [
            "https://elpais.com",
            "https://indianexpress.com",
            "https://quo.eldiario.es",
            "https://sputniknews.lat",
            "https://timesofindia.indiatimes.com",
            "https://www.20minutos.es",
            "https://www.abc.es",
            "https://www.aljazeera.com",
            "https://www.ara.cat",
            "https://www.chinadaily.com.cn",
            "https://www.clarin.com",
            "https://www.diaridetarragona.com",
            "https://www.eldiario.es",
            "https://www.elmundo.es",
            "https://www.elpuntavui.cat",
            "https://www.globaltimes.cn",
            "https://www.hindustantimes.com",
            "https://www.indiatoday.in",
            "https://www.lanacion.com.ar",
            "https://www.larazon.es",
            "https://www.lavanguardia.com",
            "https://www.muyinteresante.es",
            "https://www.nationalgeographic.es",
            "https://www.pagina12.com.ar",
            "https://www.perfil.com",
            "https://www.regio7.cat"
        ];
        await pestanya.setViewport({ width: 1080, height: 1024 });
        for(let index=0; index<objetivos.length; index++) {
          const item = objetivos[index];
          const dominio = item.replace("https://", "");
          const fichero_dominio = dominio + ".json";
          const fichero_destino = path.resolve(__dirname, "../data", fichero_dominio);
          console.log(`[SCRAP][${index}/${objetivos.length}] ${dominio}`);
          await pestanya.goto(item);
          const datos = await pestanya.evaluate(function() {
            return new Promise(function (ok) {
                setTimeout(function () {
                  const resultados = Array.from(document.querySelectorAll("*")).filter(function (elemento) {
                    const no_tiene_hijos = elemento.children.length === 0;
                    const tiene_texto = elemento.textContent.length !== 0;
                    const es_tag_valido = ["SCRIPT", "STYLE", "TITLE", "BUTTON", "IMG"].indexOf(elemento.tagName) === -1;
                    const tiene_espacios_suficientes = elemento.textContent.split(" ").length > 10;
                    const no_contiene_imagenes = elemento.textContent.indexOf("<img") === -1;
                    const no_contiene_botones = elemento.textContent.indexOf("<button") === -1;
                    return no_tiene_hijos && tiene_texto && es_tag_valido && tiene_espacios_suficientes && no_contiene_imagenes && no_contiene_botones;
                  }).map(function (elemento) {
                    return elemento.textContent;
                  });
                  return ok(resultados);
                }, 1000 * 5);
              });
          });
          fs.writeFileSync(fichero_destino, JSON.stringify(datos, null, 4), "utf8");
          require(__dirname + "/build.js");
        }
    } catch (error) {
        console.log("Error en el scrap general:");
        console.log(error);
    }
};
main();