module.exports = (srv) => {

  const { Vehicles } = cds.entities('my')

  // Before creating a subscription: validate vehicle is available and auto-calculate totalValue
  srv.before('CREATE', 'Subscriptions', async (req) => {
    const { vehicle_ID, durationMonths } = req.data

    if (!durationMonths || durationMonths < 1)
      return req.error(400, 'Subscription must be for at least 1 month')

    const tx = cds.transaction(req)
    const [vehicle] = await tx.run(SELECT.from(Vehicles).where({ ID: vehicle_ID }))

    if (!vehicle)
      return req.error(404, 'Vehicle not found')
    if (vehicle.status !== 'available')
      return req.error(409, `Vehicle is not available for subscription (current status: ${vehicle.status})`)

    // Auto-calculate totalValue from monthlyRate x durationMonths
    req.data.totalValue = vehicle.monthlyRate * durationMonths

    // Mark vehicle as subscribed
    await tx.run(UPDATE(Vehicles).set({ status: 'subscribed' }).where({ ID: vehicle_ID }))
  })

  // After reading subscriptions: label long-term subscribers
  srv.after('READ', 'Subscriptions', each => {
    if (each.durationMonths >= 12) each.customerName += ' -- Long-term subscriber'
  })

}
