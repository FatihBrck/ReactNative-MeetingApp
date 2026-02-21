const meetingNotificationToken = require('../model/meetingNotificationToken')
const { Expo } = require("expo-server-sdk")

const expo = new Expo();

const saveToken = async (req, res) => {
    try {
        const userid = req.user._id;

        await meetingNotificationToken.updateOne(
            { userid: userid },
            { $addToSet: { token: req.body.token } },
            { upsert: true }
        );

        return res.status(200).json({ message: "Ok" });
    } catch (error) {
        return res.status(500).json({ message: 'Sunucu hatası' });
    }
};

const pushToken = async (req, res) => {
  try {
    const { _id, title, body, metadata } = req.body;

    let users = [];

    if (typeof _id === 'string') {
      const user = await meetingNotificationToken.findOne({ userid: _id });
      if (!user) return res.status(404).json({ message: 'User not found' });
      users.push(user);
    } else if (Array.isArray(_id)) {
      users = await meetingNotificationToken.find({ userid: { $in: _id } });
      if (users.length === 0) return res.status(404).json({ message: 'Users not found' });
    }

    const messages = [];

    users.forEach(user => {
      const tokens = user.token || [];
      tokens.forEach(token => {
        if (!Expo.isExpoPushToken(token)) return;
        messages.push({
          to: token,
          sound: 'default',
          title,
          body,
          data: metadata || {},
        });
      });
    });

    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
    }

    return res.status(200).json({ message: 'Bildirimler gönderildi' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
};




module.exports = {
    saveToken,
    pushToken,
};