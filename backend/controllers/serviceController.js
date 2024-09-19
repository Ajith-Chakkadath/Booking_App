// controllers/serviceController.js
const Service = require('../models/Service');

// Create a new service (Admin only)
const createService = async (req, res) => {
  const { name, description, price, duration, category } = req.body;

  try {
    const service = new Service({
      name,
      description,
      price,
      duration,
      category,
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating service', error });
  }
};

// Get all services (Public)
const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching services', error });
  }
};

// Update a service (Admin only)
const updateService = async (req, res) => {
  const { name, description, price, duration, category } = req.body;

  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      service.name = name || service.name;
      service.description = description || service.description;
      service.price = price || service.price;
      service.duration = duration || service.duration;
      service.category = category || service.category;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error updating service', error });
  }
};

// Delete a service (Admin only)
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      await service.remove();
      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting service', error });
  }
};

module.exports = { createService, getServices, updateService, deleteService };
