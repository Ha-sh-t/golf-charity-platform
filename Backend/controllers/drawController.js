import User from "../models/User.js";

// generate 5 random numbers (1–45)
const generateDraw = () => {
  const numbers = new Set();

  while (numbers.size < 5) {
    const num = Math.floor(Math.random() * 45) + 1;
    numbers.add(num);
  }

  return Array.from(numbers);
};

export const runDraw = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const userScores = user.scores.map((s) => s.value);

    const drawNumbers = generateDraw();

    // count matches
    const matches = userScores.filter((score) =>
      drawNumbers.includes(score)
    );

    res.json({
      drawNumbers,
      userScores,
      matchCount: matches.length,
      matches,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};