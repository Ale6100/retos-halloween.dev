`
Estás atrapado en Silent Hill, en una habitación cuadrada de tamaño n x n y el temido Pyramid Head (▲) está en algún lugar de la habitación, moviéndose hacia ti (T).

Tú no puedes moverte, y Pyramid Head se mueve una celda por turno, en cualquiera de las cuatro direcciones cardinales (arriba, abajo, izquierda, derecha), pero siempre elige el camino más corto hacia tu posición. Tu objetivo es determinar si Pyramid Head puede alcanzarte.

La habitación está representada por una matriz n x n:

T: tu posición (donde te encuentras atrapado).
▲: la posición inicial de Pyramid Head.
.: espacios vacíos donde Pyramid Head puede moverse.
#: paredes que Pyramid Head no puede atravesar.
Escribe una función que determine si Pyramid Head podrá alcanzarte. Si Pyramid Head puede alcanzarte, devuelve el número de pasos con lo que lo puede lograr, si no puede alcanzarte entonces devuelve -1.

const room = [
  ['.', '.', '#', '.', '▲'],
  ['#', '.', '#', '.', '#'],
  ['.', '.', '.', '.', '.'],
  ['#', '#', '#', '.', '#'],
  ['T', '.', '.', '.', '.'],
]

escapePyramidHead(room) // -> 8

const room2 = [
  ['T', '.', '#', '.'],
  ['.', '.', '.', '.'],
  ['▲', '.', '.', '#'],
  ['.', '#', '#', '#'],
]

escapePyramidHead(room2) // -> 2

const room3 = [
  ['#', '#', '#'],
  ['▲', '.', '#'],
  ['.', '#', 'T'],
]

escapePyramidHead(room3) // -> -1
`

function escapePyramidHead(room: string[][]) {
  type TypeCasillero = '▲' | 'T' | '#' | '.'
  type TypeUbicacion = { fila: number, columna: number };
  const alto = room.length;
  const ancho = room[0].length;
  const roomValues: number[][] = room.map(row => row.map(() => Infinity));

  const ubicacionActual = (elementoEsperado: TypeCasillero) => {
    const fila = room.findIndex(fila => fila.includes(elementoEsperado));
    const columna = room[fila].indexOf(elementoEsperado);
    return { fila, columna }
  }

  const movimientosPosibles = (posicion: TypeUbicacion, nextValue: number) => {
    const { fila, columna } = posicion;
    const movimientos = []

    if (fila !== 0 && room[fila-1][columna] !== '#' && nextValue < roomValues[fila-1][columna]) movimientos.push('Arriba')
    if (columna !== ancho-1 && room[fila][columna+1] !== '#' && nextValue < roomValues[fila][columna+1]) movimientos.push('Derecha')
    if (fila !== alto-1 && room[fila+1][columna] !== '#' && nextValue < roomValues[fila+1][columna]) movimientos.push('Abajo')
    if (columna !== 0 && room[fila][columna-1] !== '#' && nextValue < roomValues[fila][columna-1]) movimientos.push('Izquierda')
    return movimientos
  }

  let posicion = ubicacionActual('T')
  let posicionPyramidHead = ubicacionActual('▲');

  const analizarAlrededor = (posicion: TypeUbicacion) => {
    const { fila, columna } = posicion;
    let actualValue = roomValues[fila][columna];
    let nextValue = actualValue+1

    movimientosPosibles(posicion, nextValue).forEach(movimiento => {
      if (movimiento === 'Arriba') {
        if (nextValue < roomValues[fila-1][columna]) {
          roomValues[fila-1][columna] = nextValue;
          analizarAlrededor({ fila: fila-1, columna: columna })
        }
      } else if (movimiento === 'Derecha') {
        if (nextValue < roomValues[fila][columna+1]) {
          roomValues[fila][columna+1] = nextValue;
          analizarAlrededor({ fila: fila, columna: columna+1 })
        }
      } else if (movimiento === 'Abajo') {
        if (nextValue < roomValues[fila+1][columna]) {
          roomValues[fila+1][columna] = nextValue;
          analizarAlrededor({ fila: fila+1, columna: columna })
        }
      } else if (movimiento === 'Izquierda') {
        if (nextValue < roomValues[fila][columna-1]) {
          roomValues[fila][columna-1] = nextValue;
          analizarAlrededor({ fila: fila, columna: columna-1 })
        }
      }
    })
  }

  roomValues[posicion.fila][posicion.columna] = 0;
  analizarAlrededor(posicion)
  const movimientos = roomValues[posicionPyramidHead.fila][posicionPyramidHead.columna];
  return movimientos === Infinity ? -1 : movimientos
}

console.log('Reto 5:')

const room = [
  ['.', '.', '#', '.', '▲'],
  ['#', '.', '#', '.', '#'],
  ['.', '.', '.', '.', '.'],
  ['#', '#', '#', '.', '#'],
  ['T', '.', '.', '.', '.'],
]

console.log(escapePyramidHead(room)) // -> 8

const room2 = [
  ['T', '.', '#', '.'],
  ['.', '.', '.', '.'],
  ['▲', '.', '.', '#'],
  ['.', '#', '#', '#'],
]

console.log(escapePyramidHead(room2)) // -> 2

const room3 = [
  ['#', '#', '#'],
  ['▲', '.', '#'],
  ['.', '#', 'T'],
]

console.log(escapePyramidHead(room3)) // -> -1
