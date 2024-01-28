const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// tile size
const size = 60;
const colors = new Array('gold', 'orange', 'red', 'green', 'blue', 'aqua', 'purple')
// call function for given shape
const tetrominoes = { "I": I_shape, "O": O_shape, "T": T_shape, "S": S_shape, "Z": Z_shape, "L": L_shape, "J": J_shape };
// const x_coords = new Array(0, 60, 120, 180, 240, 300, 360, 420, 480, 540);

// array of all cubes. Cubes of current figure are appended at the end when it stops
var cubes = new Array();
var cube_id = 0;
// array of cubes of current figure (moving one)
var current_cubes = null;
var current_state = 'moving';

function init() {
    // create init fig
    create_fig();
    // intervalId = setInterval(() => run(), 1000);
    intervalId = setInterval(() => run(), 500);
}

function run() {
    // exit if game over -> no creation of other figures and stop calling run method
    // console.log(cubes)
    check_full_rows()
    exit = false;
    occupied = check_move("slide_down");
    if (occupied) {
        current_state = "still"
        for (let i = 0; i < current_cubes.length; i++) {
            if (current_cubes[i].y <= 0) {
                console.log('GAME OVER');
                clearInterval(intervalId);
                exit = true;
            }
        }
        if (!exit) {
            // cubes
            cubes = cubes.concat(current_cubes)
            create_fig();
        }
    } else {
        // if new coordinates are occupied don't move, otherwise move down
        update_pos(current_cubes, 'slide_down')
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
    current_state = "moving"
}

/*
Move down by one tile each figure in game window
Param:
figures -> array of figure objects
*/

function check_move(movement) {
    switch (movement) {
        case 'slide_down':
            return check_slide_down();
        case "move_left":
            return check_move_left();
        case "move_right":
            return check_move_right();
    }
}

function check_slide_down() {
    occupied = false
    for (let i = 0; i < current_cubes.length; i++) {
        if (current_cubes[i].y + 60 >= 780) {
            occupied = true;
            break;
        }
        for (let j = 0; j < cubes.length; j++) {
            if (current_cubes[i].x == cubes[j].x && current_cubes[i].y + 60 == cubes[j].y) {
                occupied = true;
                break;
            }
        }
    }
    return occupied;
}

function check_move_left() {
    occupied = false
    // check intersection with left border
    for (let i = 0; i < current_cubes.length; i++) {
        if (current_cubes[i].x == 0) {
            occupied = true;
            break;
        }
        // check intersection with other figures
        for (let j = 0; j < cubes.length; j++) {
            if (current_cubes[i].x - 60 == cubes[j].x && current_cubes[i].y == cubes[j].y) {
                occupied = true;
                break;
            }
        }
    }
    return occupied;
}

function check_move_right() {
    occupied = false
    // check intersection with right border
    for (let i = 0; i < current_cubes.length; i++) {
        if (current_cubes[i].x == 540) {
            occupied = true;
            break;
        }
        // check intersection with other figures
        for (let j = 0; j < cubes.length; j++) {
            if (current_cubes[i].x + 60 == cubes[j].x && current_cubes[i].y == cubes[j].y) {
                occupied = true;
                break;
            }
        }
    }
    return occupied;  
}

/*
Update new position down for all arrays . If type 'current_fig' passed, move down by one tile the moving figure
Param:
cubes -> cubes which have to move
type -> type of cubes
*/
function update_pos(cubes_type, operation_type) {
    if (operation_type == 'slide_down' || operation_type == 'del_row') {
        change_x = 0
        change_y = 60
    } else if (operation_type == "move_left") {
        change_x = -60
        change_y = 0
    } else if (operation_type == "move_right") {
        change_x = 60
        change_y = 0
    }
    for (let k = 0; k < cubes_type.length; k++) {
        // clear previous figure positions
        ctx.clearRect(cubes_type[k].x, cubes_type[k].y, cubes_type[k].size, cubes_type[k].size);
        // update y positions in current_cubes array
        cubes_type[k].x += change_x
        cubes_type[k].y += change_y
    }
    for (let k = 0; k < cubes_type.length; k++) {
        // draw new figure positions
        create_cube(cubes_type[k].x, cubes_type[k].y, cubes_type[k].size, cubes_type[k].color, cubes_type[k].id)
    }
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
        // cubes.push(new_cube);
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
            // cubes.push(new_cube);
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
        // cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }
    new_cube = create_cube(x, -60, size, color);
    // cubes.push(new_cube);
    temp_cubes.push(new_cube);
    current_cubes = temp_cubes;
}

function S_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = x; i <= x + 60; i += 60) {
    new_cube = create_cube(i, -120, size, color);
    // cubes.push(new_cube);
    temp_cubes.push(new_cube)
    }
    for (let i = x - 60; i <= x; i += 60) {
    new_cube = create_cube(i, -60, size, color);
    // cubes.push(new_cube);
    temp_cubes.push(new_cube)
    }
    current_cubes = temp_cubes;
}

