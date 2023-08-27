export function I_shape(x, size, color, cubes) {
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

export function O_shape(x, size, color, cubes) {
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

export function T_shape(x, size, color, cubes) {
    let new_cube = {};
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
            new_cube = create_cube(x + i, 0, size, color);
            cubes.push(new_cube);
            if (i <= 60) {
                new_cube = create_cube(x + 60, i, size, color);
            }
        } else {
            new_cube = create_cube(x - i, 0, size, color);
            cubes.push(new_cube); 
            if (i <= 60) {
                new_cube = create_cube(x - 60, i, size, color);
            }
        }
        cubes.push(new_cube); 
    }
}

export function S_shape(x, size, color, cubes) {
    let new_cube = {};
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
            if (i == 0) {
                new_cube = create_cube(x, 60, size, color);
                cubes.push(new_cube); 
            } else if (i == 60) {
                new_cube = create_cube(x + i, 60, size, color);
                cubes.push(new_cube);
                new_cube = create_cube(x + i, 0, size, color);
                cubes.push(new_cube);
            } else {
                new_cube = create_cube(x + i, 0, size, color);
                cubes.push(new_cube);
            }
        } else {
            if (i == 0) {
                new_cube = create_cube(x, 0, size, color);
                cubes.push(new_cube); 
            } else if (i == 60) {
                new_cube = create_cube(x - i, 0, size, color);
                cubes.push(new_cube);
                new_cube = create_cube(x - i, 60, size, color);
                cubes.push(new_cube);
            } else {
                new_cube = create_cube(x - i, 60, size, color);
                cubes.push(new_cube);
            }
        }
    }
}

export function Z_shape(x, size, color, cubes) {
    let new_cube = {};
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
            if (i == 0) {
                new_cube = create_cube(x, 0, size, color);
                cubes.push(new_cube); 
            } else if (i == 60) {
                new_cube = create_cube(x + i, 0, size, color);
                cubes.push(new_cube);
                new_cube = create_cube(x + i, 60, size, color);
                cubes.push(new_cube);
            } else {
                new_cube = create_cube(x + i, 60, size, color);
                cubes.push(new_cube);
            }
        } else {
            if (i == 0) {
                new_cube = create_cube(x, 60, size, color);
                cubes.push(new_cube); 
            } else if (i == 60) {
                new_cube = create_cube(x - i, 60, size, color);
                cubes.push(new_cube);
                new_cube = create_cube(x - i, 0, size, color);
                cubes.push(new_cube);
            } else {
                new_cube = create_cube(x - i, 0, size, color);
                cubes.push(new_cube);
            }
        }
    }
}

export function L_shape(x, size, color, cubes) {
    let new_cube = {};
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
            new_cube = create_cube(x + i, 60, size, color);
            cubes.push(new_cube);
            if (i == 120) {
                new_cube = create_cube(x + i, 0, size, color);
                cubes.push(new_cube);
            } 
        } else {
            new_cube = create_cube(x - i, 60, size, color);
            cubes.push(new_cube);
            if (i == 120) {
                new_cube = create_cube(x, 0, size, color);
                cubes.push(new_cube);
            } 
        }  

    }
}

export function J_shape(x, size, color, cubes) {
    let new_cube = {};
    for (let i = 0; i <= 60*2; i += 60) {
        if (x + 60*2 <= 540) {
            new_cube = create_cube(x + i, 60, size, color);
            cubes.push(new_cube);
            if (i == 120) {
                new_cube = create_cube(x, 0, size, color);
                cubes.push(new_cube);
            } 
        } else {
            new_cube = create_cube(x - i, 60, size, color);
            cubes.push(new_cube);
            if (i == 120) {
                new_cube = create_cube(x - i, 0, size, color);
                cubes.push(new_cube);
            } 
        }  

    }
}