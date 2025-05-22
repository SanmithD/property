import "dotenv/config";

const JWT = process.env.JWT_SECRET;

const contactController = async (io) => {
  io.on('connect', (socket) => {
    socket.on('user-message', (message) => {
      io.emit('admin-receive', message)
    });
    socket.on('admin-message',(message) =>{
      io.emit('user-receive', message)
    });
    socket.on('disconnect', ()=>{
      console.log('Disconnected', socket.id);
    })
  });
};

// const getAllOwnerMsg = async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(403).json({ success: false, message: "Unauthorized" });
//   }

//   try {
//     const { id } = jwt.verify(token, JWT);
//     const response = await contactModel.find({ ownerId: id }).populate("customerId").sort({ updatedAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "All conversations",
//       response
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const getAllUserMsg = async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(403).json({ success: false, message: "Unauthorized" });
//   }

//   try {
//     const { id } = jwt.verify(token, JWT);
//     const response = await contactModel.find({ customerId: id }).populate("ownerId").sort({ updatedAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "All conversations",
//       response
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const getMsg = async (req, res) => {
//   const { ownerId } = req.params;
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token || !ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
//     return res.status(400).json({ success: false, message: "Invalid data" });
//   }

//   try {
//     const { id: customerId } = jwt.verify(token, JWT);

//     const conversation = await contactModel.findOne({ ownerId, customerId });

//     if (!conversation) {
//       return res.status(404).json({ success: false, message: "No conversation found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Conversation found",
//       response: conversation.messages
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const getUserMsg = async (req, res) => {
//   const { id } = req.params;
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Invalid data" 
//     });
//   }

//   try {
//     const conversation = await contactModel.findById(id).populate('user');

//     if (!conversation) {
//       return res.status(404).json({ success: false, message: "No conversation found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Conversation found",
//       response: conversation.messages
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export {
  contactController
};

