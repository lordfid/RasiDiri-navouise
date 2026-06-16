/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type QuestionKind = "singleChoice" | "forcedChoice";

export interface ScoreWeight {
  cognitive?: {
    Ni?: number;
    Ne?: number;
    Si?: number;
    Se?: number;
    Fi?: number;
    Fe?: number;
    Ti?: number;
    Te?: number;
  };
  mbtiAxis?: {
    I?: number;
    E?: number;
    S?: number;
    N?: number;
    T?: number;
    F?: number;
    J?: number;
    P?: number;
  };
  mbtiTypeSupport?: Record<string, number>; // e.g., INFJ: 0.5, ESTP: -0.3
  enneagram?: {
    "1"?: number;
    "2"?: number;
    "3"?: number;
    "4"?: number;
    "5"?: number;
    "6"?: number;
    "7"?: number;
    "8"?: number;
    "9"?: number;
  };
  wing?: Record<string, number>; // e.g., "4w5": 0.8, "5w6": -0.2
  instinct?: {
    sp?: number;
    sx?: number;
    so?: number;
  };
  bigFive?: {
    openness?: number;
    conscientiousness?: number;
    extraversion?: number;
    agreeableness?: number;
    neuroticism?: number;
  };
  hexaco?: {
    honestyHumility?: number;
    emotionality?: number;
    extraversion?: number;
    agreeableness?: number;
    conscientiousness?: number;
    openness?: number;
  };
  attitudinalPsyche?: {
    L?: Record<"confident" | "flexible" | "insecure" | "indifferent", number>;
    E?: Record<"confident" | "flexible" | "insecure" | "indifferent", number>;
    F?: Record<"confident" | "flexible" | "insecure" | "indifferent", number>;
    V?: Record<"confident" | "flexible" | "insecure" | "indifferent", number>;
  };
  disc?: {
    D?: number;
    I?: number;
    S?: number;
    C?: number;
  };
  riasec?: {
    Realistic?: number;
    Investigative?: number;
    Artistic?: number;
    Social?: number;
    Enterprising?: number;
    Conventional?: number;
  };
  moral?: {
    idealist?: number;
    altruist?: number;
    pragmatist?: number;
    ruleBased?: number;
    libertarian?: number;
  };
  decision?: {
    riskAware?: number;
    fastAction?: number;
    analytical?: number;
    valueBased?: number;
    consensus?: number;
  };
  conflict?: {
    competitive?: number;
    collaborative?: number;
    compromising?: number;
    avoiding?: number;
    accommodating?: number;
  };
  communication?: {
    direct?: number;
    diplomatic?: number;
    expressive?: number;
    analytical?: number;
  };
  relationship?: {
    secureLeaning?: number;
    anxiousLeaning?: number;
    avoidantLeaning?: number;
    fearfulLeaning?: number;
  };
  stress?: {
    hypervigilant?: number;
    freeze?: number;
    flight?: number;
    fight?: number;
    fawn?: number;
  };
  defense?: {
    rationalization?: number;
    projection?: number;
    repression?: number;
    sublimation?: number;
    denial?: number;
  };
  coreFear?: Record<string, number>; // e.g., vulnerability, uselessness, etc.
  coreDesire?: Record<string, number>; // e.g., peace, impact, etc.
  values?: Record<string, number>; // e.g., security, autonomy, etc.
  work?: {
    planner?: number;
    executor?: number;
    innovator?: number;
    caretaker?: number;
  };
  learning?: {
    visual?: number;
    verbal?: number;
    structured?: number;
    projectBased?: number;
  };
  idealPartner?: Record<string, number>; // stable, creative, intellectual, passionate
  loveStyle?: Record<string, number>; // qualityTime, wordsOfAffirmation, physicalTouch, actsOfService, receivingGifts, emotionalDepth
  environment?: Record<string, number>; // cozySpace, workspace, nature, interactive

  // Evidence tracking, positive, negative signals
  evidence?: Record<string, number>;
  positive?: Record<string, number>;
  negative?: Record<string, number>;
  reliability?: number;
}

export interface QuestionOption {
  id: string; // e.g., "a", "b", "c"
  text: string;
  subtleMeaning: string;
  weights: ScoreWeight;
}

export interface QuestionItem {
  id: string;
  kind: QuestionKind;
  domain: string; // e.g. "cognitive", "money", "relationship", "work", "stress", etc.
  prompt: string;
  instruction?: string;
  options: QuestionOption[];
  reliability: number; // Item-level reliability multiplier (e.g., 0.85)
  targetSystems: string[];
}

export interface RawScores {
  cognitive: Record<string, number>;
  mbtiAxis: Record<string, number>;
  mbtiTypeSupport: Record<string, number>;
  enneagram: Record<string, number>;
  wing: Record<string, number>;
  instinct: Record<string, number>;
  bigFive: Record<string, number>;
  hexaco: Record<string, number>;
  attitudinalPsyche: Record<string, Record<string, number>>;
  disc: Record<string, number>;
  riasec: Record<string, number>;
  moral: Record<string, number>;
  decision: Record<string, number>;
  conflict: Record<string, number>;
  communication: Record<string, number>;
  relationship: Record<string, number>;
  stress: Record<string, number>;
  defense: Record<string, number>;
  coreFear: Record<string, number>;
  coreDesire: Record<string, number>;
  values: Record<string, number>;
  work: Record<string, number>;
  learning: Record<string, number>;
  idealPartner: Record<string, number>;
  loveStyle: Record<string, number>;
  environment: Record<string, number>;
  evidence: Record<string, number>;
  positive: Record<string, number>;
  negative: Record<string, number>;
}

// Normalized scores (typically scaled to 0-100%)
export interface FinalQuizResult {
  top3Mbti: Array<{ type: string; score: number }>;
  cognitiveRanking: Array<{ name: string; score: number }>;
  mbtiStack: {
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
    opposing: string;
    critical: string;
    trickster: string;
    demon: string;
  };
  mbtiDichotomy: {
    I_E: number; // e.g. 65 means 65% Introvert, 35% Extrovert
    S_N: number; // e.g. 40 means 40% Sensing, 60% Intuitive
    T_F: number; // E.g. T vs F percentage
    J_P: number; // E.g. J vs P percentage
  };
  bigFive: Array<{ trait: string; score: number }>;
  hexaco: Array<{ trait: string; score: number }>;
  enneagram: {
    primaryType: string;
    score: number;
    wing: string;
    instinctualStack: string; // e.g. "sp/sx"
    tritype: string; // e.g. "459"
  };
  socionicsEstimate: string; // e.g., "IEI" or "ILI"
  quadraTendency: string; // "Alpha" | "Beta" | "Gamma" | "Delta"
  temperament: {
    primary: string;
    secondary: string;
    scorePrimary: number;
  };
  attitudinalPsyche: Record<string, string>; // e.g. "VLFE", "ELVF"
  disc: Array<{ style: string; score: number }>;
  riasec: Array<{ interest: string; score: number }>;
  moralStyle: string;
  decisionStyle: string;
  conflictStyle: string;
  communicationStyle: string;
  relationshipTendency: string;
  stressResponse: string;
  defensePattern: string;
  coreFear: string;
  coreDesire: string;
  valuesRanking: string[];
  workStyle: string;
  learningStyle: string;
  idealPartnerTendency: string;
  preferredLoveStyle: string;
  preferredEnvironment: string;
  confidence: {
    score: number; // 0 - 100
    category: "lemah" | "sedang" | "cukup kuat" | "kuat" | "sangat kuat";
    notes: string[];
  };
  rawScores?: RawScores;
}
