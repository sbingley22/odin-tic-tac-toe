const Element = function(){
    board = document.querySelector("#board")
    tiles = [[],[],[]]
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            tiles[i][j] = document.querySelector("#t"+String(i+j+1));      
        }
    }
    
    return{board, tiles}
}

const el = Element()
console.log(el.tiles)