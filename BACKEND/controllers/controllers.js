const { fashio } = require('../Schema/schema');

const getAllData = async (req, res) => {
  try {
    const AllData = await fashio.find({});
    res.status(200).json(AllData);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching All Data" });
  }
};

const getOneData = async (req, res) => {
  try {
    const OneData = await fashio.findById(req.params.id);
    if (!OneData) {
      return res.status(404).json({ message: "Sorry the requested data is not found" });

    }
    res.status(200).json({ message: `See Data for ${req.params.id}`, OneData });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error in fetching the data requested" });

  }
};

const createData = async (req, res) => {
  try {
    const value = req.body;
    console.log(value)
    const { name, region, image, description, created_by } = value;

    const postData = await fashio.create({ name, region, image, description, created_by })

    res.status(201).json({ message: "Create Data", postData });


  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error creating new Collection" });
  }
};

const updateOneData = async (req, res) => {
  try {
    const updateOneData = await fashio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    res.status(200).json({
      message: `Update Data for ${req.params.id}`,
      updateOneData,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error Updating One Collection" });
  }
};

const deleteData = async (req, res) => {
  try {
    const deleteData = await fashio.findByIdAndDelete(
      req.params.id
    );
    if (!deleteData) {
      return res.status(404).json({
        message: `Collection not found ${req.params.id}`,
      });
    }
    res.status(200).json({
      message: `Delete Collection for ${req.params.id}`,
      deleteData,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error Deleting Collection" });
  }
};

module.exports = {
  getAllData,
  getOneData,
  createData,
  updateOneData,
  deleteData,
}
