const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const score_text = document.getElementById("score");
console.log(score_text)

// tile size
const size = 60;
// const colors = new Array('lightyellow', 'coral', 'red', 'chartreuse', 'dodgerblue', 'aqua', 'magenta')
// 
// const colors = new Array('cyan', 'magenta', 'yellow', 'chartreuse', 'lightsalmon', 'red')
const colors = new Array('#04d9ff', '#ff9933', '#0cff0c', '#fe019a', '#bc13fe', '#ff073a', '#cfff04')
// call function for given shape
const tetrominoes = { "I": I_shape, "O": O_shape, "T": T_shape, "S": S_shape, "Z": Z_shape, "L": L_shape, "J": J_shape };

// array of all cubes. Cubes of current figure are appended at the end when it stops
var cubes = new Array();
var cube_id = 0;
// array of cubes of current figure (moving one)
var current_cubes = null;
var current_state = 'moving';
// figure's central point
var origin = null;

var score = 0;
var game_state = "active";

// write here to display immediately
let txt = "Score: " + score;
score_text.innerHTML = txt;


function init() {
    // create init fig
    create_fig();
    // draw game grid
    intervalId = setInterval(() => run(), 400);
}

function run() {
    // exit if game over -> no creation of other figures and stop calling run method
    check_full_rows()
    exit = false;
    occupied = check_move("slide_down");
    if (occupied) {
        current_state = "still"
        for (let i = 0; i < current_cubes.length; i++) {
            if (current_cubes[i].y <= 0) {
                game_state = "lost";
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
    // update score
    let txt = "Score: " + score;
    score_text.innerHTML = txt;
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
function update_pos(cubes_type, operation_type, nr_rows) {
    let change_x = 0
    let change_y = 0

    if (operation_type == 'slide_down') {
        change_x = 0
        change_y = 60
    } else if (operation_type == "move_left") {
        change_x = -60
        change_y = 0
    } else if (operation_type == "move_right") {
        change_x = 60
        change_y = 0
    } else if (operation_type == "del_rows") {
        change_x = 0
        change_y = nr_rows * 60
    }
    for (let k = 0; k < cubes_type.length; k++) {
        // clear previous cube's position area
        ctx.clearRect(cubes_type[k].x - 1, cubes_type[k].y - 1, cubes_type[k].size + 2, cubes_type[k].size + 2);
        // update y positions in cubes array
        cubes_type[k].x += change_x
        cubes_type[k].y += change_y
    }
    for (let k = 0; k < cubes_type.length; k++) {
        // draw new figure positions
        create_cube(cubes_type[k].x, cubes_type[k].y, cubes_type[k].size, cubes_type[k].color, cubes_type[k].id)
    }
    // update figure's origin
    origin[0] += change_x
    origin[1] += change_y

    // update score -> NINTENDO scoring level 0
    lines_score = 0;
    if (operation_type == "del_rows") {
        switch(nr_rows){
            case 1:
                lines_score = 40;
                break;
            case 2:
                lines_score = 100;
                break;
            case 3:
                lines_score = 300;
                break;
            case 4:
                lines_score = 1200;
                break;
        }
        score += lines_score;
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
    // Set the fill color
    ctx.fillStyle = color; 
    // Fill the cube with color
    ctx.fillRect(x, y, size, size); 

    // Set the border color
    ctx.strokeStyle = 'black'; 
    ctx.lineWidth = 0.5;
    // Draw the border of the cube
    ctx.strokeRect(x, y, size, size); 
    return cube;
}

function I_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []

    for (i = x - 60; i <= x + 120; i += 60) {
        new_cube = create_cube(i,-60,size,color);
        temp_cubes.push(new_cube)
    }  
    current_cubes = temp_cubes; 
    origin = [x + 60, -60] 
}

function O_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = x; i <= x + 60; i += 60) {
        for (let j = -120; j <= -60; j += 60) {
            new_cube = create_cube(i, j, size, color);
            temp_cubes.push(new_cube)
        }
    }
    current_cubes = temp_cubes;
    origin = [x + 30, -90]
}

function T_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []

    for (let i = x - 60; i <= x + 60; i+= 60) {
        new_cube = create_cube(i, -120, size, color);
        temp_cubes.push(new_cube)
    }
    new_cube = create_cube(x, -60, size, color);
    temp_cubes.push(new_cube);
    current_cubes = temp_cubes;
    origin = [x + 30, -90]
}

function S_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = x; i <= x + 60; i += 60) {
    new_cube = create_cube(i, -120, size, color);
    temp_cubes.push(new_cube)
    }
    for (let i = x - 60; i <= x; i += 60) {
    new_cube = create_cube(i, -60, size, color);
    temp_cubes.push(new_cube)
    }
    current_cubes = temp_cubes;
    origin = [x + 30,-90]
}

