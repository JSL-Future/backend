const User = require('./user.model')
const Company = require('./company.model')
const Operation = require('./operation.model')
const VehicleType = require('./vehicleType.model')
const Vehicle = require('./vehicle.model')
const Driver = require('./driver.model')
const MaintenanceOrder = require('./maintenanceOrder.model')
const MaintenanceOrderEvent = require('./maintenanceOrderEvent.model')
const Supply = require('./supply.model')

module.exports = [
  Company,
  User,
  Operation,
  VehicleType,
  Vehicle,
  Driver,
  MaintenanceOrder,
  MaintenanceOrderEvent,
  Supply
]
