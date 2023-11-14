// theme.ts
interface Theme {
  colors: {
    primary1: string;
    primary2: string;
    primary3: string;
    primary4: string;

    secondary1: string;
    secondary2: string;

    neutral10: string;
    neutral20: string;
    neutral30: string;
    neutral40: string;
    neutral50: string;
    neutral60: string;
    neutral70: string;
    neutral80: string;
    neutral90: string;
    neutral100: string;
  };
}

const theme: Theme = {
  colors: {
    primary1: '#184E77',
    primary2: '#76E2F4',
    primary3: '#FFE483',
    primary4: '#A5BE00',

    secondary1: '#7A00C1',
    secondary2: '#FF7030',

    neutral10: '#FFFFFF',
    neutral20: '#F5F5F5',
    neutral30: '#EDEDED',
    neutral40: '#E0E0E0',
    neutral50: '#C2C2C2',
    neutral60: '#9E9E9E',
    neutral70: '#757575',
    neutral80: '#616161',
    neutral90: '#404040',
    neutral100: '#0A0A0A',
  },
};

export default theme;
