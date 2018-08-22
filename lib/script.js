/**
 * transferring a property 
 * @param {org.example.empty.transfer} transfer - the trade to be processed
 * @transaction
 */

async function tradeCommodity(transfer) { // eslint-disable-line no-unused-vars
  if(transfer.Ownership.propertyId.unpaidTaxes == 0 &&
    transfer.Ownership.propertyId.bank.value == 0 &&
    transfer.Ownership.propertyId.stat== "transferalbe" &&
    ((transfer.Ownership.lOwner.judgStat == "verified")||(transfer.Ownership.nOwner.judgStat == "verified"))&&
    ((transfer.Ownership.lOwner.RegStat == "verified")||(transfer.Ownership.nOwner.RegStat == "verified"))){
  transfer.Ownership.lOwner.legOwner = transfer.newLeg;
  transfer.Ownership.nOwner.natOwner = transfer.newNat;
  transfer.Ownership.nOwner.propertyId = transfer.Ownership.lOwner.propertyId;
  transfer.Ownership.share = transfer.share;
  const ar = await getParticipantRegistry('org.example.empty.owner');
  await ar.update(transfer.Ownership);
}
else{
  //throw some error
}
}

/**
 * renting a property to individuals or juridical Person 
 * @param {org.example.empty.Renting} rent - the trade to be processed
 * @transaction
 */

async function rent(rent){
    // const factory = getFactory();
    // const NS = 'org.example.empty'
    // const tenant = factory.newResource(NS , 'Tenant' , rent.TrackingCode);
    // tenant.OwnershipID = rent.OwnershipID;

    if(rent.OwnershipID.share == 100){
    // tenant.lTenant = rent.legTenant;
    // tenant.nTenant = rent.natTenant;
    // tenant.Rent.Mortgage = rent.Mortgage;
    // tenant.Rent.rent = rent.rent;
    // tenant.Rent.start = rent.start;
    // tenant.Rent.end = rent.end;
    // tenant.Rent.TrackingCode = rent.TrackingCode;
    // const TenantRegister = await getParticipantRegistry(NS+'.Tenant');
    // await TenantRegister.addAll(tenant);
}
  else {
    //throw some errors
  }
}


/**
 * the judiciary can ban people from taking any kind of action
 * @param {org.example.empty.judStatus} judiciary - the trade to be processed
 * @transaction
 */

 async function judge(judiciary){
  if(judiciary.AssetStat != ""){
    judiciary.prop.stat = AddProp.AssetStat;
    const ar = await getAssetRegistry('org.example.empty.Property');
    await ar.update(judiciary.prop);
  }
  else if(judiciary.legPerson != "" && judiciary.natPerson==""){
    judiciary.legPerson.judgStat = judiciary.stat;
    const pr = await getParticipantRegistry('org.example.empty.JuridicalPerson');
    await pr.update(judiciary.legPerson);
  }
  else if(judiciary.legPerson == "" && judiciary.natPerson!="") {
    judiciary.natPerson.judgStat = judiciary.stat;
    const pr = await getParticipantRegistry('org.example.empty.NaturalPerson');
    await pr.update(judiciary.natPerson);
  } 
  else {
    //throw error
  }
 }


/**
 * the municipality adding property
 * @param {org.example.empty.AddingProperty} AddProp - the trade to be processed
 * @transaction
 */
 async function add(AddProp){
  const factory = getFactory();
  const NS = 'org.example.empty'
  const NewProperty = factory.newResource(NS , 'Property' , AddProp.PropID);
  //adding property
  const PropRegistery = await getAssetRegistry(NS+'.Property');
  await PropRegistery.addAll(NewProperty);
 }
 /**
 * the municipality changing the status of a property and the type
 * @param {org.example.empty.MunicipalityStat} PropStat - the trade to be processed
 * @transaction
 */
 async function propStat(PropStat){
  PropStat.prop.stat = PropStat.PropertyStat;
  PropStat.prop.type = PropStat.PropertyType;
  const ar = await getAssetRegistry('org.example.empty.Property');
  await ar.update(PropStat.prop)
 }
  /**
 * the bank can give facility to individuals or give to property
 * @param {org.example.empty.givingBankFacility} facility - the trade to be processed
 * @transaction
 */

 async function Facility(facility){
  if(facility.legPerson!=""&&facility.natPerson=="" && facility.prop == ""){
    facility.legPerson.Facility.value = facility.values;
    facility.legPerson.Facility.start = facility.start;
    facility.legPerson.Facility.end = facility.end;
    facility.legPerson.Facility.description = facility.description;
    const pr = await getParticipantRegistry('org.example.empty.JuridicalPerson')
    await pr.update(facility.legPerson);
  }
  else if(facility.legPerson==""&&facility.natPerson!="" && facility.prop == ""){
    facility.natPerson.Facility.value = facility.values;
    facility.natPerson.Facility.start = facility.start;
    facility.natPerson.Facility.end = facility.end;
    facility.natPerson.Facility.description = facility.description;
    const pr = await getParticipantRegistry('org.example.empty.NaturalPerson')
    await pr.update(facility.natPerson);
  }
  else if (facility.legPerson==""&&facility.natPerson=="" && facility.prop != "") {
    facility.prop.bank.value = facility.value;
    facility.prop.bank.start = facility.start;
    facility.prop.bank.end = facility.end;
    facility.prop.bank.description = facility.description;
    const ar = await getAssetRegistry('org.example.empty.Property');
    await ar.update(facility.prop);
  }
  else{
    //throw error
  }
 }
  /**
 * bank can ban a property due to unpaid bills 
 * @param {org.example.empty.givingBankFacility} BankProp - the trade to be processed
 * @transaction
 */
async function BankPropStat(BankProp){
  BankProp.prop.stat = BankProp.TransferStat;
  const ar = await getAssetRegistry('org.example.empty.Property');
  await ar.update(BankProp.prop);
}
 