import { embed } from 'ai';
import { google } from '@ai-sdk/google';
import { faqIndex } from '../../lib/pinecone';

export async function getRelevantFaqContext(query: string) {
    if (!query) return '';

    try {
        const { embedding } = await embed({
            model: google.textEmbeddingModel('gemini-embedding-001' as any),
            value: query,
        });

        const queryResponse = await faqIndex.query({
            vector: embedding as number[],
            topK: 3,
            includeMetadata: true,
        });

        const contexts = queryResponse.matches
            ?.map((match) => match.metadata?.text as string)
            .filter(Boolean) || [];

        return contexts.join('\n\n');
    } catch (error) {
        console.error('Error fetching context from Pinecone:', error);
        return '';
    }
}
