module.exports = (srv) => {

  // Reply mock data for Vehicles...
  srv.on('READ', 'Vehicles', () => [
    { ID: 'v-001', brand: 'Toyota',  model: 'Corolla',   monthlyRate: 450.00, status: 'available'   },
    { ID: 'v-002', brand: 'BMW',     model: 'X5',        monthlyRate: 950.00, status: 'subscribed'  },
    { ID: 'v-003', brand: 'Tesla',   model: 'Model 3',   monthlyRate: 800.00, status: 'available'   },
    { ID: 'v-004', brand: 'Ford',    model: 'Mustang',   monthlyRate: 600.00, status: 'maintenance' },
  ])

  // Reply mock data for Subscriptions...
  srv.on('READ', 'Subscriptions', () => [
    { ID: 's-001', vehicle_ID: 'v-002', customerName: 'Alice Johnson', startDate: '2025-01-01', durationMonths: 12, totalValue: 11400.00 },
    { ID: 's-002', vehicle_ID: 'v-003', customerName: 'Bob Smith',     startDate: '2025-03-15', durationMonths:  6, totalValue:  4800.00 },
    { ID: 's-003', vehicle_ID: 'v-001', customerName: 'Carol White',   startDate: '2025-06-01', durationMonths:  3, totalValue:  1350.00 },
  ])

}