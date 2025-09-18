import ProjectModel from "../models/project.model.js";

export async function getProjects(req, res, next) {
  try {
    const projects = await ProjectModel.find({ owner: req.user.id }).exec();
    res.status(200).json({
      message: `${projects.length} projects retrieved successfully ✅`,
      data: projects,
    });
  } catch (_) {
    next({});
  }
}