function Z_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = x - 60; i <= x; i += 60) {
        new_cube = create_cube(i, -120, size, color);
        // cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }

    for (let i = x; i <= x + 60; i += 60) {
        new_cube = create_cube(i, -60, size, color);
        // cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }
    current_cubes = temp_cubes;
}

function L_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = -180; i <= -60; i += 60) {
        new_cube = create_cube(x, i, size, color);
        // cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }
    new_cube = create_cube(x + 60, -60, size, color);
    // cubes.push(new_cube);
    temp_cubes.push(new_cube)
    current_cubes = temp_cubes;
}

function J_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = -180; i <= -60; i += 60) {
        new_cube = create_cube(x, i, size, color);
        // cubes.push(new_cube);
        temp_cubes.push(new_cube)
    }
    new_cube = create_cube(x - 60, -60, size, color);
    // cubes.push(new_cube);
    temp_cubes.push(new_cube)
    current_cubes = temp_cubes;
}

// listen for key event to rotate figures
document.addEventListener('keydown', function(event) {
    if (current_state == "moving") {
        if (event.key == "ArrowLeft") {
            console.log('left')
            occupied = check_move_left()
            if (!occupied) {
                update_pos(current_cubes, "move_left")
            }
        } else if (event.key == "ArrowRight") {
            console.log('right')
            occupied = check_move_right()
            if (!occupied) {
                update_pos(current_cubes, "move_right")
            }
        } else if (event.key == "ArrowUp") {
            console.log('up')
            rotate_left()
        } else if (event.key == "ArrowDown") {
            console.log('down')
            rotate_right()
        }
    }
});

function rotate_left() {
    console.log('Called left')
}

function rotate_right() {
    console.log('Called right')
}

function clear(cube_obj) {
    ctx.clearRect(cube_obj.x, cube_obj.y, cube_obj.size, cube_obj.size);
}

function check_full_rows() {
    // 10
    // store y coordinates as key and amount of tiles in that row as value
    let row_count = {}
    for (let i = 0; i < cubes.length; i++) {
        if (String(cubes[i].y) in row_count) {
            row_count[String(cubes[i].y)] += 1
        } else {
            row_count[String(cubes[i].y)] = 1
        }
    }
    console.log(row_count)

    // find full rows (10 tiles)
    for (let key in row_count) {
        if (row_count[key] == 10) {
            delete_full_row(parseInt(key))
        }
    }
}

function delete_full_row(y_coord) {
    console.log(y_coord)
    // delete all tiles in the given y coordinate
    let cubes_temp = []
    for (let i = 0; i < cubes.length; i++) {
        if (cubes[i].y == y_coord) {
            ctx.clearRect(cubes[i].x, cubes[i].y, cubes[i].size, cubes[i].size);
        } else {
            cubes_temp.push(cubes[i])
        }
    }
    // update new cubes array
    cubes = cubes_temp

    // move all upper cubes one row below
    update_pos(cubes, "del_row")

}

init();