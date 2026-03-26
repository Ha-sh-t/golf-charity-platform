import User from "../models/User.js";

// add score
export const addScore = async (req, res) => {
    try {
        const { value } = req.body;

        if (value < 1 || value > 45) {
            return res.status(400).json({ message: "Score must be between 1 and 45" });
        }

        const user = await User.findById(req.user._id);

        // add new score
        user.scores.push({
            value,
            date: new Date(),
        });

        // keep only last 5 scores
        if (user.scores.length > 5) {
            user.scores.shift(); // removes oldest
        }

        await user.save();

        const sortedScores = user.scores.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        res.json(sortedScores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteScore = async (req, res) => {
  const { index } = req.params;

  const user = await User.findById(req.user._id);

  user.scores.splice(index, 1);

  await user.save();

  res.json(user.scores);
};