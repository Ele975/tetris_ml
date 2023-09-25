// import {I_shape} from './shapes.js';

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const size = 60;
const colors = new Array('yellow', 'orange', 'red', 'green', 'blue', 'aqua', 'purple')
// call function for given shape
const tetrominoes = { "I": I_shape, "O": O_shape, "T": T_shape, "S": S_shape, "Z": Z_shape, "L": L_shape, "J": J_shape };
const x_coord = new Array(0, 60, 120, 180, 240, 300, 360, 420, 480, 540);

var cubes = new Array();
var fig = new Array();
var occupied_tiles = new Array();

var cube_id = 0;
var fig_id = 0;

var current_fig = null;
var current_state = 'move';

function run() {

    // continue to call
    figures(tetrominoes, size, x_coord, colors, cubes);
    // I_shape(cubes, x_coord);
    // setInterval(() => {
    //     cube = move(cube);
    // }, 1000);

}

/*
Create a single figure made of cubes with random x coordinate
Param:
tetromino -> random figure shape to create
cube -> cube object 
cubes -> array of cube objects
*/
function figures(tetrominoes, size, x_coord, colors, cubes) {
    let color = colors[Math.floor(Math.random() * colors.length)];

    let init_coord_x = x_coord[Math.floor(Math.random() * x_coord.length)];

    // call random tetromino shape function
    const keysArray = Object.keys(tetrominoes);
    const rnd_key = keysArray[Math.floor(Math.random() * keysArray.length)];
    let val = tetrominoes[rnd_key];
    current_fig = val(init_coord_x, size, color, cubes);
    // move all figures down every 1 second
    setInterval(move_down, 1000);
}

/*
Move down by one tile each figure in game window
Param:
figures -> array of figure objects
*/

function move_down() {
    console.log(current_state);
    let temp_fig = fig.slice();
    let temp_cubes = cubes.slice();
    let temp_new_cubes = new Array();

    for (let i = 0; i < temp_fig.length; i++) {
        let occupied = false;
        for (let j = 0; j < temp_fig[i].cubes.length; j++) {
            // check if tile for new position is occupied by a different figure or bottom reached
            let current_new_x = temp_fig[i].cubes[j].x;
            let current_new_y = temp_fig[i].cubes[j].y + 60;
            // square is drawed from top line
            if (current_new_y - 60 >= 720) {
                occupied = true;
                current_state = 'stop';
                break;
            }
            // check if next tile already occupied by another figure
                for (let k = i + 1; k < temp_fig.length; k++) {
                    for (let l = 0; l < temp_fig[k].cubes.length; l++) {
                        let other_x = temp_fig[k].cubes[l].x;
                        let other_y = temp_fig[k].cubes[l].y;

                        if (current_new_x == other_x && current_new_y == other_y) {
                            occupied = true;
                            current_state = 'stop';
                            break;
                        }
                    }
                    if (occupied) {
                        current_state = 'stop';
                        break;
                    }
                }
            if (occupied) {
                current_state = 'stop';
                break;
            } else {
                // save cubes with new y position
                temp_cube = Object.assign({}, temp_fig[i].cubes[j]);
                temp_cube.y = temp_cube.y + 60;
                temp_new_cubes.push(temp_cube);
            }
        }
        // if figure can be moved down by one row
        if (!(occupied)) {
            for (let k = 0; k < temp_fig[i].cubes.length; k++) {
                // clear cube drawing for the figure
                ctx.clearRect(fig[i].cubes[k].x, fig[i].cubes[k].y, fig[i].cubes[k].size, fig[i].cubes[k].size);
            }
            // add new cubes
            fig[i].cubes = temp_new_cubes;
            for (let k = 0; k < fig[i].cubes.length; k++) {
                // draw cubes with new coordinates
                create_cube(fig[i].cubes[k].x, fig[i].cubes[k].y, fig[i].cubes[k].size, fig[i].cubes[k].color, fig[i].cubes[k].id)

                // update cubes in cubes array
                for (let m = 0; m < temp_cubes.length; m++) {
                    if (fig[i].cubes[k].x == temp_cubes[m].x && fig[i].cubes[k].y == temp_cubes[m].y + 60) {
                        cubes[m].y += 60;
                    }
                }
            }
        }
        occupied = false;
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
    // occupied_tiles.push([x,y]);
    return cube;
}

function I_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60 * 3; i += 60) {
        if (x + 3 * 60 <= 540) {
            new_cube = create_cube(x + i, 0, size, color);
        } else {
            new_cube = create_cube(x - i, 0, size, color);
        }
        cubes.push(new_cube);
        temp_fig_cubes.push(new_cube);
    }
    var figure = { shape: "I", cubes: temp_fig_cubes, id: fig_id };
    fig_id++;
    fig.push(figure);
    return figure;

}

