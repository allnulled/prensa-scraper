// ==UserScript==
// @name     Extracción de titulares
// @version  1
// @grant    none
// @include  *
// ==/UserScript==

const main = function () {
  const promesa = new Promise(function (ok) {
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
  /*
  return promesa.then(async function (titulares) {
    try {
      const data = {
        namespace: window.location.hostname,
        data: titulares
      };
      const url = "http://127.0.0.1:8066";
      const parametros = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      };
      const response = await fetch(url, parametros);
      return response.json();
    } catch (error) {
      console.log("Errores mientras se intentaba pasar la información:");
      console.log(error);
    }
  }).then(function (response) {
    console.log(response);
  });
  //*/
};

main();