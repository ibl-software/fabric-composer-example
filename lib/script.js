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
  const NS = 'org.example.empty';
  const tenant  =  factory.newResource( NS,'Tenant' ,'1234');
  tenant.lord.landLord.OwnershipID ="3234" ;
  tenant.nTenant = rent.nTenant;
  tenant.lTenant = rent.lTenant;
  const tenantRegistery = await getParticipantRegistry(NS + '.Tenant');
  await tenantRegistery.addAll([tenant]);
}