const { errorMessage } = require('../../util');

function validateLight(req, validation) {
  priceCheck();
  quantitiesCheck();
  dateCheck();
  dimensionsCheck();
  maxHeightCheck();
  integratedLedCheck();
  bulbLightCheck();
  notesCheck();

  function priceCheck() {
    const price = req.body.price;
    if (checkIfNumber(price, 'price')) {
      checkIfPositive(price, 'price');
    }
  }

  function quantitiesCheck() {
    const quantities = req.body.quantities;

    if (checkIfNumber(quantities, 'quantities')) {
      if (checkIfPositive(quantities, 'quantities')) {
        checkIfInteger(quantities, 'quantities');
      }
    }
  }

  function dateCheck() {
    const date = req.body.date;

    const currDate = new Date();
    const dateProvided = new Date(date);

    if (currDate <= dateProvided) {
      validation.errors.push(errorMessage(date, 'Date is not valid', 'date'));
    }
  }

  function dimensionsCheck() {
    const height = req.body.height;

    if (checkIfNumber(height, 'height')) {
      checkIfPositive(height, 'height');
    }

    const width = req.body.width;

    if (checkIfNumber(width, 'width')) {
      checkIfPositive(width, 'width');
    }

    const depth = req.body.depth;

    if (checkIfNumber(depth, 'depth')) {
      checkIfPositive(depth, 'depth');
    }
  }

  function maxHeightCheck() {
    const maxHeight = req.body.maxHeight;

    if (maxHeight.length > 0) {
      if (checkIfNumber(maxHeight, 'maxHeight')) {
        if (checkIfPositive(maxHeight, 'maxHeight')) {
          const height = req.body.height;
          if (Number(height) && Number(height) >= Number(maxHeight)) {
            validation.errors.push(
              errorMessage(
                maxHeight,
                'Max height should be greater than min height',
                'maxHeight'
              )
            );
          }
        }
      }
    }
  }

  function integratedLedCheck() {
    kelvinsCheck();
    lumensCheck();
    wattCheck();

    function kelvinsCheck() {
      const kelvins = req.body.kelvins;

      if (kelvins.length > 0) {
        if (checkIfNumber(kelvins, 'kelvins')) {
          if (Number(kelvins) < 2700 || Number(kelvins) > 6500) {
            validation.errors.push(
              errorMessage(
                kelvins,
                'Kelvins should be between 2700 and 6500',
                'kelvins'
              )
            );
          } else {
            checkIfInteger(kelvins, 'kelvins');
          }
        }
      }
    }

    function lumensCheck() {
      const lumens = req.body.lumens;

      if (lumens.length > 0) {
        if (checkIfNumber(lumens, 'lumens')) {
          if (checkIfPositive(lumens, 'lumens')) {
            checkIfInteger(lumens, 'lumens');
          }
        }
      }
    }

    function wattCheck() {
      const watt = req.body.watt;

      if (watt.length > 0) {
        if (checkIfNumber(watt, 'watt')) {
          if (checkIfPositive(watt, 'watt')) {
            checkIfInteger(watt, 'watt');
          }
        }
      }
    }
  }

  function bulbLightCheck() {
    if (req.body.bulbType.length > 0) {
      const bulbTypes = ['E27', 'E14', 'BC', 'G9', 'GU10'];

      if (!bulbTypes.includes(req.body.bulbType)) {
        validation.errors.push(
          errorMessage(
            req.body.bulbType,
            'Bulb type is not valid, please select an option from the list above',
            'bulbType'
          )
        );
      }
    }

    const bulbsRequired = req.body.bulbsRequired;

    if (bulbsRequired.length > 0) {
      if (checkIfNumber(bulbsRequired, 'bulbsRequired')) {
        if (checkIfPositive(bulbsRequired, 'bulbsRequired')) {
          checkIfInteger(bulbsRequired, 'bulbsRequired');
        }
      }
    }
  }

  function notesCheck() {
    if (req.body.notes.length > 30) {
      validation.errors.push(
        errorMessage(
          req.body.notes,
          'Notes should be maximum 30 symbols',
          'notes'
        )
      );
    }
  }

  function checkIfNumber(value, fieldName) {
    if (!Number(value)) {
      validation.errors.push(
        errorMessage(value, `${fieldName} should be a number`, `${fieldName}`)
      );
      return false;
    }

    return true;
  }

  function checkIfPositive(value, fieldName) {
    if (Number(value) <= 0) {
      validation.errors.push(
        errorMessage(
          value,
          `${fieldName} should be a positive number`,
          `${fieldName}`
        )
      );

      return false;
    }

    return true;
  }

  function checkIfInteger(value, fieldName) {
    if (Number(value) % 1 != 0) {
      validation.errors.push(
        errorMessage(value, `${fieldName} should be an integer`, `${fieldName}`)
      );

      return false;
    }

    return true;
  }
}

module.exports = { validateLight };
