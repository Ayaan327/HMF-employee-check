import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "outputs/hr-practice";
await fs.mkdir(outputDir, { recursive: true });

const wb = Workbook.create();
const guide = wb.worksheets.add("Start here");
const employees = wb.worksheets.add("Employee import");
const schedules = wb.worksheets.add("Schedule planner");
const holidays = wb.worksheets.add("Holiday practice");
const font = "Arial";
const navy = "#17365D";
const blue = "#2F75B5";
const paleBlue = "#D9EAF7";
const inputFill = "#FFF2CC";
const paleGreen = "#E2F0D9";
const paleRed = "#FCE4D6";
const grey = "#E7E6E6";

function baseSheet(sheet) {
  sheet.showGridLines = false;
  sheet.getRange("A1:AZ200").format.font = { name: font, size: 10, color: "#222222" };
  sheet.getRange("A1:AZ200").format.verticalAlignment = "center";
}
function title(sheet, text, endCol) {
  sheet.getRange("A2").values = [[text]];
  sheet.getRange("A2").format.font = { name: font, size: 15, bold: true, color: navy };
  sheet.getRange(`A3:${endCol}3`).format.borders = { bottom: { style: "thin", color: blue } };
}
function header(range) {
  range.format = {
    fill: navy,
    font: { name: font, size: 10, bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "inside", style: "thin", color: "#FFFFFF" },
  };
}

for (const sheet of [guide, employees, schedules, holidays]) baseSheet(sheet);
guide.tabColor = navy;
employees.tabColor = blue;
schedules.tabColor = "#70AD47";
holidays.tabColor = "#ED7D31";

title(guide, "HMF workforce data practice workbook", "H");
guide.getRange("A5:B12").values = [
  ["Purpose", "Use fictional information to practise preparing employee, schedule and holiday data for the HMF portal."],
  ["Employee import", "Matches the CSV columns currently accepted by People > Import employees from CSV."],
  ["Schedule planner", "Helps HR plan weekly schedules. Schedules are currently entered in the portal from an employee profile or assigned from a reusable template."],
  ["Holiday practice", "Helps HR prepare allowances and balances. Only annual allowance and carried forward are currently entered on the employee profile; leave taken and booked are planned for the leave-management phase."],
  ["Important", "All names and emails in this workbook are fictional. Do not use real employee information in the demo."],
  ["Import limit", "The current portal accepts 1 to 50 new employees per CSV import and does not overwrite existing employees."],
  ["Access", "CSV import creates ordinary employee records only. Passwords and elevated HR or administrator access are not imported."],
  ["How to test", "Complete the yellow cells, save only the Employee import worksheet as CSV UTF-8, then upload it under People > Import employees from CSV and review the preview before confirming."],
];
guide.getRange("A5:A12").format = { fill: paleBlue, font: { name: font, bold: true, color: navy } };
guide.getRange("B5:B12").format.wrapText = true;
guide.getRange("A5:B12").format.borders = { preset: "outside", style: "thin", color: "#B4C6E7" };
guide.getRange("A5:A12").format.columnWidth = 22;
guide.getRange("B5:B12").format.columnWidth = 78;
guide.getRange("A5:B12").format.autofitRows();

