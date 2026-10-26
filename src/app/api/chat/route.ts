// app/api/chat/route.ts
import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { getRelevantFaqContext } from '@/lib/vector-search';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1];
    const latestText = latestMessage?.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('\n') || latestMessage?.content || '';

    // Fetch grounded context from Pinecone
    const context = await getRelevantFaqContext(latestText);

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
        model: google('gemini-3.6-flash' as any),
        system: `You are the AI Barista & Customer Concierge for our coffee brand.
Use the following official knowledge base to assist the customer accurately:
---
${context || 'No specific FAQ entries matched. Answer generally or refer to support.'}
---
Guidelines:
- Match bean recommendations to user brew methods and tasting preferences.
- If unsure about specific personal order details, instruct them to contact support@coffeebrand.com.
- Keep tone warm, concise, and professional.`,
        messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
}