import {Spiral} from '../spiral';
import {randomSpiral} from './generate';
import {random} from '../util/random';
import {crossSpirals} from './cross';
import {fitness as calculateFitness, live} from './fitness';
import {mutateSpiral} from './mutate';

export interface Target {
    inputs: number[];
    expectedOutputs: number[];
}

export interface TargetFunction {
    (): Target;
}

interface Spice {
    spiral: Spiral;
    fitness: number;
    success: number;
    random: number;
}

export class Nature {
    spirals: Spiral[] = [];
    readonly calculations = 100;
    readonly targetFunctions: TargetFunction[] = [];
    // maxFitness: number = 0;
    maxSuccess: number = 0;
    constructor(readonly targetFunction: TargetFunction) {
        for (let i = 0; i < this.calculations; i++) {
            this.targetFunctions[i] = this.targetFunction;
        }
    }
    generation(crossSpices: number, newSpices: number, mutants: number, aliveSpices: number, maxAge: number): number {
        const previousSpirals = this.spirals.slice();
        const alives = this.spirals.slice();

        if (alives.length > 0) {
            for (const alive of alives) {
                for (let i = 0; i < mutants; i ++) {
                    const mutant = mutateSpiral(alive);
                    this.spirals.push(mutant);
                }
            }

            for (let i = 0; i < crossSpices; i++) {
                const mother = random(alives);
                const father = random(alives);
                const child = crossSpirals(mother, father);
                this.spirals.push(child);
            }
        }

        for (let i = 0; i < newSpices; i++) {
            this.spirals.push(randomSpiral());
        }

        this.spirals = this.spirals.filter((spiral, index, spirals) =>
            index === spirals.findIndex(spiralTest => spiral.equals(spiralTest))
        );

        const spices: Spice[] = [];
        for (const spiral of this.spirals) {
            let totalFitness = 0;
            let totalStack = 0;
            let totalAge = 0;

            for (let i = 0; i < this.calculations; i++) {
                const target = this.targetFunctions[i]();

                const score = live(spiral, target.inputs, target.expectedOutputs.length, maxAge);
                const output = score.output;
                const fitness = calculateFitness(output, target.expectedOutputs);
                totalFitness += fitness;
                totalStack += score.maxStack;
                totalAge += score.age;
            }
            const averageFitness = totalFitness / this.calculations;
            const averageStack = totalStack / this.calculations;
            const averageAge = totalAge / this.calculations;

            const success = averageFitness - (spiral.codeLength/10000) - (averageStack/10000) - (averageAge/(maxAge*100));

            spices.push({
                spiral,
                fitness: averageFitness,
                success,
                random: Math.random()
            });
        }

        const sortedSuccessSpices = spices.sort((a, b) => b.success - a.success); // sorted by fitness in descending order
        const sortedFitnessSpices = spices.sort((a, b) => b.fitness - a.fitness); // sorted by fitness in descending order

        const currentMaxFitness = sortedFitnessSpices[0].fitness;

        const currentMaxSuccess = sortedSuccessSpices[0].success;
        if (currentMaxSuccess >= this.maxSuccess) {
            const winnerSpices = sortedSuccessSpices.slice(0, aliveSpices*0.8);
            const shuffledSpices = spices.filter(spice => !winnerSpices.includes(spice)).sort((a, b) => b.random - a.random);
            const luckySpices = shuffledSpices.slice(0, aliveSpices*0.2);
            this.spirals = [
                ...winnerSpices.map(spice => spice.spiral),
                ...luckySpices.map(spice => spice.spiral)
            ];
            this.maxSuccess = currentMaxSuccess;
        } else {
            this.spirals = previousSpirals;
        }

        return currentMaxFitness;
    }
}