title(employees, "Employee CSV import practice", "K");
employees.getRange("A4:K4").values = [["id","name","email","office","department","jobTitle","managerId","employmentType","startDate","weeklyHours","timezone"]];
header(employees.getRange("A4:K4"));
const employeeRows = [
  ["MGR-001","Amina Rahman","amina.rahman@hmf.example","UK","Management","Operations Manager","","full-time",new Date("2024-01-15T12:00:00Z"),37.5,"Europe/London"],
  ["EMP-101","Daniel Hughes","daniel.hughes@hmf.example","UK","Electrical Engineering","Electrical Engineer","MGR-001","full-time",new Date("2025-03-03T12:00:00Z"),37.5,"Europe/London"],
  ["EMP-102","Sophie Martin","sophie.martin@hmf.example","UK","Project Management","Project Coordinator","MGR-001","part-time",new Date("2025-09-01T12:00:00Z"),22.5,"Europe/London"],
  ["MGR-002","Bilal Khan","bilal.khan@hmf.example","PK","Management","Pakistan Office Manager","","full-time",new Date("2023-06-01T12:00:00Z"),40,"Asia/Karachi"],
  ["EMP-201","Sara Ahmed","sara.ahmed@hmf.example","PK","Civil Engineering","Civil Engineer","MGR-002","full-time",new Date("2025-02-10T12:00:00Z"),40,"Asia/Karachi"],
];
employees.getRange("A5:K54").format.fill = inputFill;
employees.getRange("A5").write(employeeRows);
employees.getRange("I5:I54").setNumberFormat("yyyy-mm-dd");
employees.getRange("J5:J54").setNumberFormat("0.00");
employees.getRange("D5:D54").dataValidation = { rule: { type: "list", values: ["UK", "PK"] } };
employees.getRange("H5:H54").dataValidation = { rule: { type: "list", values: ["full-time", "part-time", "temporary", "contractor"] } };
employees.getRange("K5:K54").dataValidation = { rule: { type: "list", values: ["Europe/London", "Asia/Karachi"] } };
employees.getRange("A4:K54").format.borders = { preset: "outside", style: "thin", color: "#A6A6A6" };
employees.freezePanes.freezeRows(4);
const empWidths = [14,22,34,10,25,24,14,18,13,14,20];
empWidths.forEach((w,i)=>employees.getRangeByIndexes(0,i,54,1).format.columnWidth=w);
employees.getRange("A56:K58").values = [
  ["Required columns","id, name, email, office and department must be completed. All headers must remain exactly as written.",null,null,null,null,null,null,null,null,null],
  ["Manager order","If managerId is used, import the manager first or include the manager earlier in the same file.",null,null,null,null,null,null,null,null,null],
  ["Current limitation","Holiday allowance, roles, passwords and schedules are not accepted through this CSV import.",null,null,null,null,null,null,null,null,null],
];
employees.getRange("A56:A58").format = { fill: grey, font: { name: font, bold: true, color: navy } };
employees.getRange("B56:K58").merge(true);
employees.getRange("B56:K58").format.wrapText = true;

title(schedules, "Weekly schedule planning practice", "N");
schedules.getRange("A4:N4").values = [["Employee ID","Schedule name","Schedule type","Effective start","Effective end","Day","Working day","Start","Finish","Finish next day","Break minutes","Break treatment","Arrangement","Paid hours"]];
header(schedules.getRange("A4:N4"));
const people = [
  ["EMP-101","Standard 37.5 hours",37.5,"office"],
  ["EMP-102","Part-time Mon-Wed",22.5,"hybrid"],
  ["EMP-201","Standard 40 hours",40,"office"],
];
const dayOrder = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const scheduleRows = [];
for (const [id,name,hours,arrangement] of people) {
  for (let d=0; d<7; d++) {
    const working = id==="EMP-102" ? d<3 : d<5;
    const start = working ? 9/24 : null;
    const finish = working ? (id==="EMP-201" ? 18/24 : 17/24) : null;
    const breakMins = working ? (id==="EMP-201" ? 60 : 30) : 0;
    scheduleRows.push([id,name,"Normal",new Date("2026-01-01T12:00:00Z"),null,dayOrder[d],working?"Yes":"No",start,finish,"No",breakMins,"Unpaid",working?arrangement:"office",null]);
  }
}
schedules.getRange("A5:N104").format.fill = inputFill;
schedules.getRange("A5").write(scheduleRows);
schedules.getRange("N5").formulas = [["=IF(G5=\"\",\"\",IF(G5=\"No\",0,MOD(I5-H5,1)*24+IF(J5=\"Yes\",24,0)-IF(L5=\"Paid\",0,K5/60)))"]];
schedules.getRange("N5:N104").fillDown();
schedules.getRange("D5:E104").setNumberFormat("yyyy-mm-dd");
schedules.getRange("H5:I104").setNumberFormat("hh:mm");
schedules.getRange("N5:N104").setNumberFormat("0.00");
schedules.getRange("C5:C104").dataValidation = { rule: { type: "list", values: ["Normal", "Temporary"] } };
schedules.getRange("F5:F104").dataValidation = { rule: { type: "list", values: dayOrder } };
schedules.getRange("G5:G104").dataValidation = { rule: { type: "list", values: ["Yes", "No"] } };
schedules.getRange("J5:J104").dataValidation = { rule: { type: "list", values: ["Yes", "No"] } };
schedules.getRange("L5:L104").dataValidation = { rule: { type: "list", values: ["Paid", "Unpaid", "Not decided"] } };
schedules.getRange("M5:M104").dataValidation = { rule: { type: "list", values: ["office", "remote", "hybrid", "client-site"] } };
schedules.getRange("N5:N104").format.fill = paleGreen;
schedules.getRange("A4:N104").format.borders = { preset: "outside", style: "thin", color: "#A6A6A6" };
schedules.freezePanes.freezeRows(4);
schedules.freezePanes.freezeColumns(2);
const schedWidths = [14,24,15,14,14,14,14,11,11,16,14,17,16,13];
schedWidths.forEach((w,i)=>schedules.getRangeByIndexes(0,i,104,1).format.columnWidth=w);
schedules.getRange("A106:N107").values = [
  ["Current portal workflow","Create reusable templates under Settings > Schedule templates. Then open People > employee profile > Weekly schedule > Set schedule and choose the template or enter a custom pattern.",null,null,null,null,null,null,null,null,null,null,null,null],
  ["Import limitation","This worksheet is a planning aid. The current project does not yet bulk-import schedule rows from a spreadsheet.",null,null,null,null,null,null,null,null,null,null,null,null],
];
schedules.getRange("A106:A107").format = { fill: grey, font: { name: font, bold: true, color: navy } };
schedules.getRange("B106:N107").merge(true);
schedules.getRange("B106:N107").format.wrapText = true;

