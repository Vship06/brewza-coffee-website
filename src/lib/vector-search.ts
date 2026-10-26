import { embed } from 'ai';
import { google } from '@ai-sdk/google';
import { getFaqIndex } from '../../lib/pinecone';

export async function getRelevantFaqContext(query: string) {
    if (!query) return '';

    try {
        const index = getFaqIndex();
        if (!index) {
            console.warn('PINECONE_API_KEY is not set. Skipping vector FAQ retrieval.');
            return '';
        }

        const { embedding } = await embed({
            model: google.textEmbeddingModel('gemini-embedding-001' as any),
            value: query,
        });

        const queryResponse = await index.query({
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
