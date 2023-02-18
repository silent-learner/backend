const router = require("express").Router();
const Employee = require("../models/Employee.js");

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    if (Object.keys(query).length === 0) {
      // console.log("here");
      let items = await Employee.find({}, { _id: 0, __v: 0 })
        .sort({ createdAt: -1 })
        .collation({ locale: "en_US", numericOrdering: true });
      // console.log(items);
      return res.status(200).json({
        success: true,
        content: "Get end point",
        items,
      });
    } else {
      // console.log("else");
      if (query.aadharNumber) {
        query.aadharNumber = Number.parseInt(query.aadharNumber);
      }
      // console.log(query);
      let items = Employee.find({}, { _id: 0, __v: 0 });
      if (query.name) {
        // console.log("name");
        items.find({
          name: { $regex: query.name, $options: "i" },
        });
      }
      if (query.email) {
        // console.log("emaill");
        items.find({ email: query.email });
      }
      if (query.aadharNumber) {
        // console.log("aadharNumber");
        items.find({ aadharNumber: query.aadharNumber });
      }
      if (query.company_name) {
        // console.log("company_name");
        items.find({
          company_name: { $regex: query.company_name, $options: "i" },
        });
      }
      if (query.department) {
        // console.log("department");
        items.find({ department: query.department });
      }
      if (query.address) {
        // console.log("address");
        items.find({ address: { $regex: query.address, $options: "i" } });
      }
      if (query.city) {
        // console.log("city");
        items.find({ city: { $regex: query.city, $options: "i" } });
      }
      if (query.country) {
        // console.log("country");
        items.find({ country: { $regex: query.country, $options: "i" } });
      }
      if (query.dateOfJoining) {
        console.log("object");
        console.log({
          start: new Date(new Date(req.body.startingDate).setHours(00, 00, 00)),
          end: new Date(new Date(req.body.endingDate).setHours(23, 59, 59)),
        });
        items.find({
          dateOfJoining: {
            $gte: new Date(
              new Date(req.body.startingDate).setHours(00, 00, 00)
            ),
            $lte: new Date(new Date(req.body.endingDate).setHours(23, 59, 59)),
          },
        }).sort("-dateOfJoining");
      }
      const result = await items
        .sort({ createdAt: -1 })
        .collation({ locale: "en_US", numericOrdering: true })
        .exec();
      // console.log(result);
      return res.status(200).json({
        success: true,
        message: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let {
      name,
      email,
      aadharNumber,
      company_name,
      department,
      address,
      city,
      country,
      salary,
      phone,
      dateOfJoining,
    } = req.body;

    country = country.toLowerCase();
    city = city.toLowerCase();
    address = address.toLowerCase();
    company_name = company_name.toLowerCase();

    const item = await Employee.find({ $or: [{ aadharNumber }, { email }] });
    if (item.length != 0) {
      // console.log(item);
      return res.status(403).json({
        success: false,
        message:
          "Employee with either same aadhar number or same email exists.!!",
      });
    }
    const employee = new Employee({
      name,
      email,
      aadharNumber,
      company_name,
      department,
      address,
      city,
      country,
      salary,
      phone,
      dateOfJoining,
    });

    const added = await employee.save();

    console.log(added);
    res.status(201).json({
      success: true,
      content: added,
    });
  } catch (error) {
    console.log(error.message);
    res.status(501).json({ success: false, error: error.message });
  }
});

router.put("/:aadhar", async (req, res) => {
  try {
    let aadhar = req.params.aadhar;
    aadhar = Number.parseInt(aadhar);
    const { phone, ...rest } = req.body;
    // console.log({ phone, rest });
    const updated = await Employee.updateOne(
      { aadharNumber: aadhar },
      {
        $push: {
          phone: phone,
        },
        $set: rest,
      }
    ).exec();
    if (updated.matchedCount) {
      res.json({ success: true, message: "Updated" });
      // console.log(updated,`\nSomeone hit your update endpoint.`)
    } else {
      res.status(400).json({ success: false, message: "Item does not exists" });
      // console.log(updated,`\nSomeone hit your update endpoint.`)
    }
    console.log(updated);
  } catch (error) {
    console.log(error.message);
    res.status(501).json({ success: false, message: error.message });
  }
});

router.delete("/:aadhar", async (req, res) => {
  try {
    let aadhar = req.params.aadhar;
    aadhar = Number.parseInt(aadhar);

    const employee = await Employee.findOneAndDelete({ aadharNumber: aadhar });
    if (employee) {
      res.json({ success: true, message: "Item deleted Successfully" });
      // console.log(item,"\nSomeone hit your delete end point");
    } else {
      res.status(400).json({ success: false, message: "Item does not exists" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
});

module.exports = router;
