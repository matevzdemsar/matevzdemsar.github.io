/**
 * 
 * @param {true|false} bool 
 * @returns
 */

export function yes_no(bool) {
    return bool ? "Y" : "N";
}

/**
 * 
 * @param {object} obj 
 * @param {string} property 
 * @param {function} fun
 * @returns {object}
 */

export function changeInObject(obj, property, fun) {
    return Object.fromEntries(
        Object.entries(obj).map(
            ([key, value]) => (key === property) ? [key, fun(value)] : [key, value]
        )
    );
}


/**
 * 
 * @param {object} obj 
 * @param {[]} keys 
 * @returns {object}
 */

export function removeKeys(obj, keys) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => !keys.includes(key))
    );
}


export function operatorChoice(num1, num2, op) {
    switch (op) {
        case ">=":
            return num1 >= num2;
        case "===":
            return num1 === num2;
        case "<=":
            return num1 <= num2;
        default:
            return true
    }
}

// export function closeAllPopups() {
//     const allPopups = document.querySelectorAll('[id^="popup-"]');
//     allPopups.forEach((popup) => {
//         popup.style.display = "none";
//     })
// }

// Function to show the popup
export function showPopup(popup) {
    if (popup) {
        popup.style.display = 'block';
    }
}

// Function to hide the popup
export function hidePopup(popup) {
    if (popup) {
        popup.style.display = 'none';
    }
}

String.prototype.toTitle = function () {
  if (!this.length) return this;
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export function createFilterBox(filterOptions, filterChoice, display) {

  const filterBox = document.getElementById("filterBox");

  filterOptions.forEach((filter, index) => {
    const div = document.createElement('div');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${index}`;
    checkbox.name = filter.title;

    div.appendChild(checkbox);

    const filterLabel = document.createElement('label');
    filterLabel.textContent = filter.title;
    filterLabel.htmlFor = `checkbox-${index}`;
    div.appendChild(filterLabel);

    // the options that get displayed if the checkbox is checked
    const optionsBox = document.createElement('div');

    if(filter.type === 'checkbox') {
      createCheckbox();
    } else if (filter.type === 'search') {
      createSearchbar();
    } else if (filter.type === 'radio') {
      createRadio();
    } else if (filter.type === 'operator') {
      createOperator();
    }

    div.appendChild(optionsBox)
    optionsBox.style.display = 'none';
    filterBox.appendChild(div);

    function createCheckbox () {
      const checkboxStates = [];

      checkbox.addEventListener('change', () => {
        if(checkbox.checked) {
          optionsBox.style.display = 'block';
          optionsBox.style.flexDirection = 'row';
          optionsBox.style.gap = '10px';
        } else {
          optionsBox.style.display = 'none';
          optionsBox.querySelectorAll('input').forEach((i) => {
            i.checked = false;
          })
          checkboxStates.length = 0;
          filterChoice[filter.index] = false;
          display();
        }
      })

      filter.options.forEach((o, subIndex) => {

        const option = document.createElement('input');
        option.type = 'checkbox';
        option.id = `option-${index}-${subIndex}`;
        option.name = filter.title;

        const optionLabel = document.createElement('label');
        optionLabel.htmlFor = `option-${index}-${subIndex}`;
        optionLabel.textContent = o;

        option.addEventListener('change', () => {
            if(option.checked) {
              checkboxStates.push(o);
            } else {
              checkboxStates.splice(checkboxStates.indexOf(o), 1);
            }
            if(checkboxStates.length) {
              filterChoice[filter.index] = checkboxStates;
              display();
            } else {
              display();
            }
          })

          optionsBox.appendChild(option);
          optionsBox.appendChild(optionLabel);

      });
    };

    function createSearchbar () {
      const searchBar = document.createElement('input');
      searchBar.type = 'search'

      checkbox.addEventListener('change', () => {
        optionsBox.style.display = checkbox.checked ? 'block' : 'none';
        if (checkbox.checked) {
          optionsBox.style.display = 'block';
        } else {
          optionsBox.style.display = 'none';
          optionsBox.querySelector('input').value = ""
          filterChoice[filter.index] = "";
          display();
        }})

      searchBar.addEventListener('input', () => {
        filterChoice['name'] = event.target.value;
        display();
      })

      optionsBox.appendChild(searchBar);
    };

    function createRadio() {
      let lastChecked = false;

      filter.options.forEach((o, subIndex) => {

          const option = document.createElement('input');
          option.type = 'radio';
          option.id = `option-${index}-${subIndex}`;
          option.name = filter.title;

          const optionLabel = document.createElement('label');
          optionLabel.htmlFor = `option-${index}-${subIndex}`;
          optionLabel.textContent = o;

          checkbox.addEventListener('change', () => {
            if(checkbox.checked) {
              optionsBox.style.display = 'block';
              optionsBox.style.flexDirection = 'row';
              optionsBox.style.gap = '10px';
            } else {
              optionsBox.style.display = 'none';
              optionsBox.querySelectorAll('input').forEach((i) => {
              i.checked = false;
              })
              filterChoice[filter.index] = false;
              display();
            }

          option.addEventListener('click', function () {
              if(lastChecked === o) {
                  this.checked = false;
                  lastChecked = false;
              } else {
                  lastChecked = o;
              }

              filterChoice[filter.index] = lastChecked;
              display();

            });
    
          optionsBox.appendChild(option);
          optionsBox.appendChild(optionLabel);
          });
        });
    };

    function createOperator() {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
        optionsBox.style.display = 'block'
        optionsBox.style.flexDirection = 'column';
        optionsBox.style.gap = '10px';
        } else {
        optionsBox.style.display = 'none';
        filter.options.forEach((o, subIndex) => {
          Object.assign(filterChoice[filter.index], {[o.category]: {}});
        });
        display();
      }});

      filterChoice[filter.index] = {}

      filter.options.forEach((o, subIndex) => {
        Object.assign(filterChoice[filter.index], {[o.category]: {}});

        const option = document.createElement('div');
        option.id = `option-${index}-${subIndex}`;
        option.name = filter.title;

        const optionLabel = document.createElement('label');
        optionLabel.htmlFor = `option-${index}-${subIndex}`;
        optionLabel.textContent = o.c_name;

        const optionValue = document.createElement('input');
        optionValue.type = 'number';
        optionValue.inputMode = 'numeric';
        optionValue.placeholder = '(number)'

        const optionOperator = document.createElement('select');

        const operators = ['>=', '===', '<='];
        operators.forEach((op, opIndex) => {
          const operator = document.createElement('option');
          operator.value = op;
          operator.textContent = op;
          optionOperator.appendChild(operator);
        });

        optionOperator.addEventListener('change', () => {
          filterChoice[filter.index][o.category] = 
            {value: optionValue.value, operation: optionOperator.value};
          display();
        });

        optionValue.addEventListener('input', () => {
          filterChoice[filter.index][o.category] = 
            {value: optionValue.value, operation: optionOperator.value};
          display();

        });

        option.appendChild(optionOperator);
        option.appendChild(optionValue);

        optionsBox.appendChild(optionLabel);
        optionsBox.appendChild(option);

      });
    };
  });
}