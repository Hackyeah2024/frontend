import { Video } from "../api/";

export function calculateVideoQuality(video: Video): number {
  const { analysis, subtitles_matching } = video;
  const { quality_metrics } = analysis;

  const weights = {
    clarityCoherence: 0.25,
    grammarSyntax: 0.15,
    relevanceToSubject: 0.2,
    structureOrganization: 0.1,
    vocabularyRichness: 0.1,
    subtitlesSimilarity: 0.2,
  };

  // Calculate individual scores
  const clarityCoherenceScore = quality_metrics.clarity_coherence.score;
  const grammarSyntaxScore = quality_metrics.grammar_syntax.score;
  const relevanceToSubjectScore = quality_metrics.relevance_to_subject.score;
  const structureOrganizationScore =
    quality_metrics.structure_organization.score;
  const vocabularyRichnessScore = quality_metrics.vocabulary_richness.score;

  const adjustedSubtitlesSimilarity =
    subtitles_matching.subtitles_similarity / 10;

  // Calculate weighted sum
  const weightedSum =
    weights.clarityCoherence * clarityCoherenceScore +
    weights.grammarSyntax * grammarSyntaxScore +
    weights.relevanceToSubject * relevanceToSubjectScore +
    weights.structureOrganization * structureOrganizationScore +
    weights.vocabularyRichness * vocabularyRichnessScore +
    weights.subtitlesSimilarity * adjustedSubtitlesSimilarity;

  let scaledScore = Math.min(Math.max(weightedSum * 9, 0), 9) + 1;

  const issuesDetected = quality_metrics.issues_detected.reduce(
    (total, issues) => total + issues.length,
    0
  );

  const issuesPenalty = Math.min(issuesDetected * 0.5, 3);
  scaledScore = Math.max(scaledScore - issuesPenalty, 1);

  return Number(scaledScore.toFixed(1));
}
