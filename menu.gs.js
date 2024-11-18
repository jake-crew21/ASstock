function onOpen() {
  SpreadsheetApp.getUi().createMenu("Custom Menu")
    .addSubMenu(SpreadsheetApp.getUi().createMenu("All Write")
      .addItem("ONE FOR ALL", "oneForAll")
      )
    .addSeparator()
    .addSubMenu(SpreadsheetApp.getUi().createMenu("Individual Write")
      .addItem("Update Active Schools","updateActiveSchools")
      .addItem("Write Stream Count", "countStreams")
      .addItem("Write Chrome Count", "countChrome")
      .addItem("Write Kits", "kitPacking")
      .addItem("Check Dongle", "dongles")
      .addItem("Enough Enroll?", "manualEnoughEnrol")
      .addItem("Remove No Delivery", "removeNoDelivery")
      .addItem("Check School Provides", "schoolProviding")
      .addItem("Extras", "extras")
      .addItem("Start Date", "startDate")
      .addItem("Area", "area")
      .addItem("Address", "address")
      
      
      .addItem("Pickups", "pickups")
      .addItem("End Date", "endDate"))
    .addToUi();
}