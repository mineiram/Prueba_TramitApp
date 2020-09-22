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
        stream.on('data', (chunk) => {
			// si se encuentra se resuelve la promesa
            if (isPasswordInChunk(chunk.toString().split('\n'), password)) {
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