export const setGender = () => (dispatch) => {
  let gender = {
    male: 10,
    female: 15,
    unknown: 0,
  };

  dispatch({ type: 'SET_GENDER', gender });
};

