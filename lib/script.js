/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.empty.transfer} transfer - the trade to be processed
 * @transaction
 */

async function tradeCommodity(transfer) { // eslint-disable-line no-unused-vars

  transfer.Ownership.lOwner.legOwner = transfer.newLeg;
  transfer.Ownership.nOwner.natOwner = transfer.newNat;
  transfer.Ownership.nOwner.propertyId = transfer.Ownership.lOwner.propertyId;
  transfer.Ownership.share = transfer.share;
  const ar = await getParticipantRegistry('org.example.empty.owner');
  await ar.update(transfer.Ownership);
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.empty.Renting} rent - the trade to be processed
 * @transaction
 */

async function rent(rent){
    const factory = getFactory();
    const NS = 'org.example.empty'
    const tenant = factory.newResource(NS , 'Tenant' , rent.TrackingCode);
    tenant.OwnershipID = rent.OwnershipID;
    if(rent.OwnershipID.share == 100){
    tenant.lTenant = rent.legTenant;
    tenant.nTenant = rent.natTenant;
    tenant.Rent.Mortgage = rent.Mortgage;
    tenant.Rent.rent = rent.rent;
    tenant.Rent.start = rent.start;
    tenant.Rent.end = rent.end;
    tenant.Rent.TrackingCode = rent.TrackingCode;
    const TenantRegister = await getParticipantRegistry(NS+'.Tenant');
    await TenantRegister.addAll(tenant);
}
  else {
    //throw some errors
  }
}