function Z_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = x - 60; i <= x; i += 60) {
        new_cube = create_cube(i, -120, size, color);
        temp_cubes.push(new_cube)
    }

    for (let i = x; i <= x + 60; i += 60) {
        new_cube = create_cube(i, -60, size, color);
        temp_cubes.push(new_cube)
    }
    current_cubes = temp_cubes;
    origin = [x + 30, -90]
}

function L_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = -180; i <= -60; i += 60) {
        new_cube = create_cube(x, i, size, color);
        temp_cubes.push(new_cube)
    }
    new_cube = create_cube(x + 60, -60, size, color);
    temp_cubes.push(new_cube)
    current_cubes = temp_cubes;
    origin = [x+30, -90]
}

function J_shape(x, color) {
    let new_cube = {};
    let temp_cubes = []
    for (let i = -180; i <= -60; i += 60) {
        new_cube = create_cube(x, i, size, color);
        temp_cubes.push(new_cube)
    }
    new_cube = create_cube(x - 60, -60, size, color);
    temp_cubes.push(new_cube)
    current_cubes = temp_cubes;
    origin = [x + 30, -90]
}

// listen for key event to rotate figures
document.addEventListener('keydown', function(event) {
    event.preventDefault()
    if (current_state == "moving") {
        if (event.key == "ArrowLeft") {
            occupied = check_move_left()
            if (!occupied) {
                update_pos(current_cubes, "move_left")
            }
        } else if (event.key == "ArrowRight") {
            occupied = check_move_right()
            if (!occupied) {
                update_pos(current_cubes, "move_right")
            }
        } else if (event.key == "ArrowUp") {
            rotate()
        } else if (event.key == "ArrowDown") {
            let occupied = check_slide_down()
            if (!occupied) {
                update_pos(current_cubes, "slide_down")
            }

        }
    }
});

function rotate() {
    let rotate = true
    // store new coord
    let new_coord = []
    for (let i = 0; i < current_cubes.length; i++) {
        // translate to origin
        x0 = current_cubes[i].x - origin[0]
        y0 = current_cubes[i].y - origin[1]
        // rotate
        // rotation matrix for 90 degrees counter-clockwise [[cos(90), -sen(90)], [sen(90), cos(90)]]
        rot_matrix = [[0,-1], [1,0]]
        // vector-matrix multiplication
        new_x = rot_matrix[0][0] * x0 + rot_matrix[0][1] * y0
        new_y = rot_matrix[1][0] * x0 + rot_matrix[1][1] * y0
        // translate back
        new_x += origin[0]
        new_y += origin[1]
        new_coord.push([new_x, new_y])

        // do not rotate if coordinates outside game box
        if (new_x < 0 || new_x > 540 || new_y > 720) {
            rotate = false;
            break;
        }

    }
    // update positions and redraw figure if rotation is possible
    if (rotate) {
        for (let i = 0; i < current_cubes.length; i++) {
            ctx.clearRect(current_cubes[i].x - 1, current_cubes[i].y - 1, current_cubes[i].size + 2, current_cubes[i].size + 2);
            current_cubes[i].x = new_coord[i][0]
            current_cubes[i].y = new_coord[i][1]
        }
        for (let i = 0; i < current_cubes.length; i++) {
            create_cube(current_cubes[i].x, current_cubes[i].y, current_cubes[i].size, current_cubes[i].color, current_cubes[i].id)
        }
    }
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
    y_coords = []
    // find y coord of full rows (with 10 tiles)
    for (let key in row_count) {
        if (row_count[key] == 10) {
            y_coords.push(parseInt(key))
        }
    }
    delete_full_rows(y_coords)
}

function delete_full_rows(y_coords) {
    let move_cubes = []
    let cubes_temp = []
    let min_y = Math.max(...y_coords)
    for (let i = 0; i < cubes.length; i++) {
        let deleted = false;
        for (let j = 0; j < y_coords.length; j++) {
            if (cubes[i].y == y_coords[j]) {
                deleted = true
                ctx.clearRect(cubes[i].x - 1, cubes[i].y - 1, cubes[i].size + 2, cubes[i].size + 2);
            }
        }
        if (!deleted) {
            cubes_temp.push(cubes[i]) 
            if (cubes[i].y < min_y) {
                move_cubes.push(cubes[i])
            }
        }
    }
    cubes = cubes_temp;
    update_pos(move_cubes, "del_rows", y_coords.length);

}

init();