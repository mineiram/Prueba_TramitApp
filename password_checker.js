/*
Realizado por: Miguel Neira Martín
Prueba para TramitApp
*/

const fs = require('fs');


/*
Función que compruebe si la contraseña elegida por el usuario está en la lista
de más utilizadas. Devuelve una promesa con el valor true o false según si se ha
encontrado o no la contraseña
*/
function isMostUsed(password) {
    const stream = fs.createReadStream("./xato-net-10-million-passwords.txt", {encoding: 'utf8'});
    
	// función de búsqueda de un string en un array de strings
    function isPasswordInChunk(chunk, password) {
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] === password)
                return true
        }
    }
    
    return new Promise((resolve, reject) => {
        // leyendo por chunks
        let result = false;
        let twoChunks = ["", ""];
        stream.on('data', (chunk) => {
          /*
            La idea es, en el chunk i-ésimo, tener en twoChunks[0] la parte final del
            chunk i-1 para después concatenarlo a twoChunks[1], que tiene el chunk i.
            He escogido de forma deliberada el substring twoChunks[1].length - 80 para asegurarme
            de no guardar todo el chunk y de recoger las contraseñas que se perdían en la versión previa.
          */

            twoChunks[0] = twoChunks[1].substring(twoChunks[1].length - 80);
            twoChunks[1] = chunk.toString();
            twoChunks[0] += twoChunks[1];
            

	// si se encuentra se resuelve la promesa
            if (isPasswordInChunk(twoChunks[0].split('\n'), password)) {
                result = true;
                resolve(result);
                stream.destroy();
            }         
            
        });
        stream.on('end', () => {
	// al llegar al final también se resuelve la promesa
            resolve(result);
        })
  
    })
}


// Comprobación de si se ha invocado correctamente al programa
// Uso: node password_checker.js tu_password
if (process.argv.length <= 2) {
	console.log("Uso correcto: node password_checker.js tu_password");
	process.exit();
}

isMostUsed(process.argv[2].trim())
            .then(response => console.log(response ? "Sí es de las más utilizadas" : "No es de las más utilizadas"));
