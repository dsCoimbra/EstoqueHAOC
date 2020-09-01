const express = require("express");

//Imports controllers
const ProviderController = require("./controllers/admin/ProviderController")
const SectorController = require("./controllers/admin/SectorController")
const CategoryController = require("./controllers/admin/CategoryController")
const InvoicesController = require("./controllers/admin/InvoicesController")
const UserController = require("./controllers/admin/UserController")
const EquipmentController = require("./controllers/EquipmentController")
const MaintenanceController = require("./controllers/MaintenanceController")
const RequestController = require("./controllers/RequestController")
const StockController = require("./controllers/StockController")

const routes = express.Router();

//Rotas
//Categories
routes.get('/categories', CategoryController.index)
routes.get('/categories/:id', CategoryController.category)
routes.post('/category', CategoryController.create)
routes.put('/category/:id', CategoryController.edit)
routes.delete('/category/:id', CategoryController.delete)

//Invoinces
routes.get('/invoices', InvoicesController.index)
routes.get('/invoice/:id', InvoicesController.invoice)
routes.post('/category', InvoicesController.create)
routes.post('/category/:id', InvoicesController.edit)
routes.delete('/category/:id', InvoicesController.delete)

//Providers
routes.get('/providers', ProviderController.index)
routes.get('/provider/:id', ProviderController.provider)
routes.post('/provider', ProviderController.create)
routes.post('/provider/:id', ProviderController.edit)
routes.delete('/provider/:id', ProviderController.delete)

//Sectors
routes.get('/sectors', SectorController.index)
routes.get('/sector/:id', SectorController.sector)
routes.post('/sector', SectorController.create)
routes.post('/sector/:id', SectorController.edit)
routes.delete('/sector/:id', SectorController.delete)

//Users
routes.get('/users', UserController.index)
routes.get('/user/:id', UserController.user)
routes.post('/user', UserController.create)
routes.post('/user/:id', UserController.edit)
routes.delete('/user/:id', UserController.delete)

//Equipments
routes.get('/equipments', EquipmentController.index)
routes.get('/equipment/:id', EquipmentController.equipment)
routes.post('/equipment', EquipmentController.create)
routes.post('/equipment/:id', EquipmentController.edit)
routes.delete('/equipment/:id', EquipmentController.delete)

//Maintenances
routes.get('/maintenances', MaintenanceController.index)
routes.get('/maintenance/:id', MaintenanceController.maintenance)
routes.post('/maintenance', MaintenanceController.create)
routes.post('/maintenance/:id', MaintenanceController.edit)
routes.delete('/maintenance/:id', MaintenanceController.delete)

//Requests
routes.get('/requests', RequestController.index)
routes.get('/request/:id', RequestController.request)
routes.post('/request', RequestController.create)
routes.post('/request/:id', RequestController.edit)
routes.delete('/request/:id', RequestController.delete)

//Stocks
routes.get('/stocks', StockController.index)
routes.get('/stock/:id', StockController.stock)
routes.post('/stock', StockController.create)
routes.post('/stock/:id', StockController.edit)
routes.delete('/stock/:id', StockController.delete)


module.exports = routes;