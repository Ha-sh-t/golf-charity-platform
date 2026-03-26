import User from "../models/User.js";

// set/update charity
export const setCharity = async (req, res) => {
  try {
    const { charity } = req.body;

    const user = await User.findById(req.user._id);

    user.charity = charity;

    await user.save();

    res.json({
      message: "Charity updated",
      charity: user.charity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get available charities (static list for now)
export const getCharities = (req, res) => {
  const charities = [
    "Education Fund",
    "Child Welfare",
    "Healthcare Support",
    "Environmental Care",
  ];

  res.json(charities);
};