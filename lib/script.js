
/**
 * transferring a property 
 * @param {org.example.empty.transfer} transfer - the trade to be processed
 * @transaction
 */
async function tradeCommodity(transfer) { // eslint-disable-line no-unused-vars
  
  if(transfer.Ownership.lOwner.propertyId.facility.value == 0 &&
     transfer.Ownership.lOwner.propertyId.stat == "transferalbe" &&
     transfer.Ownership.lOwner.legOwner.judgStat == "verified" &&
     transfer.Ownership.lOwner.legOwner.RegStat == "verified")
    {
       transfer.Ownership.lOwner.legOwner = transfer.newLeg;
         transfer.Ownership.share = transfer.share;
         const ar = await getParticipantRegistry('org.example.empty.owner');
         await ar.update(transfer.Ownership);
    }
 else{
     throw new Error('there is a problem with the Owner or the property,check again!!');}
   }

/**
 *
 * @param {org.example.empty.AddingProperty} AddProp - SetupDemo instance
 * @transaction
 */
  async function AddProp(AddProp){
    const factory = getFactory();
    const NS = 'org.example.empty';
    const newProp = factory.newResource(NS, 'Property', AddProp.propertyId);
    // regulator.address.Province = AddProp.Province;
    // regulator.address.town = AddProp.Town;
    // regulator.address.no = AddProp.no;
    // regulator.address.street1 = AddProp.street1;
    // regulator.address.street2 = AddProp.street2;
    // regulator.address.street3 = AddProp.street3;
    // regulator.address.phoneNumber = AddProp.phoneNumber;
    // regulator.address.zipcode = AddProp.zipcode;
    // regulator.address.flat = AddProp.flat;
    // regulator.address.district = AddProp.district;
    newProp.type = AddProp.type;
    newProp.stat = AddProp.stat;
    newProp.Area = AddProp.Area;
    const regulatorRegistry = await getAssetRegistry(NS + '.Property');
    await regulatorRegistry.addAll([newProp]);
   }

/**
 * chaning property status
 * @param {org.example.empty.SetPropertyStatus} setStat- the trade to be processed
 * @transaction
 */
async function setPropStat(setStat){

       setStat.prop.stat = setStat.stat;
       const ar = await getAssetRegistry('org.example.empty.Property');
       await ar.update(setStat.prop);

   }

/**
 * chaning property type
 * @param {org.example.empty.SetPropertyType} setType- the trade to be processed
 * @transaction
 */
async function setPropType(setType){

       setType.prop.type = setType.type;
       const ar = await getAssetRegistry('org.example.empty.Property');
       await ar.update(setType.prop);

   }


/**
 * giving facility to a property
 * @param {org.example.empty.givingBankFacility} gf
 * @transaction
 */

async function giveFac(gf){
   		gf.prop.facility.value = gf.value;
  		gf.prop.facility.start = gf.start;
  		gf.prop.facility.end = gf.end;
  		gf.prop.facility.description = gf.description;
       const ar = await getAssetRegistry('org.example.empty.Property');
       await ar.update(gf.prop);
     }


/**
 * giving facility to a property
 * @param {org.example.empty.payingForFacility} pf -paying for facility
 * @transaction
 */

async function payFac(pf){
		pf.prop.facility.value = pf.prop.facility.value - pf.amount;
  		const ar = await getAssetRegistry('org.example.empty.Property');
  		await ar.update(pf.prop);
 	}