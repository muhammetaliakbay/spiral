import {Nature} from '../evolution/nature';

const nature = new Nature(
    () => {
        const inputs = [Math.random()*10, Math.random()*10, Math.random()*10];
        return {
            inputs: inputs,
            expectedOutputs: [inputs[0] * inputs[1] * inputs[2] + 10]
        };
    }
);

for(let gen = 0; true; gen++) {
    const fitness = nature.generation(
        200,
        100,
        25,
        25,
        100
    );
    console.log(`generation: ${gen} \t fitness: ${fitness}`);
    if (fitness > 0.9) {
        const spiral = nature.spirals[0];
        console.log(`spiral: ${spiral.toString()}`);
    }
}
