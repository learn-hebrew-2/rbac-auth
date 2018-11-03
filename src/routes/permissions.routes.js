const express = require('express');
const router = express.Router();
const PermissionItem = require("../dto/permission.item");
const PermissionService = require("../services/permissions.service");
const permissionService = new PermissionService();

router.get("/", async (req, res) => {
  try {
    const result = await permissionService.getPermissions();
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await permissionService.getPermission(id);
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/", async (req, res) => {
  const { error } = PermissionItem.validate(req.body);
  if (error) return res.status(400).send(error);

  const permission = new PermissionItem(null, req.body.resource, req.body.method, req.body.description);
  try {
    const result = await permissionService.addPermission(permission);
    return res.send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
});
router.put("/:id", async (req, res) => {
  const { error } = PermissionItem.validate(req.body);
  if (error) return res.status(400).send(error);
  const permission = new PermissionItem(req.params.id, req.body.resource, req.body.method, req.body.description);
  permissionService.updatePermission(permission).then(
    result => {
      return res.send(result);
    },
    error => {
      return res.status(400).send(error);
    }
  );
});
router.delete("/:id", async (req, res) => {
  try {
    const result = await permissionService.removePermission(req.params.id);
    return res.send(result);
  } catch(e) {
    return res.status(400).send(e);
  }
  
});

module.exports = router;

