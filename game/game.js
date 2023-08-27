// import {I_shape} from './shapes.js';

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const size = 60;
const colors = new Array('yellow', 'orange', 'red', 'green', 'blue', 'aqua', 'purple')
// call function for given shape
const tetrominoes = {"I" : I_shape, "O" : O_shape, "T" : T_shape, "S" : S_shape, "Z" : Z_shape, "L" : L_shape, "J" : J_shape};
const x_coord = new Array(0,60,120,180,240,300,360,420,480,540);

var cubes = new Array();
var fig = new Array();
var occupied_tiles = new Array();

var cube_id = 0;
var fig_id = 0;


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
    val(init_coord_x, size, color, cubes);

    // move all figures down every 1 second
    setInterval(() => move_fig(fig), 1000);
}

/*
Move down by one tile each figure in game window
Param:
figures -> array of figure objects
*/
function move_fig(figures) {
    // remove from fig, cubes and occupied_tiles
    let temp_fig = fig;
    let temp_cubes = cubes;
    let temp_occupied_tiles = occupied_tiles;
    for (let i = 0; i < temp_fig.length; i++) {
        let occupied = false;
        for (let j = 0; j < temp_fig[i].cubes; j++) {
            let new_x = temp_fig[i].cubes[j].x
            let new_y = temp_fig[i].cubes[j].y + 60;
            // check if tile for new position is occupied
            for (let k = 0; k < temp_occupied_tiles.length; k++) {
                if (occupied_tiles[k][0] == new_x && occupied_tiles[k][1] == new_y) {
                    occupied = true;
                    break;
                }
            }
        }
        if (!(occupied)) {
            for (let l = 0; l < temp_fig[i].cubes; l++) {
                create_cube(temp_fig[i].cubes[l].x, temp_fig[i].cubes[l].y + 60, size, temp_fig[i].cubes[l].color, temp_fig[i].cubes[l].id);
                // remove old cubes from arrays
                for (let m = 0; m < temp_cubes.length; m++) {
                    if (temp_fig[i].cubes[l].x == temp_cubes[m].x && temp_fig[i].cubes[l].y == temp_cubes[m].y) {
                        
                    }
                }
            }
        }
        occupied = false;
    }






    old_x = cube_obj.x;
    old_y = cube_obj.y;
    color = cube_obj.color;
    size = cube_obj.size;
    clear(cube_obj);
    ctx.beginPath();
    // ctx.fillStyle = color;
    // ctx.fillRect(old_x,old_y + 60, size, size);
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    var fillRect = false;
    ctx.rect(old_x, old_y + 60, size, size);
    if (fillRect) {
    ctx.fill();
    }
    ctx.stroke();
    cube_obj = {x:old_x, y:old_y + 60, size:size, color:color};
    ctx.stroke();
    return cube_obj;

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
function create_cube(x,y,size, color, id) {
    // build cube object
    if (id == null) {
        var cube = {x:x, y:y, size:size, color:color, id: cube_id};
        cube_id++;
    } else {
        var cube = {x:x, y:y, size:size, color:color, id: id};
    }
    ctx.beginPath();
    // ctx.fillStyle = color;
    // ctx.fillRect(x,y, size, size);
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    var fillRect = true;
    ctx.rect(x, y, size, size);
    if (fillRect) {
    ctx.fill();
    }
    ctx.stroke();
    occupied_tiles.push([x,y]);
    return cube;
}

function I_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60*3; i += 60) {
        if (x + 3*60 <= 540) {
            new_cube = create_cube(x + i, 0, size, color);
        } else {
            new_cube = create_cube(x - i, 0, size, color);
        }
        cubes.push(new_cube);
        temp_fig_cubes.push(new_cube);
    }
    var figure = {shape : "I", cubes : temp_fig_cubes, id : fig_id};
    fig_id++;
    fig.push(figure);

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
    var figure = {shape : "O", cubes : temp_fig_cubes, id : fig_id};
    fig_id++;
    fig.push(figure);
}

function T_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
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
    var figure = {shape : "T", cubes : temp_fig_cubes, id : fig_id};
    fig_id++;
    fig.push(figure);
}

function S_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
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
    var figure = {shape : "S", cubes : temp_fig_cubes, id : fig_id};
    fig_id++;
    fig.push(figure);
}

function Z_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
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
    var figure = {shape : "Z", cubes : temp_fig_cubes, id : fig_id};
    fig_id++;
    fig.push(figure);
}

function L_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
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
    var figure = {shape : "L", cubes : temp_fig_cubes, id : fig_id};
    fig_id++;
    fig.push(figure);
}

function J_shape(x, size, color, cubes) {
    let new_cube = {};
    let temp_fig_cubes = new Array();
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
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
    var figure = {shape : "J", cubes : temp_fig_cubes, id : fig_id};
    fig_id++;
    fig.push(figure);
}

run();