export interface ScoringManager {
    addScore(points: number): void;
    getScore(): number;
}
