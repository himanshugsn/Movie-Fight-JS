const createAutoComplete = ({root,
     renderOption,
      onOptionSelect,
       inputValue,
        fetchData}) => {
    root.innerHTML = `
    <label><b> Search for a item</b></label>
    <input class = "input" />
    <div class="dropdown">
        <div class = "dropdown-menu">
            <div class = "dropdown-content results"></div>
        </div>
    </div>
`;



    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async (event) => {
        const items = await fetchData(event.target.value);
        // handling empty responses
            if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }


        // to clear the previous list
        resultsWrapper.innerHTML = '';


        dropdown.classList.add('is-active');
        for (item of items) {
            const option = document.createElement('a');
            
            option.classList.add('dropdown-item');
            // render option for drop down list
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            })
            resultsWrapper.appendChild(option);
        }

    };

    input.addEventListener('input', debounce(onInput, 500));


    // to close the dropdown when user click anywhere other than list
    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};