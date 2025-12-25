import assistantService from '../services/assistantService';

let chatWithAssistant = async (req, res) => {
    try {
        let data = await assistantService.chatWithAssistant(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

module.exports = {
    chatWithAssistant
};
