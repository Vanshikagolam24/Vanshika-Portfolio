const fs = require('fs').promises;
const path = require('path');
const Message = require('../models/Message');

const messagesFile = path.join(__dirname, '..', 'messages.json');

const saveMessageToJson = async (payload) => {
  try {
    const raw = await fs.readFile(messagesFile, 'utf-8');
    const messages = JSON.parse(raw || '[]');
    messages.push({
      ...payload,
      createdAt: new Date().toISOString(),
    });
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(messagesFile, JSON.stringify([{
        ...payload,
        createdAt: new Date().toISOString(),
      }], null, 2), 'utf-8');
      return;
    }
    throw error;
  }
};

const saveMessage = async (payload) => {
  if (process.env.MONGO_URI) {
    const message = new Message(payload);
    return message.save();
  }

  return saveMessageToJson(payload);
};

module.exports = { saveMessage };
