`
Una persona ha sido asesinada en la noche de Halloween 🔪. Usando un hechizo 🧙‍♀️, hemos conseguido escuchar su último susurro pero es muy debíl y no nos permite identificar quién pudo ser el asesino.

La información que nos proporciona:

whisper: cadena de texto que representa lo que la víctima intentó decir antes de morir

suspects: lista de cadenas que representa los nombres de todos los sospechosos.

Hay que tener que el susurro whisper tiene algunas reglas:

Cada ~ representa una letra incierta en el susurro.
Cada posición del susurro es una posición del nombre del asesino.
La longitud del whisper no siempre representa la longitud completa del nombre, ya que la víctima pudo haber muerto antes de terminar de decirlo.
Pero si el último carácter del susurro es una $, entonces el nombre del asesino terminaba ahí.
¡Tu objetivo es descubrir quién pudo ser el asesino! Debes devolver:

Si solo un nombre encaja con el patrón del susurro, retorna ese nombre.
Si hay varios nombres que encajan, retorna todos los nombres separados por comas.
Si ningún nombre encaja, retorna una cadena vacía ("").
Las mayúsculas y minúsculas de las letras no importan.

Ejemplo:

const whisper = 'd~~~~~a';
const suspects = ['Dracula', 'Freddy Krueger', 'Jason Voorhees', 'Michael Myers'];

findTheKiller(whisper, suspects); // -> 'Dracula'

const whisper2 = '~r~dd~';
const suspects2 = ['Freddy', 'Freddier', 'Fredderic']

findTheKiller(whisper2, suspects2); // -> 'Freddy,Freddier,Fredderic'

const whisper3 = '~r~dd$';
const suspects3 = ['Freddy', 'Freddier', 'Fredderic']

findTheKiller(whisper3, suspects3); // -> ''

const whisper4 = 'mi~~def';
const suspects4 = ['Midudev', 'Midu', 'Madeval']

findTheKiller(whisper4, suspects4); // -> ''
`

function findTheKiller(whisper: string, suspects: string[]) {
  const palabra1OcultaEn2 = (palabra1: string, palabra2: string) => {
    palabra1 = palabra1.toLocaleLowerCase();
    palabra2 = palabra2.toLocaleLowerCase();

    if (palabra1.length > palabra2.length) return false;

    for (let i = 0; i < palabra1.length; i++) {
      const letraPalabra1 = palabra1[i];
      const letraPalabra2 = palabra2[i];

      if (letraPalabra1 !== '~' && letraPalabra1 !== letraPalabra2) {
        return false;
      }
    }

    return true;
  }

  let res: string[] = [];
  let tempWhisper = whisper;

  suspects.forEach(suspect => {
    let encontrado = true;

    if (whisper.endsWith('$') && whisper.length - 1 < suspect.length) {
      encontrado = false;
    }

    if (whisper.endsWith('$')) {
      tempWhisper = whisper.slice(0, whisper.length - 1)
    }

    if (encontrado && !palabra1OcultaEn2(tempWhisper, suspect)) {
      encontrado = false;
    }

    if (encontrado) {
      res.push(suspect);
    }
  })

  return res.join(',');
}

console.log('Reto 4:')
const whisper = 'd~~~~~a';
const suspects = ['Dracula', 'Freddy Krueger', 'Jason Voorhees', 'Michael Myers'];
console.log(findTheKiller(whisper, suspects), '\n'); // -> 'Dracula'

const whisper2 = '~r~dd~';
const suspects2 = ['Freddy', 'Freddier', 'Fredderic']
console.log(findTheKiller(whisper2, suspects2), '\n'); // -> 'Freddy,Freddier,Fredderic'

const whisper3 = '~r~dd$';
const suspects3 = ['Freddy', 'Freddier', 'Fredderic']
console.log(findTheKiller(whisper3, suspects3), '\n'); // -> ''

const whisper4 = 'mi~~def';
const suspects4 = ['Midudev', 'Midu', 'Madeval']
console.log(findTheKiller(whisper4, suspects4), '\n'); // -> ''