title(holidays, "Holiday allowance and balance practice", "J");
holidays.getRange("A4:J4").values = [["Employee ID","Employee name","Unit","Annual allowance","Carried forward","Taken","Approved/booked","Pending","Remaining after approved","Notes"]];
header(holidays.getRange("A4:J4"));
holidays.getRange("A5:J54").format.fill = inputFill;
holidays.getRange("A5:H9").values = [
  ["MGR-001","Amina Rahman","days",25,2,8,5,2],
  ["EMP-101","Daniel Hughes","days",25,0,4,6,1],
  ["EMP-102","Sophie Martin","hours",135,0,30,15,7.5],
  ["MGR-002","Bilal Khan","days",24,3,10,4,0],
  ["EMP-201","Sara Ahmed","days",24,0,6,3,2],
];
holidays.getRange("I5").formulas = [["=IF(COUNT(D5:G5)<4,\"\",D5+E5-F5-G5)"]];
holidays.getRange("I5:I54").fillDown();
holidays.getRange("C5:C54").dataValidation = { rule: { type: "list", values: ["days", "hours"] } };
holidays.getRange("D5:I54").setNumberFormat("0.00");
holidays.getRange("I5:I54").format.fill = paleGreen;
holidays.getRange("I5:I54").conditionalFormats.add("cellIs", { operator: "lessThan", formula: 0, format: { fill: paleRed, font: { bold: true, color: "#9C0006" } } });
holidays.getRange("A4:J54").format.borders = { preset: "outside", style: "thin", color: "#A6A6A6" };
holidays.freezePanes.freezeRows(4);
const holWidths = [14,23,12,17,17,12,18,12,22,32];
holWidths.forEach((w,i)=>holidays.getRangeByIndexes(0,i,54,1).format.columnWidth=w);
holidays.getRange("A56:J58").values = [
  ["Available now","Annual allowance and carried forward can be entered under People > employee profile > Edit employee > Holiday allowance.",null,null,null,null,null,null,null,null],
  ["Not available yet","Taken, booked, pending and remaining are practice calculations until the leave-management phase is implemented.",null,null,null,null,null,null,null,null],
  ["Policy decision","HMF must confirm whether leave is measured in days or hours and how part-time entitlement, accrual and carry-forward work.",null,null,null,null,null,null,null,null],
];
holidays.getRange("A56:A58").format = { fill: grey, font: { name: font, bold: true, color: navy } };
holidays.getRange("B56:J58").merge(true);
holidays.getRange("B56:J58").format.wrapText = true;

wb.recalculate();
for (const sheetName of ["Start here","Employee import","Schedule planner","Holiday practice"]) {
  const sheet = wb.worksheets.getItem(sheetName);
  const used = sheet.getUsedRange();
  if (used) used.format.autofitRows();
}

const check1 = await wb.inspect({ kind: "table", range: "Employee import!A2:K12", include: "values,formulas", tableMaxRows: 12, tableMaxCols: 12 });
console.log(check1.ndjson);
const check2 = await wb.inspect({ kind: "table", range: "Holiday practice!A2:J12", include: "values,formulas", tableMaxRows: 12, tableMaxCols: 12 });
console.log(check2.ndjson);
const errors = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" });
console.log(errors.ndjson);

for (const [sheetName, fileName, range] of [
  ["Start here","start-here.png","A1:H14"],
  ["Employee import","employee-import.png","A1:K14"],
  ["Schedule planner","schedule-planner.png","A1:N20"],
  ["Holiday practice","holiday-practice.png","A1:J14"],
]) {
  const preview = await wb.render({ sheetName, range, scale: 1.3, format: "png" });
  await fs.writeFile(`${outputDir}/${fileName}`, new Uint8Array(await preview.arrayBuffer()));
}

const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(`${outputDir}/HMF_workforce_practice.xlsx`);
