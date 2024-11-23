`
Enunciado:
Durante la noche de Halloween 🎃, una bruja 🧙‍♀️ está preparando una mezcla mágica. Tiene una lista de pociones, cada una con un poder asociado, y quiere combinar dos de ellas para obtener un poder total específico.

Dada una lista de enteros donde cada número representa el poder de una poción 🧪 y un número entero que representa el poder objetivo, debes encontrar el índice de las dos primeras pociones que sumen exactamente el poder objetivo.

Por ejemplo:

const potions = [4, 5, 6, 2]
const goal = 8

createMagicPotion(potions, goal) // [2, 3]

Si no se encuentra ninguna combinación, devuelve undefined
`;

function createMagicPotion(potions: number[], target: number) {
  const candidatos: number[][] = [];

  for (let i = 0; i < potions.length-1; i++) {
    const elemento = potions[i];
    const longitudRestante = potions.length-1-i;

    for (let j = 0; j < longitudRestante; j++) {
      const elementoSiguiente = potions[i+1+j];

      if (elemento + elementoSiguiente === target) {
        candidatos.push([i, i+1+j])
      }
    }
  }

  return candidatos.toSorted((a, b) => a[1] - b[1])[0]
}

console.log(createMagicPotion([4, 5, 6, 2], 8)) // [2, 3]
console.log(createMagicPotion([1, 2, 3, 4], 9)) // undefined
console.log(createMagicPotion([1, 2, 3, 4], 5)) // [1, 2]
