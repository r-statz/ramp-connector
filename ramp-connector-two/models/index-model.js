const sql = require("mssql");
const ramp_ip = `64.239.133.27`;

//multiple locations per sku
//132G-BLK-1X: 1, 3
//13376W-035-3X: 1, 1
//13612M-393-L: 7, 1
//13612M-393-S: 2, 2
//13612M-393-XL: 8, 4
//13612M-BLK-L: 8, 2
//13612M-BLK-XL : 8, 8, 3

exports.testFunc = async () => {};

function arrayToCSV(data) {
  csv = data.map((row) => Object.values(row));
  csv.unshift(Object.keys(data[0]));
  return csv.join("\n");
}

exports.inventoryTransferCheck = async (data) => {
  console.log(data, "data in model");
  let result = [];
  const total = Object.values(data)[0];
  const sku = Object.keys(data)[0];

  try {
    await sql.connect(`mssql://ramp:rampsys@${ramp_ip}`);
    let locations =
      await sql.query`SELECT WarehouseSku, LocationName, PalletId, Qty from Inventory WHERE WarehouseSku = ${sku};`;

    const data = locations.recordset.sort((a, b) => b.Qty - a.Qty);

    let count = 0;
    for (let i = 0; i < data.length; i++) {
      const qty = data[i].Qty;
      if (count < total) {
        if (count + qty <= total) {
          result.push({ ...data[i], qtyToTransfer: qty });
          count += qty;
        } else {
          result.push({ ...data[i], qtyToTransfer: total - count });
          count += total - count;
        }
      }
    }
    console.log(result, "result")
    return result;
  } catch (e) {
    console.log(
      e,
      "e in amerex940CuinventoryTransferCheckstomerOrderCheck Model"
    );
    if (e.errors) {
      res.status(422).json({ errors: e.errors });
    } else {
      next(e);
    }
  }
};
