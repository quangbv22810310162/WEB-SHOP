import fetch from 'node-fetch';
require('dotenv').config();

const DEFAULT_MODEL = process.env.OPENAI_ASSISTANT_MODEL || 'gpt-4o-mini';
const DEFAULT_MAX_TOKENS = Number(process.env.OPENAI_ASSISTANT_MAX_TOKENS || 600);
const BASE_URL = process.env.OPENAI_ASSISTANT_BASE_URL || 'https://api.openai.com/v1/chat/completions';
const SYSTEM_PROMPT = `Bạn là stylist AI của cửa hàng thời trang Sondz. Hãy tư vấn trang phục, gợi ý size, phối đồ và ưu đãi hiện có dựa trên dữ liệu khách hàng cung cấp. Luôn trả lời ngắn gọn bằng tiếng Việt và đề xuất tối đa 3 sản phẩm trong một lần phản hồi.`;

const sanitizeHistory = (history = []) => {
    if (!Array.isArray(history)) {
        return [];
    }
    return history
        .filter((item) => typeof item === 'object' && item !== null && item.content)
        .map((item) => ({
            role: item.role === 'assistant' ? 'assistant' : 'user',
            content: item.content.toString().slice(0, 1500)
        }))
        .slice(-8);
};

let chatWithAssistant = async (payload = {}) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!payload.message) {
        return {
            errCode: 1,
            errMessage: 'Missing message'
        };
    }
    if (!apiKey) {
        return {
            errCode: 2,
            errMessage: 'OPENAI_API_KEY is not configured on the server'
        };
    }

    const history = sanitizeHistory(payload.history);
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: payload.message.toString().slice(0, 2000) }
    ];

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: payload.model || DEFAULT_MODEL,
                messages,
                temperature: typeof payload.temperature === 'number' ? payload.temperature : 0.4,
                max_tokens: DEFAULT_MAX_TOKENS,
                top_p: 0.95
            })
        });

        if (!response.ok) {
            const errorDetail = await response.text();
            console.error('Assistant API error:', errorDetail);
            return {
                errCode: 3,
                errMessage: 'Assistant provider returned an error'
            };
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (!reply) {
            return {
                errCode: 4,
                errMessage: 'Assistant did not return any content'
            };
        }

        return {
            errCode: 0,
            data: {
                reply,
                usage: data?.usage || null
            }
        };
    } catch (error) {
        console.error('Assistant service failed:', error);
        return {
            errCode: -1,
            errMessage: 'Unable to reach assistant service'
        };
    }
};

module.exports = {
    chatWithAssistant
};
