import { Router } from "express";
import packageJson from "../../package.json" with { type: "json" };

const router = Router();

router.get("/", (req, res) => {
  const version = packageJson.version;
  res.status(200).json({ message: `Taskman REST API v${version} ✅` });
});

export default router;
