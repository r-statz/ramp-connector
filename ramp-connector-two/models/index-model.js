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

// {
//   "WarehouseSku": "00205298-S849-30/32-AV",
//   "LocationName": "32A11",
//   "PalletId": "1500796",
//   "Qty": 2
// },
// {
//   "WarehouseSku": "00205298-S849-30/32-AV",
//   "LocationName": "34A28",
//   "PalletId": "B2S1521095",
//   "Qty": 3
// },

// {
//   "WarehouseSku": "021072460",
//   "LocationName": "01A10",
//   "PalletId": "155783",
//   "Qty": 2
// },
// {
//   "WarehouseSku": "021072460",
//   "LocationName": "E06",
//   "PalletId": "P100034322",
//   "Qty": 3
// },

// {
//   "WarehouseSku": "0603011-M1N-O/S",
//   "LocationName": "40A07",
//   "PalletId": "1310408",
//   "Qty": 4
// },
// {
//   "WarehouseSku": "0603011-M1N-O/S",
//   "LocationName": "39D25",
//   "PalletId": "1310562",
//   "Qty": 2
// },
// {
//   "WarehouseSku": "0603011-M1N-O/S",
//   "LocationName": "64A02",
//   "PalletId": "428444",
//   "Qty": 4
// },

// {
//   "skus": "0603011-M1N-O/S 021072460 00205298-S849-30/32-AV",
//   "qtys": "2 4 9"
// }
// function arrayToCSV(data) {
//   csv = data.map((row) => Object.values(row));
//   csv.unshift(Object.keys(data[0]));
//   return csv.join("\n");
// }
exports.inventory = async () => {
  await sql.connect(`mssql://ramp:rampsys@${ramp_ip}`);
  let locations =
    await sql.query`SELECT  TOP 300 WarehouseSku, LocationName, PalletId, Qty from Inventory;`;
  console.log(locations);
  return locations.recordset;
};

exports.inventoryTransferCheck = async (sku, qty) => {
  let result = [];
  const total = qty;

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
