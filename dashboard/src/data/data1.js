export const watchlist = [
  { name: "ADS", price: 208.5, percent: "-0.6%", isDown: true },   // Adidas
  { name: "AIR", price: 144.2, percent: "+0.4%", isDown: false },  // Airbus
  { name: "ALV", price: 383.7, percent: "+0.3%", isDown: false },  // Allianz
  { name: "BAS", price: 47.6, percent: "+0.3%", isDown: false },   // BASF
  { name: "BAYN", price: 28.6, percent: "+1.6%", isDown: false },  // Bayer
  { name: "BEI", price: 100.0, percent: "-0.7%", isDown: true },   // Beiersdorf
  { name: "BMW", price: 90.9, percent: "+0.5%", isDown: false },   // BMW
  { name: "BNR", price: 54.4, percent: "+0.9%", isDown: false },   // Brenntag
  { name: "CBK", price: 36.7, percent: "-3.2%", isDown: true },    // Commerzbank
  { name: "CON", price: 75.5, percent: "+0.2%", isDown: false },   // Continental
  { name: "DB1", price: 258.3, percent: "+0.0%", isDown: false },  // Deutsche Börse
  { name: "DBK", price: 31.6, percent: "+0.3%", isDown: false },   // Deutsche Bank
  { name: "DTE", price: 31.6, percent: "0.0%", isDown: false },    // Deutsche Telekom
  { name: "DPW", price: 39.8, percent: "-2.0%", isDown: true },    // DHL Group
  { name: "DTG", price: 40.6, percent: "+0.7%", isDown: false },   // Daimler Truck
  { name: "EOAN", price: 15.4, percent: "-0.8%", isDown: true },   // E.ON
  { name: "FME", price: 43.6, percent: "-0.1%", isDown: true },    // Fresenius Medical Care
  { name: "FRE", price: 47.7, percent: "+0.3%", isDown: false },   // Fresenius
  { name: "HEN3", price: 73.6, percent: "+0.3%", isDown: false },  // Henkel
  { name: "HEI", price: 199.9, percent: "-0.7%", isDown: true },   // Heidelberg Materials
  { name: "HNR1", price: 255.6, percent: "-0.2%", isDown: true },  // Hannover Rück
  { name: "IFX", price: 36.3, percent: "+0.3%", isDown: false },   // Infineon
  { name: "MRK", price: 111.9, percent: "-0.5%", isDown: true },   // Merck
  { name: "MBG", price: 54.9, percent: "+1.3%", isDown: false },   // Mercedes-Benz
  { name: "MUV2", price: 420.1, percent: "+0.6%", isDown: false }, // Munich Re
  { name: "PAH3", price: 53.2, percent: "+0.4%", isDown: false },  // Porsche SE
  { name: "P911", price: 98.5, percent: "+0.9%", isDown: false },  // Porsche AG
  { name: "QIA", price: 41.7, percent: "-1.1%", isDown: true },    // Qiagen
  { name: "RHM", price: 485.4, percent: "+1.5%", isDown: false },  // Rheinmetall
  { name: "RWE", price: 33.0, percent: "-0.5%", isDown: true },    // RWE
  { name: "SAP", price: 136.0, percent: "+0.8%", isDown: false },  // SAP
  { name: "SRT3", price: 210.3, percent: "-0.6%", isDown: true },  // Sartorius
  { name: "SHL", price: 50.7, percent: "-0.9%", isDown: true },    // Siemens Healthineers
  { name: "SIE", price: 95.0, percent: "-0.2%", isDown: true },    // Siemens
  { name: "ENR", price: 20.5, percent: "-1.0%", isDown: true },    // Siemens Energy
  { name: "SY1", price: 114.2, percent: "+0.3%", isDown: false },  // Symrise
  { name: "VNA", price: 28.2, percent: "-0.6%", isDown: true },    // Vonovia
  { name: "VOW3", price: 123.4, percent: "+0.7%", isDown: false }, // Volkswagen
  { name: "ZAL", price: 24.6, percent: "-2.4%", isDown: true },    // Zalando
];

export const holdings = [
  { name: "SAP", qty: 10, avg: 130, price: 136.0, net: "+4.6%", day: "+0.8%" },
  { name: "BMW", qty: 5, avg: 85, price: 90.9, net: "+6.9%", day: "+0.5%" },
  { name: "ALV", qty: 3, avg: 370, price: 383.7, net: "+3.7%", day: "+0.3%" },
  { name: "BAYN", qty: 10, avg: 30, price: 28.6, net: "-4.7%", day: "+1.6%", isLoss: true },
  { name: "IFX", qty: 8, avg: 35, price: 36.3, net: "+3.7%", day: "+0.3%" },
    { name: "RWE", qty: 10, avg: 130, price: 136.0, net: "+4.6%", day: "+0.8%" },
  { name: "VNA", qty: 5, avg: 85, price: 90.9, net: "+6.9%", day: "+0.5%" },
  { name: "VOW3", qty: 3, avg: 370, price: 383.7, net: "+3.7%", day: "+0.3%" },
  { name: "ZAL", qty: 10, avg: 30, price: 28.6, net: "-4.7%", day: "+1.6%", isLoss: true },
  { name: "QIA", qty: 8, avg: 35, price: 36.3, net: "+3.7%", day: "+0.3%" },
];

export const positions = [
  { product: "CNC", name: "CBK", qty: 10, avg: 40, price: 36.7, net: "-8.3%", day: "-3.2%", isLoss: true },
  { product: "CNC", name: "ZAL", qty: 5, avg: 26, price: 24.6, net: "-5.4%", day: "-2.4%", isLoss: true },
  { product: "CNC", name: "RHM", qty: 2, avg: 470, price: 485.4, net: "+3.3%", day: "+1.5%" },
];