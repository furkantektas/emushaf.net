export type Cuz = {
    number: number;
    start: number;
    end: number;
}


function createCuz(cuzNumber: number): Cuz {
    return {
        number: cuzNumber,
        start: (cuzNumber - 1) * 20 + (cuzNumber === 1 ? 0 : 1),
        end: cuzNumber * 20 + (cuzNumber === 30 ? 4 : 0),
    };
}

export { createCuz };