import emailService from '../services/emailService';
import ContactMessage from '../models/ContactMessage';

let sendContactFormEmail = async (req, res) => {
    try {
        let data = await emailService.sendContactEmail(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
    
};

let sendNewsletterEmail = async (req, res) => {
    try {
        let data = await emailService.sendNewsletterEmail(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
};

module.exports = {
    sendContactFormEmail,
    sendNewsletterEmail
};
