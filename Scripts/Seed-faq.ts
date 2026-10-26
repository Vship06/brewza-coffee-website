import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { embedMany } from 'ai';
import { google } from '@ai-sdk/google';

const coffeeKnowledgeBase = [
    {
        id: 'brand-story',
        text: 'Brewza Coffee Roasters: Our Story. Rooted in Craft. Every great cup begins with an unwavering commitment to quality. At Brewza Coffee Roasters, we approach roasting not just as a science, but as an art form. Our process is deliberate, focusing on bringing out the unique characteristics of each origin. We source meticulously, roast precisely, and cup obsessively.',
        category: 'brand',
    },
    {
        id: 'brand-sourcing',
        text: 'Brewza Coffee Roasters: Sustainable Sourcing. We believe that great coffee shouldn\'t come at the expense of the environment or the people who grow it. That\'s why we partner directly with farmers who share our commitment to sustainable agriculture and fair labor practices. From the cloud forests of Colombia to the volcanic slopes of Guatemala, every bean we roast is traceable, ethically sourced, and responsibly grown.',
        category: 'brand',
    },
    {
        id: 'product-ethiopia',
        text: 'Ethiopia Yirgacheffe: A delicate, floral profile with bright acidity. Cultivated at 2,000m-2,200m in Yirgacheffe, Ethiopia. Washed process, Light roast. Expect vibrant notes of jasmine, bergamot, and a sweet honeysuckle finish. Best brewed as Pour Over. Price: $24.',
        category: 'product',
    },
    {
        id: 'product-guatemala',
        text: 'Guatemala Antigua: Rich, full-bodied, and deeply satisfying. Grown at 1,500m-1,700m in Antigua, Guatemala. Washed process, Medium roast. Deep, dark cocoa sweetness with hints of roasted pecan and mild apple-like acidity. Best brewed as Espresso or French Press. Price: $22.',
        category: 'product',
    },
    {
        id: 'product-kenya',
        text: 'Kenya AA Reserve: Vibrant and juicy with a syrupy mouthfeel. Grown at 1,700m-1,900m in Nyeri, Kenya. Fully washed process, Medium roast. Intense, wine-like acidity and profound dark berry notes of blackberry and blackcurrant. Best brewed as Aeropress or Pour Over. Price: $28.',
        category: 'product',
    },
    {
        id: 'product-colombia',
        text: 'Colombia Supremo: Smooth, comforting, and perfectly balanced. Grown at 1,400m-1,800m in Huila, Colombia. Washed process, Medium roast. Syrupy sweet body with rich notes of golden caramel, toasted almonds, and pleasant citrus finish. Best brewed as Drip or Espresso. Price: $20.',
        category: 'product',
    },
    {
        id: 'product-sumatra',
        text: 'Sumatra Mandheling: A deep, earthy, and immensely full-bodied cup. Grown at 900m-1,600m in Sumatra, Indonesia. Wet-Hulled process, Dark roast. Savory characteristics with complex notes of dark chocolate, cedar, and a sweet herbaceous finish. Best brewed as French Press. Price: $25.',
        category: 'product',
    },
    {
        id: 'faq-shipping',
        text: 'Shipping and roast freshness: All whole bean orders are roasted to order and shipped within 48 hours. Orders take 2-4 business days to arrive.',
        category: 'policy',
    },
    {
        id: 'faq-returns',
        text: 'Return and subscription policy: Coffee beans are perishable and non-returnable. Subscriptions can be paused, skipped, or cancelled anytime in your account dashboard.',
        category: 'policy',
    },
    {
        id: 'faq-grind',
        text: 'Grind size recommendations: Coarse for French Press & Cold Brew; Medium for Drip/V60/Aeropress; Fine for Espresso; Extra fine for Turkish coffee.',
        category: 'brewing',
    }
];

async function seed() {
    console.log('Generating embeddings with Google gemini-embedding-001...');
    const { embeddings } = await embedMany({
        model: google.textEmbeddingModel('gemini-embedding-001' as any),
        values: coffeeKnowledgeBase.map((item) => item.text),
    });

    const records = coffeeKnowledgeBase.map((item, idx) => ({
        id: item.id,
        values: embeddings[idx] as number[],
        metadata: {
            text: item.text,
            category: item.category,
        },
    }));

    console.log(`Upserting ${records.length} records to Pinecone...`);
    const { faqIndex } = await import('../lib/pinecone');
    await faqIndex.upsert({ records });
    console.log('Seeding complete!');
}

seed().catch(console.error);