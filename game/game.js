const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// tile size
const size = 60;
const colors = new Array('yellow', 'orange', 'red', 'green', 'blue', 'aqua', 'purple')
// call function for given shape
const tetrominoes = { "I": I_shape, "O": O_shape, "T": T_shape, "S": S_shape, "Z": Z_shape, "L": L_shape, "J": J_shape };
// const x_coords = new Array(0, 60, 120, 180, 240, 300, 360, 420, 480, 540);

// array of all cubes
var cubes = new Array();
var cube_id = 0;
// array of cubes of current figure (moving one)
var current_cubes = null;
var current_state = 'move';

function init() {
    // create init fig
    create_fig();
    // intervalId = setInterval(() => run(), 1000);
    intervalId = setInterval(() => run(), 100);
}

function run() {
    exit = false;
    bottom_reached = check_move_down();
    if (bottom_reached) {
        for (let i = 0; i < current_cubes.length; i++) {
            if (current_cubes[i].y <= 0) {
                console.log('GAME OVER');
                clearInterval(intervalId);
                exit = true;
            }
        }
        if (!exit) {
            create_fig();
        }
    }
}

/*
Create a figure
Param:
init_coord_x -> array of figure objects
*/
function create_fig() {
    // random color
    let color = colors[Math.floor(Math.random() * colors.length)];
    // random initial x coordinate
    let init_coord_x = 240;

    // call random shape function
    const keysArray = Object.keys(tetrominoes);
    const rnd_key = keysArray[Math.floor(Math.random() * keysArray.length)];
    let val = tetrominoes[rnd_key];
    val(init_coord_x, color)
}

/*
Move down by one tile each figure in game window
Param:
figures -> array of figure objects
*/

function check_move_down() {
    let bottom_cubes = new Array();
    let lower_y = -100
    // find bottom y value of tiles in current figure
    for (let i = 0; i < current_cubes.length; i++) {
        if (current_cubes[i].y >= lower_y) {
            lower_y = current_cubes[i].y
        }
    }
    // extract all tiles in figure in bottom position
    for (let i = 0; i < current_cubes.length; i++) {
        if (current_cubes[i].y == lower_y) {
            bottom_cubes.push(current_cubes[i])
        }
    }

    let occupied = false;
    for (let i = 0; i < bottom_cubes.length; i++) {
        let new_y = bottom_cubes[i].y + 60;
        let coord = [bottom_cubes[i].x, new_y];
        // check if new tile is already occupied by another block
        for (let j = 0; j < cubes.length; j++) {
            if (cubes[j].x == coord[0] && cubes[j].y == coord[1]) {
                occupied = true;
                break;
            }
        }
        // check if bottom game box reached
        if ((!occupied) && new_y >= 780) {
            occupied = true;
            break;
        }
    }
    // if new coordinates are occupied don't move, otherwise move down
    if (!occupied) {
        update_pos(current_cubes, 'current_fig')
    } 
    return occupied
}

/*
Update new position down for all arrays . If type 'current_fig' passed, move down by one tile the moving figure
Param:
cubes -> cubes which have to move
type -> type of cubes
*/
function update_pos(current_cubes, type) {
    if (type == 'current_fig') {
        for (let k = 0; k < current_cubes.length; k++) {
            // clear previous figure positions
            ctx.clearRect(current_cubes[k].x, current_cubes[k].y, current_cubes[k].size, current_cubes[k].size);
            // update y positions in current_cubes array
            current_cubes[k].y += 60
            // update y positions in cubes array
            for (let i = 0; i < cubes.length; i++) {
                if (current_cubes[k].x == cubes[i].x && current_cubes[k].y - 60 == cubes[i].y) {
                    // occupied_tiles[i][1] += 60;
                    break;
                }
            }
        }
        for (let k = 0; k < current_cubes.length; k++) {
            // draw new figure positions
            create_cube(current_cubes[k].x, current_cubes[k].y, current_cubes[k].size, current_cubes[k].color, current_cubes[k].id)
        }
    }

}

function rotate_left() {

}

function rotate_right() {

}

function clear(cube_obj) {
    ctx.clearRect(cube_obj.x, cube_obj.y, cube_obj.size, cube_obj.size);
}


/*
Create a single cube
Param:
x -> x position
y -> y position
size -> cube's size
color -> cube's color
*/
function create_cube(x, y, size, color, id) {
    // build cube object
    if (id == null) {
        var cube = { x: x, y: y, size: size, color: color, id: cube_id };
        cube_id++;
    } else {
        var cube = { x: x, y: y, size: size, color: color, id: id };
    }
    ctx.beginPath();
    ctx.fillStyle = color;
    // ctx.strokeStyle = color;
    // noStroke();
    // var fillRect = true;
    // ctx.rect(x, y, size, size);
    // if (fillRect) {
    //     ctx.fill();
    // }

    ctx.fillRect(x, y, size, size);
    ctx.stroke();
    return cube;
}

function I_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []

    for (i = x - 60; i <= x + 120; i += 60) {
        new_cube = create_cube(i,-60,size,color);
        cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }  
    current_cubes = temp_cubes;  
}

function O_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = x; i <= x + 60; i += 60) {
        for (let j = -60; j <= 0; j += 60) {
            new_cube = create_cube(i, j, size, color);
            cubes.push(new_cube);
            temp_cubes.push(new_cube)
        }
    }
    current_cubes = temp_cubes;
}

function T_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []

    for (let i = x - 60; i <= x + 60; i+= 60) {
        new_cube = create_cube(i, -120, size, color);
        cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }
    new_cube = create_cube(x, -60, size, color);
    cubes.push(new_cube);
    temp_cubes.push(new_cube);
    current_cubes = temp_cubes;
}

function S_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = x; i <= x + 60; i += 60) {
    new_cube = create_cube(i, -120, size, color);
    cubes.push(new_cube);
    temp_cubes.push(new_cube)
    }
    for (let i = x - 60; i <= x; i += 60) {
    new_cube = create_cube(i, -60, size, color);
    cubes.push(new_cube);
    temp_cubes.push(new_cube)
    }
    current_cubes = temp_cubes;
}

function Z_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = x - 60; i <= x; i += 60) {
        new_cube = create_cube(i, -120, size, color);
        cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }

    for (let i = x; i <= x + 60; i += 60) {
        new_cube = create_cube(i, -60, size, color);
        cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }
    current_cubes = temp_cubes;
}

function L_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = -180; i <= -60; i += 60) {
        new_cube = create_cube(x, i, size, color);
        cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }
    new_cube = create_cube(x + 60, -60, size, color);
    cubes.push(new_cube);
    temp_cubes.push(new_cube)
    current_cubes = temp_cubes;
}

function J_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = -180; i <= -60; i += 60) {
        new_cube = create_cube(x, i, size, color);
        cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }
    new_cube = create_cube(x - 60, -60, size, color);
    cubes.push(new_cube);
    temp_cubes.push(new_cube)
    current_cubes = temp_cubes;
}

init();