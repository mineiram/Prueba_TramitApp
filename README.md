# Prueba TramitApp
Código del ejercicio propuesto por TramitApp.

Se utiliza el fichero https://github.com/danielmiessler/SecLists/blob/master/Passwords/xato-net-10-million-passwords.txt

El ejercicio consiste en introducir, a través de línea de comandos, una contraseña para comprobar si está presente o no en el listado.
## Ejemplos de uso
Sí está presente:
```bash
node password_checker.js 12345
```
Sí está presente:
```bash
node password_checker.js shadow
```
No está presente:
```bash
node password_checker.js 1233233333224421
```
## Requisitos
Es necesario tener el fichero de contraseñas más utilizadas (https://github.com/danielmiessler/SecLists/blob/master/Passwords/xato-net-10-million-passwords.txt) localmente en el mismo directorio que el código.
