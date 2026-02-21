const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const meetingUser = require('../model/meetingUser');

const JWT_SECRET = "hvday6ert72839289@aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";
const JWT_SECRET_REFRESH = "hvd321434ay6ert728da232139289@aiyg8t87qt72393293883dsa32213dsauhefiuh78ttq3ifi78272jdsds039[324ewqc]]pou89ywe";


const getMeetingUser = async (req, res) => {
  try {
    let users = await meetingUser.find({}, '_id userName');

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};


const autMeetingUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await meetingUser.findOne({ userName });
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Parola hatalı' });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ _id: user._id }, JWT_SECRET_REFRESH, { expiresIn: '7d' });

    return res.status(201).json({ token, refreshToken });

  } catch (err) {
    console.error('autMeetingUser:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const {refreshToken} = req.body;

    if (!refreshToken) { return res.status(404).json({ message: ' ' } ); }
    const decode = jwt.verify(refreshToken, JWT_SECRET_REFRESH);
    if (!decode._id) return res.status(400).json({message:'Refresh token empty'});
    const newAccessToken = jwt.sign({ _id: decode._id }, JWT_SECRET, { expiresIn: '1m' });
    res.status(200).json({token: newAccessToken});
  } catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası' });
  }

}

const createMeetingUser = async (req, res) => {

  try {
    const { userName, email, password, role } = req.body;

    const crypted = await bcrypt.hash(password, 10);

    await meetingUser.create({
      userName: userName,
      email: email,
      password: crypted,
      role: role,
    });


    res.status(201).json({ status: 201 });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};


const userData = async (req, res) => {
  try {
    const _id = req.user._id
    const data = await meetingUser.findById({ _id: _id }, { _id: 1, userName: 1, role: 1 })

    if (!data) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

    return res.status(200).json(data);

  } catch (err) {
    console.error('userData:', err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const userQuit = async (req, res) => {
  try {
    const _id = req.user._id;
    refreshTokens.deleteOne({ userid: _id })
    return res.status(200).json({ message: 'Log out!' })

  } catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası' });
  }

}

// app tarafında useractions a git quit için fonksiyon yaz refresh tokeni silsin çıkış yaparken
// sonra geri ekler onun üzerinden access token alırız
module.exports = {
  getMeetingUser,
  createMeetingUser,
  autMeetingUser,
  userData,
  userQuit,
  refreshAccessToken,
};