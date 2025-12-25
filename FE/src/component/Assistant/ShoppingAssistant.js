import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { chatWithShoppingAssistant } from '../../services/userService';
import './ShoppingAssistant.scss';

const INTRO_MESSAGE = 'Xin chào! Mình là trợ lý AI của Quang Bùi, luôn sẵn sàng gợi ý outfit phù hợp với nhu cầu của bạn.';
const QUICK_QUESTIONS = [
    'Gợi ý set đồ công sở nữ size M',
    'Mix đồ dạo phố cuối tuần',
    'Có ưu đãi nào cho đơn trên 1 triệu không?'
];

const mapHistoryForAPI = (history) => {
    return history
        .filter((item) => item.sender !== 'system')
        .map((item) => ({
            role: item.sender === 'assistant' ? 'assistant' : 'user',
            content: item.text
        }))
        .slice(-6);
};

const ShoppingAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 'intro', sender: 'assistant', text: INTRO_MESSAGE }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (isOpen && messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSend = async (event) => {
        if (event) {
            event.preventDefault();
        }
        const text = inputValue.trim();
        if (!text || isThinking) {
            return;
        }

        const userMessage = { id: Date.now().toString(), sender: 'user', text };
        const nextMessages = [...messages, userMessage];
        setMessages(nextMessages);
        setInputValue('');
        setIsThinking(true);

        try {
            const response = await chatWithShoppingAssistant({
                message: text,
                history: mapHistoryForAPI(nextMessages)
            });

            if (response?.errCode === 0) {
                const reply = response?.data?.reply || 'Mình đang cập nhật dữ liệu, bạn quay lại sau nhé!';
                setMessages((prev) => [
                    ...prev,
                    { id: `assistant-${Date.now()}`, sender: 'assistant', text: reply }
                ]);
            } else {
                throw new Error(response?.errMessage || 'Unknown error');
            }
        } catch (error) {
            console.error('Assistant chat failed: ', error);
            toast.error('Không thể kết nối trợ lý AI. Vui lòng thử lại.');
            setMessages((prev) => [
                ...prev,
                {
                    id: `assistant-${Date.now()}`,
                    sender: 'assistant',
                    text: 'Xin lỗi, mình đang gặp chút sự cố. Bạn thử lại sau nhé!'
                }
            ]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const handleQuickQuestion = (question) => {
        setInputValue(question);
    };

    return (
        <div className={`assistant-widget ${isOpen ? 'assistant-widget--open' : ''}`}>
            <button
                type="button"
                className="assistant-widget__toggle"
                onClick={handleToggle}
                aria-label="Mở trợ lý mua sắm"
            >
                {isOpen ? 'Đóng tư vấn' : 'Trợ lý AI'}
            </button>
            {isOpen && (
                <div className="assistant-widget__panel">
                    <div className="assistant-widget__header">
                        <div>
                            <p className="assistant-widget__title">AI stylist</p>
                            <p className="assistant-widget__status">Đang trực 24/7</p>
                        </div>
                        <span className="assistant-widget__badge">Beta</span>
                    </div>
                    <div className="assistant-widget__quick">
                        {QUICK_QUESTIONS.map((question) => (
                            <button
                                type="button"
                                key={question}
                                onClick={() => handleQuickQuestion(question)}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                    <div className="assistant-widget__messages">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`assistant-widget__bubble assistant-widget__bubble--${message.sender}`}
                            >
                                {message.text}
                            </div>
                        ))}
                        {isThinking && (
                            <div className="assistant-widget__typing">
                                <span />
                                <span />
                                <span />
                            </div>
                        )}
                        <div ref={messageEndRef} />
                    </div>
                    <form className="assistant-widget__composer" onSubmit={handleSend}>
                        <textarea
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Mô tả nhu cầu: dịp, phong cách, ngân sách..."
                            rows={2}
                        />
                        <button type="submit" disabled={isThinking}>
                            {isThinking ? 'Đang gợi ý...' : 'Gửi'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ShoppingAssistant;
