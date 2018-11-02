const express = require('express');
const router = express.Router();

router.get("/", async (req, res, next) => {

});
router.get("/:id", async (req, res, next) => {

});
router.post("/", async (req, res, next) => {
  const { error } = PermissionItem.validate(req.body);
  if (error) return res.status(400).send(error);

  const permission = new PermissionItem(null, req.body.resource, req.body.method, req.body.description);
  try {
    const result = permissionService.addPermission(permission);
    return res.send(result);
  } catch (e) {
    return res.status(400).send(e);
  }
});
router.put("/", async (req, res, next) => {

});
router.delete("/", async (req, res, next) => {

});

module.exports = router;

