/**
 * New script file
 */

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.empty.transfer} transfer - the trade to be processed
 * @transaction
 */

async function tradeCommodity(transfer) { // eslint-disable-line no-unused-vars

  
	transfer.prop.legOwner = transfer.newLeg;
  	transfer.prop.natOwner = transfer.newNat;
    transfer.prop.trans = "inTransfer";
    const assetRegistry = await getAssetRegistry('org.example.empty.ownerShip');
    await assetRegistry.update(transfer.prop);
 
  
  
}
