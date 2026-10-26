// lib/pinecone.ts
import { Pinecone, type Index } from '@pinecone-database/pinecone';

let _pinecone: Pinecone | null = null;

export function getPineconeClient(): Pinecone | null {
    if (!process.env.PINECONE_API_KEY) {
        return null;
    }
    if (!_pinecone) {
        _pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });
    }
    return _pinecone;
}

export function getFaqIndex(): Index | null {
    const client = getPineconeClient();
    if (!client) return null;
    return client.index(process.env.PINECONE_INDEX_NAME || 'coffee-faq');
}

// Proxies keep backward compatibility without throwing during Next.js build evaluation
export const pinecone = new Proxy({} as Pinecone, {
    get(_target, prop) {
        const client = getPineconeClient();
        if (!client) {
            throw new Error('PINECONE_API_KEY is missing in environment variables.');
        }
        const val = Reflect.get(client, prop);
        return typeof val === 'function' ? val.bind(client) : val;
    },
});

export const faqIndex = new Proxy({} as Index, {
    get(_target, prop) {
        const index = getFaqIndex();
        if (!index) {
            throw new Error('PINECONE_API_KEY is missing in environment variables.');
        }
        const val = Reflect.get(index, prop);
        return typeof val === 'function' ? val.bind(index) : val;
    },
});