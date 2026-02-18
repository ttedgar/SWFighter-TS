export class VectorMath {
    public static aimVector(
        fromV: number,
        fromH: number,
        toV: number,
        toH: number,
        targetSpeed: number = 10
    ): [number, number] {
        const dv = fromV - toV;
        const dh = fromH - toH;
        const sum = Math.abs(dv) + Math.abs(dh);

        const verticalVelocity = dv < 0
            ? (Math.abs(dv) / sum) * -targetSpeed
            : (Math.abs(dv) / sum) * targetSpeed;

        const horizontalVelocity = dh < 0
            ? (Math.abs(dh) / sum) * -targetSpeed
            : (Math.abs(dh) / sum) * targetSpeed;

        return [verticalVelocity, horizontalVelocity];
    }
}
