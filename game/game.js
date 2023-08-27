
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");



function run() {
    var size = 60;
    var cubes = new Array();
    var x_coord = new Array(0,60,120,180,240,300,360,420,480,540);
    var init_coord_x = x_coord[Math.floor(Math.random() * x_coord.length)]
    const init_coord_y = 0;
    const tetrominoes = new Array('I', 'O', 'T', 'S', 'Z', 'J');
    const colors = new Array('yellow', 'orange', 'red', 'green', 'blue', 'aqua', 'purple')
    let color = Math.floor(Math.random() * colors.length);
    // create first cube objest
    var cube = create_cube(init_coord_x,init_coord_y, size, colors[color]);

    I_shape(cube, cubes);
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
function figures(tetromino, cube, cubes) {
    cubes.push(cube);
    x = cube.x;
    y = cube.y;
}

function I_shape(cube,cubes) {
    let new_cube = {};
    if (cube.x + 4*60 <= 540) {
        for (let i=60; i <= 60*3; i += 60) {
            new_cube = create_cube(cube.x + i, cube.y, cube.size, cube.color);
            cubes.push(new_cube);
        }
    } else {
        for (let i=-60; i >= -60*3; i -= 60) {
            new_cube = create_cube(cube.x + i, cube.y, cube.size, cube.color);
            cubes.push(new_cube);
        }
    }
}

function O_shape(cube) {

}

function T_shape(cube) {

}

function S_shape(cube) {

}

function Z_shape(cube) {

}

function J_shape(cube) {

}


function move(cube_obj) {
    old_x = cube_obj.x;
    old_y = cube_obj.y;
    color = cube_obj.color;
    size = cube_obj.size;
    clear(cube_obj);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(old_x,old_y + 60, size, size);
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
    ctx.fillStyle = color;
    ctx.fillRect(x,y, size, size);
    ctx.stroke();
    return cube;
}

run();