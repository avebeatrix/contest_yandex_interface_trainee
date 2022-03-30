/*
[  
  [1, 1, 0, 0, 0, 1, 0, 1, 1],  
  [1, 1, 0, 1, 0, 1, 0, 0, 0],  
  [0, 1, 0, 1, 0, 0, 0, 1, 1]  
]
*/
const scan = (matrix) => {
    let result = {
        ceil: 0,
        floor: 0,
        both: 0
    };
    let width = matrix[0].length;
    let height = matrix.length;

    let currentBitMap = new Set();
    let lastCol = new Set();

    let check = () => {
        if (currentBitMap.size) {
            //decision
            if (currentBitMap.has(0) && !currentBitMap.has(height - 1)) {
                result.ceil++;
            } else if (!currentBitMap.has(0) && currentBitMap.has(height - 1)) {
                result.floor++;
            } else if (currentBitMap.size === height) {
                result.both++;
            } else if (currentBitMap.has(0) && currentBitMap.has(height - 1)) {
                result.ceil++;
                result.floor++;
            }
        }
    }

    for (let i = 0; i < width; i++) {
        let hasConnection = false;
        let tmpBitMap = new Set();
        for (let j = 0; j < height; j++) {
            if (matrix[j][i]) {
                tmpBitMap.add(j);
                if (lastCol.has(j)) {
                    hasConnection = true;
                }
            }
        }
        if (hasConnection) {
            [...tmpBitMap].forEach(val => currentBitMap.add(val));
        } else {
            check();
            currentBitMap = new Set(tmpBitMap);
        }
        lastCol = tmpBitMap;
    }
    check();

    return result;
}
module.exports = { scan }