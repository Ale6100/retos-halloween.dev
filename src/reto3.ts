`
Enunciado:
Estás atrapado en una pesadilla en la que Freddy Krueger te persigue 😭. El sueño está representado por un laberinto de celdas, donde cada celda tiene un valor numérico que indica el nivel de peligro de esa parte del sueño.

Debes encontrar el camino más seguro (es decir, el que tenga el menor valor total de peligro) desde la esquina superior izquierda hasta la esquina inferior derecha de la matriz.

En este desafío, solo puedes moverte hacia la derecha o hacia abajo (no puedes retroceder ni moverte en diagonal) y debes calcular el nivel total de peligro del camino más seguro.

La pesadilla está representada por una matriz dream de tamaño n x m donde cada celda es un número positivo que representa el nivel de peligro de esa celda en el sueño.

Y tienes que devolver el valor total de peligro del camino más seguro de la esquina superior izquierda (posición [0][0]) a la esquina inferior derecha (posición [n-1][m-1]).

const dream = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
]

const bestPath = findSafestPath(dream) // Devuelve 7
// El mejor camino es:
// [0, 0] -> 1
// [0, 1] -> 3
// [0, 2] -> 1
// [1, 2] -> 1
// [2, 2] -> 1

// 1 -> 3 -> 1 -> 1 -> 1 = 7
`;

function findSafestPath(dream: number[][]) {
  const ancho = dream[0].length;
  const alto = dream.length;

  let menorPuntuacionPropagada = Array.from({ length: alto }, () => Array(ancho).fill(0));

  // Coloco el valor en cada posición, que depende del mmenor valor según si vino desde la izquierda o derecha
  for (let i = 0; i < alto; i++) {
    for (let j = 0; j < ancho; j++) {
      // Coloco los valores de la primer fila
      if (i === 0) menorPuntuacionPropagada[0][j] = j === 0 ? dream[0][j] : menorPuntuacionPropagada[0][j-1] + dream[0][j];

      // Coloco los vaores de la primera columna
      else if (j === 0) menorPuntuacionPropagada[i][0] = i === 0 ? dream[i][0] : menorPuntuacionPropagada[i-1][0] + dream[i][0];

      else menorPuntuacionPropagada[i][j] = Math.min(menorPuntuacionPropagada[i-1][j], menorPuntuacionPropagada[i][j-1]) + dream[i][j]
    }
  }

  return menorPuntuacionPropagada.at(-1)?.at(-1)
}

const dream = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
]

console.log('Reto 3:')
console.log(findSafestPath(dream), '\n') // 7
