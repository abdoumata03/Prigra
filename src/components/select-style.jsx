export const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#ffffff',
      borderColor: '#E0E0E0',
      minHeight: '42px',
      height: '42px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '42px',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '42px',
    }),
  };