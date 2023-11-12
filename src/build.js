const fs = require("fs");
const path = require("path");
const carpeta_de_titulares = __dirname + "/../data";
const ficheros = fs.readdirSync(carpeta_de_titulares);
const fichero_final = __dirname + "/../dist/index.html";
const cabecera = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    html {
        font-family: Roboto;
        font-size: 10px;
    }
    </style>
</head>
<body>\n`;

fs.writeFileSync(fichero_final, cabecera, "utf8");
for(let i=0; i<ficheros.length; i++) {
    const fichero = ficheros[i];
    const fichero_de_titulares = path.resolve(carpeta_de_titulares, fichero);
    const contenido_de_fichero_de_titulares = fs.readFileSync(fichero_de_titulares).toString();
    const titulares_obj = JSON.parse(contenido_de_fichero_de_titulares);
    const titulares = Object.values(titulares_obj);
    const titulo = `<h5>${fichero.replace(".json", "")}</h5>\n`;
    fs.appendFileSync(fichero_final, titulo, "utf8");
    for(let j=0; j<titulares.length; j++) {
        const titular = titulares[j];
        const contenido = `<a href="#">${titular}</a><br/>\n`;
        fs.appendFileSync(fichero_final, contenido, "utf8");
    }
}
fs.appendFileSync(fichero_final, "</body></html>", "utf8");