/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from "../types";
import { questionItemsCore } from "./questionItemsCore";
import { questionItemsLifePreference } from "./questionItemsLifePreference";
import { questionItemsRelationship } from "./questionItemsRelationship";
import { questionItemsSocialPressure } from "./questionItemsSocialPressure";
import { questionItemsWorkLearning } from "./questionItemsWorkLearning";
import { questionItemsMoralStress } from "./questionItemsMoralStress";
import { questionItemsTieBreak } from "./questionItemsTieBreak";

export const MASTER_QUESTIONS: QuestionItem[] = [
  ...questionItemsCore,             // 001 - 010 (10)
  ...questionItemsLifePreference,   // 011 - 020 (10)
  ...questionItemsRelationship,     // 021 - 030 (10)
  ...questionItemsSocialPressure,   // 031 - 040 (10)
  ...questionItemsWorkLearning,     // 041 - 050 (10)
  ...questionItemsMoralStress       // 051 - 060 (10)
];

export const TIE_BREAKER_QUESTIONS: QuestionItem[] = [
  ...questionItemsTieBreak          // 061 - 070 (10)
];

export const ALL_QUESTIONS_CATALOG: QuestionItem[] = [
  ...MASTER_QUESTIONS,
  ...TIE_BREAKER_QUESTIONS
];
