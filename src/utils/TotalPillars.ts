// TotalScoreResult.ts
export class TotalScoreResult {
  pillar: string;
  totalScore: number;

  constructor(pillar: string, totalScore: number) {
    this.pillar = pillar;
    this.totalScore = totalScore;
  }
}