
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");



function run() {
    const size = 60;
    var cubes = new Array();
    const x_coord = new Array(0,60,120,180,240,300,360,420,480,540);
    const tetrominoes = new Array('I', 'O', 'T', 'S', 'Z', 'J');
    const colors = new Array('yellow', 'orange', 'red', 'green', 'blue', 'aqua', 'purple')

    // continue to call
    figures(tetrominoes, size, x_coord, colors, cubes);
    // I_shape(cubes, x_coord);
    // setInterval(() => {
    //     cube = move(cube);
    // }, 1000);

}

/*
Create a single figure made of cubes
Param:
tetromino -> random figure shape to create
cube -> cube object 
cubes -> array of cube objects
*/
function figures(tetrominoes, size, x_coord, colors, cubes) {
    let color = colors[Math.floor(Math.random() * colors.length)];

    init_coord_x = x_coord[Math.floor(Math.random() * x_coord.length)];
    I_shape(init_coord_x, size, color, cubes);


}

function I_shape(x, size, color, cubes) {
    let new_cube = {}
    for (let i = 0; i <= 60*3; i += 60) {
        if (x + 3*60 <= 540) {
            new_cube = create_cube(x + i, 0, size, color);
        } else {
            new_cube = create_cube(x - i, 0, size, color);
        }
        cubes.push(new_cube);
    }
}

function O_shape(x, size, color, cubes) {
    let new_cube = {};
    for (let i = 0; i <= 60; i += 60) {
        for (let j = 0; j <= 60; j += 60) {
            if (x + 60 <= 540) {
                new_cube = create_cube(x + i, j, size, color);
            } else {
                new_cube = create_cube(x - i, j, size, color);
            }
            cubes.push(new_cube); 
        }
    }
}

function T_shape(x, size, color, cubes) {
    let new_cube = {};
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
            new_cube = create_cube(x + i, 0, size, color);
            cubes.push(new_cube); 
            new_cube = create_cube(x + 60, i, size, color);
        } else {
            new_cube = create_cube(x - i, 0, size, color);
            cubes.push(new_cube); 
            new_cube = create_cube(x - 60, i, size, color);
        }
        cubes.push(new_cube); 
    }
}

function S_shape(x, size, color, cubes) {

}

function Z_shape(x, size, color, cubes) {

}

function J_shape(x, size, color, cubes) {

}


function move(cube_obj) {
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
    cube_obj = {x:old_x, y:old_y+ 60, size:size, color:color};
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
function create_cube(x,y,size, color) {
    // build cube object
    const cube = {x:x, y:y, size:size, color:color};
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
    return cube;
}

run();