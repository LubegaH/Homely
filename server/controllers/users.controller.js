import User from '../models/User.models.js';

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserCollaborators = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const collaborators = await Promise.all(
      user.collaborators.map((id) => User.findById(id))
    );
    const formattedCollaborators = collaborators.map(
      ({ _id, firstName, lastName, email, picturePath }) => {
        return { _id, firstName, lastName, email, picturePath };
      }
    );

    res.status(200).json(formattedCollaborators);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveCollaborator = async (req, res) => {
  try {
    const { id, collaboratorId } = req.params;
    const user = await User.findById(id);
    const collaborator = await User.findById(collaboratorId);

    if (user.collaborators.includes(collaboratorId)) {
      user.collaborators = user.collaborators.filter(
        (id) => id !== collaboratorId
      );
      collaborator.collaborators = collaborator.collaborators.filter(
        (id) => id !== id
      );
    } else {
      user.collaborators.push(collaboratorId);
      collaborator.collaborators.push(id);
    }
    await user.save();
    await collaborator.save();

    const formattedCollaborators = user.collaborators.map(
      ({ _id, firstName, lastName, email, picturePath }) => {
        return { _id, firstName, lastName, email, picturePath };
      }
    );
    res.status(200).json(formattedCollaborators);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
