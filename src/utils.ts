export const regexp = {
  email:
    /^([a-zA-Z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
  password: /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/g,
  login: /^[a-zA-Z0-9_]*$/,
};

export const dayParser = (day: number) => {
  switch (day) {
    case 1: {
      return 'Понедельник';
    }
    case 2: {
      return 'Вторник';
    }
    case 3: {
      return 'Среда';
    }
    case 4: {
      return 'Четверг';
    }
    case 5: {
      return 'Пятница';
    }
    case 6: {
      return 'Суббота';
    }
    default: {
      return 'Воскресенье';
    }
  }
};
