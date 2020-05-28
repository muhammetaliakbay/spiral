export function random<T>(options: T[], rates: number[] = options.map(() => 1)): T {
    return options[randomIndex(options.map((opt, index) => rates[index]))];
}

export function randomIndex(rates: number[]): number {
    const min = Math.min(...rates);
    const shift = min < 0 ? -min : 0;
    rates = rates.map(rate => (typeof (rate as any) === 'number') ? rate + shift : 0);
    const total = rates.reduce((previousValue, currentValue) => currentValue + previousValue, 0);
    let cumulative = 0;
    const areas = rates.map(rate => {cumulative += rate; return cumulative / total;});

    const random = Math.random();
    for (let i = 0; i < rates.length; i++) {
        const area = areas[i];
        if (random <= area) {

            return i;
        }
    }

    return rates.length - 1;
}