function O_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60; i += 60) {
        for (let j = 0; j <= 60; j += 60) {
            if (x + 60 <= 540) {
                new_cube = create_cube(x + i, j, size, color);
            } else {
                new_cube = create_cube(x - i, j, size, color);
            }
            cubes.push(new_cube);
            temp_fig_cubes.push(new_cube);
        }
    }
    var figure = { shape: "O", cubes: temp_fig_cubes, id: fig_id };
    fig_id++;
    fig.push(figure);
    return figure;
}

function T_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60 * 2; i += 60) {
        if (x + 60 * 2 <= 540) {
            new_cube = create_cube(x + i, 0, size, color);
            cubes.push(new_cube);
            temp_fig_cubes.push(new_cube);
            if (i <= 60) {
                new_cube = create_cube(x + 60, i, size, color);
            }
        } else {
            new_cube = create_cube(x - i, 0, size, color);
            cubes.push(new_cube);
            temp_fig_cubes.push(new_cube);
            if (i <= 60) {
                new_cube = create_cube(x - 60, i, size, color);
            }
        }
        cubes.push(new_cube);
        temp_fig_cubes.push(new_cube);
    }
    var figure = { shape: "T", cubes: temp_fig_cubes, id: fig_id };
    fig_id++;
    fig.push(figure);
    return figure;
}

function S_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60 * 2; i += 60) {
        if (x + 60 * 2 <= 540) {
            if (i == 0) {
                new_cube = create_cube(x, 60, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            } else if (i == 60) {
                new_cube = create_cube(x + i, 60, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
                new_cube = create_cube(x + i, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            } else {
                new_cube = create_cube(x + i, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            }
        } else {
            if (i == 0) {
                new_cube = create_cube(x, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            } else if (i == 60) {
                new_cube = create_cube(x - i, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
                new_cube = create_cube(x - i, 60, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            } else {
                new_cube = create_cube(x - i, 60, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            }
        }
    }
    var figure = { shape: "S", cubes: temp_fig_cubes, id: fig_id };
    fig_id++;
    fig.push(figure);
    return figure;
}

function Z_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60 * 2; i += 60) {
        if (x + 60 * 2 <= 540) {
            if (i == 0) {
                new_cube = create_cube(x, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            } else if (i == 60) {
                new_cube = create_cube(x + i, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
                new_cube = create_cube(x + i, 60, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            } else {
                new_cube = create_cube(x + i, 60, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            }
        } else {
            if (i == 0) {
                new_cube = create_cube(x, 60, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            } else if (i == 60) {
                new_cube = create_cube(x - i, 60, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
                new_cube = create_cube(x - i, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            } else {
                new_cube = create_cube(x - i, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            }
        }
    }
    var figure = { shape: "Z", cubes: temp_fig_cubes, id: fig_id };
    fig_id++;
    fig.push(figure);
    return figure;
}

function L_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60 * 2; i += 60) {
        if (x + 60 * 2 <= 540) {
            new_cube = create_cube(x + i, 60, size, color);
            cubes.push(new_cube);
            temp_fig_cubes.push(new_cube);
            if (i == 120) {
                new_cube = create_cube(x + i, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            }
        } else {
            new_cube = create_cube(x - i, 60, size, color);
            cubes.push(new_cube);
            temp_fig_cubes.push(new_cube);
            if (i == 120) {
                new_cube = create_cube(x, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            }
        }
    }
    var figure = { shape: "L", cubes: temp_fig_cubes, id: fig_id };
    fig_id++;
    fig.push(figure);
    return figure;
}

function J_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60 * 2; i += 60) {
        if (x + 60 * 2 <= 540) {
            new_cube = create_cube(x + i, 60, size, color);
            cubes.push(new_cube);
            temp_fig_cubes.push(new_cube);
            if (i == 120) {
                new_cube = create_cube(x, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            }
        } else {
            new_cube = create_cube(x - i, 60, size, color);
            cubes.push(new_cube);
            temp_fig_cubes.push(new_cube);
            if (i == 120) {
                new_cube = create_cube(x - i, 0, size, color);
                cubes.push(new_cube);
                temp_fig_cubes.push(new_cube);
            }
        }
    }
    var figure = { shape: "J", cubes: temp_fig_cubes, id: fig_id };
    fig_id++;
    fig.push(figure);
    return figure;
}

run();