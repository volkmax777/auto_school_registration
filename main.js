const {chromium} = require('playwright');
const fs = require('fs');

(async () => {
    let userData;

    let format = {
        parent: {
            lastName: "Фамилия",
            firstName: "Имя",
            middleName: "Отчество",
            birthDate: "07.08.1995",
            birthPlace: "Город рождения",
            relationType: "Отец",
            passportSeries: "6606",
            passportNumber: "230593",
            passportIssued: "ОТДЕЛЕНИЕМ УФМС РОССИИ ПО СВЕРДЛОВСКОЙ ОБЛ. В Г. ИРБИТЕ",
            passportDateIssue: "04.05.2018",
            passportUnitCode: "660-072"
        },
        child: {
            lastName: "Фамилия",
            firstName: "Имя",
            middleName: "Отчество",
            birthDate: "07.08.1995",
            birthPlace: "Город рождения",
            passportSeries: "IV-ВГ",
            passportNumber: "324234",
            passportIssued: "ОТДЕЛЕНИЕМ УФМС РОССИИ ПО СВЕРДЛОВСКОЙ ОБЛ. В Г. ИРБИТЕ",
            passportDateIssue: "04.05.2018",
            actEntry: "343444",
        },
        registration: {
            region: "Свердловская область",
            district: "р-н. Раменский",
            city: "Нижний Тагил",
            street: "Пархоменко",
            house: "15",
            building: "1",
            frame: "2",
            flat: "21"
        },
        residental: {
            region: "Свердловская область",
            district: "р-н. Раменский",
            city: "Нижний Тагил",
            street: "Пархоменко",
            house: "15",
            building: "1",
            frame: "2",
            flat: "21"
        },
        contactPhone: "9123343435",
        contactEmail: "email@mail.com"
    };

    try {
        const datajson = fs.readFileSync('./userdata.json', 'utf8');

        // parse JSON string to JSON object
        userData = JSON.parse(datajson);

        // print all databases
        console.log(userData)

    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
        console.log(`Creating example file`)
        const formatjson = JSON.stringify(format, null, '\t');
        fs.writeFile('./userdata.json', formatjson, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`File is written successfully!`);
            }
        });
    }

    if (userData) {
        const browser = await chromium.launch({
            headless: false,
            slowMo: 500,
        });
        const context = await browser.newContext();

        // Open new page
        const page = await context.newPage();

        // Go to https://edu.egov66.ru/
        await page.goto('https://edu.egov66.ru');

        // Click a:has-text("Регистрациязаявления")
        await page.locator('a:has-text("Регистрациязаявления")').click();
        // assert.equal(page.url(), 'https://edu.egov66.ru/?once=gX7PsVgGWcwl197NwlMqas4B_SX-SHKDx4XMdJ1gh248yLlRYuucKgxG4AKqiMKRpsXNQojV95zYbxCrovbxZtb5HY8#/selectModule');

        // Click text=Регистрация заявления в школу на текущий учебный год
        await Promise.all([
            page.waitForNavigation(/*{ url: 'https://edu.egov66.ru/Modules/OOOMODULE/?once=MFG0_f9l7Dko20DR6jP5qCTHHSrv8-Zl4NVlzmC7H0VPTrBQuIqmIJtYBBG9X4NDlIVNqTOdbH5hPCaX4YoFZEvsK94#/' }*/),
            page.locator('text=Регистрация заявления в 1-ый класс будущего учебного года').click()
        ]);

        // Select 5d421ce8-9480-407a-b389-a5e2016e15ed
        await page.locator('select').selectOption('5d421ce8-9480-407a-b389-a5e2016e15ed');

        // Click input[name="LastName"]
        await page.locator('input[name="LastName"]').click();

        // Fill input[name="LastName"]
        await page.locator('input[name="LastName"]').fill(userData.parent.lastName);

        // Click input[name="FirstName"]
        await page.locator('input[name="FirstName"]').click();

        // Fill input[name="FirstName"]
        await page.locator('input[name="FirstName"]').fill(userData.parent.firstName);

        // Click input[name="MiddleName"]
        await page.locator('input[name="MiddleName"]').click();

        // Fill input[name="MiddleName"]
        await page.locator('input[name="MiddleName"]').fill(userData.parent.middleName);

        // Click input[name="ApplicantBirthdate"]
        await page.locator('input[name="ApplicantBirthdate"]').click();

        // Fill input[name="ApplicantBirthdate"]
        await page.locator('input[name="ApplicantBirthdate"]').fill(userData.parent.birthDate);

        // Click input[name="ApplicantBirthPlace"]
        await page.locator('input[name="ApplicantBirthPlace"]').click();

        // Fill input[name="ApplicantBirthPlace"]
        await page.locator('input[name="ApplicantBirthPlace"]').fill(userData.parent.birthPlace);

        // Select 6a48ea28-f9c3-4dca-8812-a5e3000fce09
        if (userData.parent.relationType === 'Отец') {
            await page.locator('select[name="RelationType"]').selectOption('6a48ea28-f9c3-4dca-8812-a5e3000fce09');
        }
        if (userData.parent.relationType === 'Мать') {
            await page.locator('select[name="RelationType"]').selectOption('4c75da19-97b7-4dde-a2a4-a5e3000fce09');
        }

        // Click input[name="Series"]
        await page.locator('input[name="Series"]').click();

        // Fill input[name="Series"]
        await page.locator('input[name="Series"]').fill(userData.parent.passportSeries);

        // Click input[name="Number"]
        await page.locator('input[name="Number"]').click();

        // Fill input[name="Number"]
        await page.locator('input[name="Number"]').fill(userData.parent.passportNumber);

        // Click input[name="Issued"]
        await page.locator('input[name="Issued"]').click();

        // Fill input[name="Issued"]
        await page.locator('input[name="Issued"]').fill(userData.parent.passportIssued);

        // Click input[name="DateIssue"]
        await page.locator('input[name="DateIssue"]').click();

        // Fill input[name="DateIssue"]
        await page.locator('input[name="DateIssue"]').fill(userData.parent.passportDateIssue);

        // Click input[name="UnitCode"]
        await page.locator('input[name="UnitCode"]').click();

        // Fill input[name="UnitCode"]
        await page.locator('input[name="UnitCode"]').fill(userData.parent.passportUnitCode);

        // Click input[name="Children_LastName"]
        await page.locator('input[name="Children_LastName"]').click();

        // Fill input[name="Children_LastName"]
        await page.locator('input[name="Children_LastName"]').fill(userData.child.lastName);

        // Click input[name="Children_FirstName"]
        await page.locator('input[name="Children_FirstName"]').click();

        // Fill input[name="Children_FirstName"]
        await page.locator('input[name="Children_FirstName"]').fill(userData.child.firstName);

        // Click input[name="Children_MiddleName"]
        await page.locator('input[name="Children_MiddleName"]').click();

        // Fill input[name="Children_MiddleName"]
        await page.locator('input[name="Children_MiddleName"]').fill(userData.child.middleName);

        // Click input[name="Children_BirthDate"]
        await page.locator('input[name="Children_BirthDate"]').click();

        // Fill input[name="Children_BirthDate"]
        await page.locator('input[name="Children_BirthDate"]').fill(userData.child.birthDate);

        // Click input[name="Children_BirthPlace"]
        await page.locator('input[name="Children_BirthPlace"]').click();

        // Fill input[name="Children_BirthPlace"]
        await page.locator('input[name="Children_BirthPlace"]').fill(userData.child.birthPlace);

        // Click input[name="Children_Series"]
        await page.locator('input[name="Children_Series"]').click();

        // Fill input[name="Children_Series"]
        await page.locator('input[name="Children_Series"]').fill(userData.child.passportSeries);

        // Click input[name="Children_Number"]
        await page.locator('input[name="Children_Number"]').click();

        // Fill input[name="Children_Number"]
        await page.locator('input[name="Children_Number"]').fill(userData.child.passportNumber);

        // Click input[name="Children_Issued"]
        await page.locator('input[name="Children_Issued"]').click();

        // Fill input[name="Children_Issued"]
        await page.locator('input[name="Children_Issued"]').fill(userData.child.passportIssued);

        // Click input[name="Children_DateIssue"]
        await page.locator('input[name="Children_DateIssue"]').click();

        // Fill input[name="Children_DateIssue"]
        await page.locator('input[name="Children_DateIssue"]').fill(userData.child.passportDateIssue);

        // Click input[name="Children_ActEntry"]
        await page.locator('input[name="Children_ActEntry"]').click();

        // Fill input[name="Children_ActEntry"]
        await page.locator('input[name="Children_ActEntry"]').fill(userData.child.actEntry);

        // Click input[name="RegisterAddress_Region"]
        await page.locator('input[name="RegisterAddress_Region"]').click();

        // Fill input[name="RegisterAddress_Region"]
        await page.locator('input[name="RegisterAddress_Region"]').fill(userData.registration.region);

        // Click input[name="RegisterAddress_District"]
        await page.locator('input[name="RegisterAddress_District"]').click();

        // Fill input[name="RegisterAddress_District"]
        await page.locator('input[name="RegisterAddress_District"]').fill(userData.registration.district);

        // Click input[name="RegisterAddress_City"]
        await page.locator('input[name="RegisterAddress_City"]').click();

        // Fill input[name="RegisterAddress_City"]
        await page.locator('input[name="RegisterAddress_City"]').fill(userData.registration.city);

        // Click input[name="RegisterAddress_Street"]
        await page.locator('input[name="RegisterAddress_Street"]').click();

        // Fill input[name="RegisterAddress_Street"]
        await page.locator('input[name="RegisterAddress_Street"]').fill(userData.registration.street);

        // Click input[name="RegisterAddress_House"]
        await page.locator('input[name="RegisterAddress_House"]').click();

        // Fill input[name="RegisterAddress_House"]
        await page.locator('input[name="RegisterAddress_House"]').fill(userData.registration.house);

        // Click input[name="RegisterAddress_Building"]
        await page.locator('input[name="RegisterAddress_Building"]').click();

        // Fill input[name="RegisterAddress_Building"]
        await page.locator('input[name="RegisterAddress_Building"]').fill(userData.registration.building);

        // Click input[name="RegisterAddress_Frame"]
        await page.locator('input[name="RegisterAddress_Frame"]').click();

        // Fill input[name="RegisterAddress_Frame"]
        await page.locator('input[name="RegisterAddress_Frame"]').fill(userData.registration.frame);

        // Click input[name="RegisterAddress_Flat"]
        await page.locator('input[name="RegisterAddress_Flat"]').click();

        // Fill input[name="RegisterAddress_Flat"]
        await page.locator('input[name="RegisterAddress_Flat"]').fill(userData.registration.flat);

        // Click input[name="ResidentalAddress_Region"]
        await page.locator('input[name="ResidentalAddress_Region"]').click();

        // Fill input[name="ResidentalAddress_Region"]
        await page.locator('input[name="ResidentalAddress_Region"]').fill(userData.residental.region);

        // Click input[name="ResidentalAddress_District"]
        await page.locator('input[name="ResidentalAddress_District"]').click();

        // Fill input[name="ResidentalAddress_District"]
        await page.locator('input[name="ResidentalAddress_District"]').fill(userData.residental.district);

        // Click input[name="ResidentalAddress_City"]
        await page.locator('input[name="ResidentalAddress_City"]').click();

        // Fill input[name="ResidentalAddress_City"]
        await page.locator('input[name="ResidentalAddress_City"]').fill(userData.residental.city);

        // Click input[name="ResidentalAddress_Street"]
        await page.locator('input[name="ResidentalAddress_Street"]').click();

        // Fill input[name="ResidentalAddress_Street"]
        await page.locator('input[name="ResidentalAddress_Street"]').fill(userData.residental.street);

        // Click input[name="ResidentalAddress_House"]
        await page.locator('input[name="ResidentalAddress_House"]').click();

        // Fill input[name="ResidentalAddress_House"]
        await page.locator('input[name="ResidentalAddress_House"]').fill(userData.residental.house);

        // Click input[name="ResidentalAddress_Building"]
        await page.locator('input[name="ResidentalAddress_Building"]').click();

        // Fill input[name="ResidentalAddress_Building"]
        await page.locator('input[name="ResidentalAddress_Building"]').fill(userData.residental.building);

        // Click input[name="ResidentalAddress_Frame"]
        await page.locator('input[name="ResidentalAddress_Frame"]').click();

        // Fill input[name="ResidentalAddress_Frame"]
        await page.locator('input[name="ResidentalAddress_Frame"]').fill(userData.residental.frame);

        // Click input[name="ResidentalAddress_Flat"]
        await page.locator('input[name="ResidentalAddress_Flat"]').click();

        // Fill input[name="ResidentalAddress_Flat"]
        await page.locator('input[name="ResidentalAddress_Flat"]').fill(userData.residental.flat);

        // Check input[name="NotificationByEmail"]
        await page.locator('input[name="NotificationByEmail"]').check();

        // Click input[name="Email"]
        await page.locator('input[name="Email"]').click();

        // Fill input[name="Email"]
        await page.locator('input[name="Email"]').fill(userData.contactEmail);

        // Check input[name="NotificationByPhone"]
        await page.locator('input[name="NotificationByPhone"]').check();

        // Click input[name="Phone"]
        await page.locator('input[name="Phone"]').click();

        // Fill input[name="Phone"]
        await page.locator('input[name="Phone"]').fill(userData.contactPhone);

        // Select 1
        await page.locator('select[name="Grade"]').selectOption('1');

        // Click text=Показать школы по выбранным параметрам
        await page.locator('text=Показать школы по выбранным параметрам').click();

        // Select 9820e1a8-7273-4b5e-b6cf-a5e2016ec272
        await page.locator('select[name="Institution"]').selectOption('9820e1a8-7273-4b5e-b6cf-a5e2016ec272');

        // Select 30720191-c7ed-43d2-84cb-ad9600adcd18
        await page.locator('select[name="Group"]').selectOption('30720191-c7ed-43d2-84cb-ad9600adcd18');

        // Click button:has-text("Выбрать")
        await page.locator('button:has-text("Выбрать")').click();

        // Check input[name="LicenseAggrement"]
        await page.locator('input[name="LicenseAggrement"]').check();

        // ---------------------
        //await context.close();
        //await browser.close();
    }
})();
